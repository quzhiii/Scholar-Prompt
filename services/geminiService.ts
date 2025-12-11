
import { GoogleGenAI } from "@google/genai";
import { FileAttachment, ApiConfig } from "../types";

export const executeGeminiPrompt = async (
  promptText: string, 
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig | undefined
): Promise<string> => {
  
  // Check if API is configured
  if (!config || !config.apiKey || !config.baseUrl) {
    throw new Error("API_KEY_NOT_CONFIGURED");
  }

  // Determine if it's Gemini API or OpenAI-compatible API
  const isGeminiAPI = config.baseUrl.includes('generativelanguage.googleapis.com') || 
                      config.baseUrl.includes('ai.google.dev');
  const isKimiAPI = config.baseUrl.includes('moonshot.cn');
  const isQwenAPI = config.baseUrl.includes('aliyuncs.com');

  if (isGeminiAPI) {
    // Gemini API Handling (supports PDF/image uploads via native format)
    return await executeWithGemini(promptText, files, systemInstruction, config);
  } else if (isKimiAPI && files && files.length > 0) {
    // Kimi API 需要先上传文件再引用
    return await executeWithKimi(promptText, files, systemInstruction, config);
  } else if (isQwenAPI && files && files.length > 0) {
    // Qwen API 不支持文件上传，给出友好提示
    throw new Error('QWEN_NO_FILE_SUPPORT: Qwen API 暂不支持 PDF 文件上传。建议：1) 改用 Kimi API；2) 或手动复制文本内容进行分析。');
  } else {
    // OpenAI-compatible API Handling (supports images via Vision API)
    return await executeWithOpenAICompatible(promptText, files, systemInstruction, config);
  }
};

// Gemini API implementation
const executeWithGemini = async (
  promptText: string,
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: config.apiKey! });
  
  try {
    const aiConfig: any = {};
    if (systemInstruction) {
      aiConfig.systemInstruction = systemInstruction;
    }

    // Construct the parts array
    const parts: any[] = [];
    
    // Add files first (context)
    if (files && files.length > 0) {
      files.forEach(file => {
        parts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.data
          }
        });
      });
    }

    // Add text prompt
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: config.modelId || 'gemini-2.0-flash-exp',
      contents: { parts },
      config: aiConfig
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Transform specific error codes for better UI handling
    if (error.message?.includes('403') || error.status === 403 || error.message?.includes('Region not supported')) {
        throw new Error("REGION_ERROR");
    }
    
    if (error.message?.includes('UNAUTHENTICATED') || error.message?.includes('API Key') || error.message?.includes('invalid') || error.status === 401) {
        throw new Error("INVALID_API_KEY");
    }

    throw error;
  }
};

// Kimi API implementation (requires file upload first)
const executeWithKimi = async (
  promptText: string,
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig
): Promise<string> => {
  try {
    // Step 1: Upload files to Kimi and get file IDs
    const fileIds: string[] = [];
    
    for (const file of files) {
      // Convert base64 to Blob
      const base64Data = file.data;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: file.mimeType });
      
      // Create form data for file upload (Moonshot API 规范)
      const formData = new FormData();
      formData.append('file', blob, file.name || 'document.pdf');
      formData.append('purpose', 'file-extract');  // ← Moonshot 只接受: file-extract, batch, batch_output, lambda
      
      // Upload file to Kimi
      const uploadResponse = await fetch(`${config.baseUrl}/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: formData
      });
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Kimi File Upload Error:', errorText);
        throw new Error(`文件上传失败: ${uploadResponse.status} ${errorText}`);
      }
      
      const uploadData = await uploadResponse.json();
      fileIds.push(uploadData.id);
      console.log('Kimi file uploaded:', uploadData.id);
    }
    
    // Step 2: Call chat API with file_ids
    // Kimi API 要求：file_ids 与 messages 同级，content 只能是 text 类型
    const messages: any[] = [
      ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
      { 
        role: "user", 
        content: promptText  // ← 只能是纯文本字符串
      }
    ];
    
    console.log('Calling Kimi chat API with:', {
      model: config.modelId,
      fileCount: fileIds.length,
      fileIds: fileIds,
      messageCount: messages.length
    });
    
    const requestBody = {
      model: config.modelId || 'moonshot-v1-32k',
      messages: messages,
      file_ids: fileIds,  // ← 文件引用放在这里，与 messages 同级
      temperature: 0.7
    };
    
    console.log('🚀 Kimi Chat Request Body:', JSON.stringify(requestBody, null, 2));
    
    // 注意：如果 baseUrl 已包含 /v1，则不重复添加
    const apiUrl = config.baseUrl.endsWith('/v1') 
      ? `${config.baseUrl}/chat/completions`
      : `${config.baseUrl}/v1/chat/completions`;
    
    console.log('🔗 Kimi Chat API URL:', apiUrl);
    console.log('📦 Request Body (full):', JSON.stringify(requestBody, null, 2));
    console.log('📄 file_ids being sent:', requestBody.file_ids);
    
    const chatResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      console.error('❌ Kimi Chat API Error:', {
        status: chatResponse.status,
        statusText: chatResponse.statusText,
        error: errorText,
        url: apiUrl,
        sentFileIds: requestBody.file_ids
      });
      throw new Error(`API 调用失败: ${chatResponse.status} ${errorText}`);
    }
    
    const chatData = await chatResponse.json();
    console.log('✅ Kimi Chat Response:', {
      hasContent: !!chatData.choices?.[0]?.message?.content,
      model: chatData.model,
      usage: chatData.usage
    });
    return chatData.choices?.[0]?.message?.content || "未生成响应";
    
  } catch (error: any) {
    console.error("Kimi API Error:", error);
    throw new Error(`Kimi API 错误: ${error.message}`);
  }
};

// OpenAI-compatible API implementation (supports Vision API for images)
const executeWithOpenAICompatible = async (
  promptText: string,
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig
): Promise<string> => {
  // Check if it's GLM API (uses different endpoint structure)
  const isGLM = config.baseUrl?.includes('bigmodel.cn');
  const isDeepSeek = config.baseUrl?.includes('deepseek.com');
  const isQwen = config.baseUrl?.includes('dashscope.aliyuncs.com');
  const needsProxy = isDeepSeek || isGLM; // DeepSeek 和 GLM 需要代理
  
  // Construct messages for OpenAI compatible endpoint with Vision API support
  const contentParts: any[] = [];
  
  // Add images/PDFs (Vision API format)
  // Qwen requires special "file" type instead of "image_url"
  if (files && files.length > 0) {
    files.forEach(file => {
      if (isQwen) {
        // Qwen 使用 "file" 类型（DashScope 文档问答格式）
        contentParts.push({
          type: "file",
          file: `data:${file.mimeType};base64,${file.data}`
        });
      } else {
        // 其他模型使用标准 image_url 格式
        contentParts.push({
          type: "image_url",
          image_url: {
            url: `data:${file.mimeType};base64,${file.data}`
          }
        });
      }
    });
  }
  
  // Add text prompt
  contentParts.push({
    type: "text",
    text: promptText
  });

  const messages = [
     ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
     { role: "user", content: contentParts }
  ];
  
  try {
    let endpoint: string;
    let fetchOptions: RequestInit;

    if (needsProxy) {
      // 使用代理解决 CORS 问题
      endpoint = '/api/proxy';
      fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiUrl: `${config.baseUrl}/chat/completions`,
          apiKey: config.apiKey,
          body: {
            model: config.modelId || 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7
          }
        })
      };
    } else {
      // 直接调用（Qwen、Kimi、OpenAI 等无 CORS 问题）
      endpoint = `${config.baseUrl}/chat/completions`;
      fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.modelId || 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7
        })
      };
    }
    
    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const err = JSON.parse(errorText);
        errorMessage = err.error?.message || err.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (e: any) {
    console.error('API Request Error:', e);
    throw new Error(`API Request Failed: ${e.message}`);
  }
};


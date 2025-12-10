
import { Category, PromptTemplate } from './types';
import { BookOpen, PenTool, FileText, Search, BarChart2, Send, Database, LayoutTemplate, Compass } from 'lucide-react';
import React from 'react';

// UI Translation Strings
export const UI_TEXT = {
  en: {
    appTitle: "ScholarPrompt",
    appDesc: "Academic AI Assistant",
    landingTitle: "Master Your Academic Research with AI",
    landingSubtitle: "Leverage advanced prompt engineering to unlock the full potential of LLMs for literature review, writing, analysis, and publication.",
    enterApp: "Launch Workspace",
    login: "Log In",
    logout: "Log Out",
    history: "History",
    run: "Run with Gemini",
    copy: "Copy",
    copied: "Copied!",
    running: "Analyzing...",
    inputPlaceholder: "Enter your details...",
    noTemplate: "Select a template to begin",
    outputPlaceholder: "AI Output will appear here",
    poweredBy: "Powered by Gemini 2.5 Flash",
    historyTitle: "Optimization History",
    historyEmpty: "No history found. Generate some prompts!",
    backToBuilder: "Back to Builder",
    selectKey: "Please Select API Key",
    uploadFiles: "Upload Documents (PDF)",
    filesSelected: "files selected",
    errorRegion: "Region not supported. Please check your VPN/Proxy settings (US/SG/JP recommended).",
    errorNetwork: "Network/Connection Error. Please check your VPN or try a Custom API provider.",
    removeFile: "Remove",
    settings: "Settings",
    fakeUiAnalysis: "AI Analysis",
    fakeUiGenerating: "Generating structured insights..."
  },
  cn: {
    appTitle: "ScholarPrompt",
    appDesc: "专注科研学术的 AI 助手",
    landingTitle: "释放 AI 在学术科研中的无限潜能",
    landingSubtitle: "基于前沿的 Prompt Engineering 架构，一站式解决文献综述、论文写作、数据分析与投稿难题。",
    enterApp: "进入工作台",
    login: "登 录",
    logout: "登 出",
    history: "历史记录",
    run: "AI 深度运行",
    copy: "复制",
    copied: "已复制",
    running: "正在深度思考...",
    inputPlaceholder: "请输入详细信息...",
    noTemplate: "请选择一个模版开始",
    outputPlaceholder: "AI 输出将显示在这里",
    poweredBy: "由 Gemini 2.5 Flash 驱动",
    historyTitle: "优化历史记录",
    historyEmpty: "暂无记录，快去生成一些提示词吧！",
    backToBuilder: "返回生成器",
    selectKey: "请选择 API Key",
    uploadFiles: "上传文献 (PDF, max 20)",
    filesSelected: "个文件已选择",
    errorRegion: "当前地区不支持访问 (Error 403)。请检查您的网络设置或开启 VPN (推荐美国/新加坡/日本节点)。",
    errorNetwork: "网络连接错误 (Rpc/XHR)。请检查 VPN 连接，或在设置中切换为自定义 API (如 DeepSeek)。",
    removeFile: "移除",
    settings: "设置",
    fakeUiAnalysis: "AI 智能分析",
    fakeUiGenerating: "正在生成结构化洞察..."
  }
};

export const LANDING_FEATURES = [
  {
    id: 'literature',
    icon: 'Database',
    title: { en: 'Literature Gap Analysis', cn: '文献空白分析' },
    desc: { en: 'Upload 20+ PDFs to automatically synthesize findings and identify research voids.', cn: '上传 20+ 篇 PDF 文献，自动综合发现并识别研究空白。' },
    color: 'blue'
  },
  {
    id: 'writing',
    icon: 'PenTool',
    title: { en: 'Structured Writing', cn: '结构化写作' },
    desc: { en: 'Expand bullet points into high-impact academic prose with Nature-style flow.', cn: '将要点扩写为具有 Nature 风格的高影响力学术散文。' },
    color: 'purple'
  },
  {
    id: 'methodology',
    icon: 'LayoutTemplate',
    title: { en: 'Methodology Design', cn: '方法论设计' },
    desc: { en: 'Refine research questions with FINER criteria and generate cleaning scripts.', cn: '利用 FINER 标准优化研究问题，并生成数据清洗脚本。' },
    color: 'teal'
  }
];

export const SETTINGS_TEXT = {
  en: {
    title: "Model Settings",
    provider: "Provider",
    gemini: "Google Gemini (Recommended)",
    custom: "Custom (OpenAI Compatible)",
    customDesc: "Support for Kimi, DeepSeek, GLM, Qwen and all OpenAI-compatible services.",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model Name",
    save: "Save Configuration",
    cancel: "Cancel",
    warning: "💡 Tip: All providers support image and PDF uploads. Gemini and Kimi have native PDF support, others use Vision API."
  },
  cn: {
    title: "模型设置",
    provider: "服务提供商",
    gemini: "Google Gemini (推荐)",
    custom: "自定义 (OpenAI 兼容接口)",
    customDesc: "支持 Kimi、DeepSeek、GLM、Qwen 等所有 OpenAI 兼容服务。",
    baseUrl: "接口地址 (Base URL)",
    apiKey: "API Key",
    model: "模型名称 (Model Name)",
    save: "保存配置",
    cancel: "取消",
    warning: "💡 提示：所有服务商均支持图片和 PDF 文件上传。Gemini 和 Kimi 原生支持 PDF，其他通过 Vision API 自动处理。"
  }
};

export const CATEGORIES: Category[] = [
  { 
    id: 'literature', 
    name: { en: 'Literature Review', cn: '文献综述' }, 
    icon: 'Search', 
    description: { en: 'Find sources, summarize papers, and synthesize gaps.', cn: '文献查找、摘要总结及研究空白挖掘' }
  },
  { 
    id: 'ideation', 
    name: { en: 'Ideation & Structure', cn: '选题与架构' }, 
    icon: 'BookOpen', 
    description: { en: 'Brainstorm topics, refine research questions, and outline.', cn: '头脑风暴、研究问题细化及大纲构建' }
  },
  { 
    id: 'writing', 
    name: { en: 'Drafting & Writing', cn: '论文写作' }, 
    icon: 'PenTool', 
    description: { en: 'Expand bullet points, write abstracts, and overcome block.', cn: '扩充观点、摘要写作及克服写作瓶颈' }
  },
  { 
    id: 'polishing', 
    name: { en: 'Review & Polishing', cn: '润色与修改' }, 
    icon: 'FileText', 
    description: { en: 'Grammar check, tone adjustment, and clarity improvement.', cn: '语法检查、语气调整及清晰度提升' }
  },
  { 
    id: 'methodology', 
    name: { en: 'Methods & Analysis', cn: '方法与分析' }, 
    icon: 'BarChart2', 
    description: { en: 'Data cleaning plans, statistical advice, and code generation.', cn: '数据清洗、统计建议及代码生成' }
  },
  { 
    id: 'submission', 
    name: { en: 'Journal Submission', cn: '投稿辅助' }, 
    icon: 'Send', 
    description: { en: 'Cover letters, peer review responses, and formatting.', cn: '投稿信、同行评审回复及格式调整' }
  },
];

// Helper to construct Oxford Standard Prompt
const buildOxfordPrompt = (
  role: string,
  instruction: string,
  context: string,
  strategy: string,
  input: string,
  output: string
) => {
  return `
# Role
${role}

# Instructions
${instruction}

# Context & Constraints
${context}

# Reasoning Strategy
${strategy}

# Input Data
${input}

# Output Format
${output}
`.trim();
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // --- Literature Review ---
  {
    id: 'lit-gap-analysis',
    category: 'literature',
    title: { en: 'Research Gap Identification', cn: '研究空白挖掘' },
    description: { en: 'Analyze uploaded papers or summaries to find missing links using Gap Analysis.', cn: '上传文献或粘贴摘要，利用差距分析法寻找缺失环节。' },
    fields: [
      { id: 'topic', label: { en: 'Research Topic', cn: '研究主题' }, type: 'text', placeholder: { en: 'e.g., Deep Learning in Medical Imaging', cn: '例如：深度学习在医学影像中的应用' } },
      { 
        id: 'uploaded_files', 
        label: { en: 'Upload Literature (PDF)', cn: '上传文献 (PDF)' }, 
        type: 'file', 
        accept: 'application/pdf',
        maxFiles: 10,
        placeholder: { en: 'Upload up to 10 PDFs (max 100MB each)', cn: '最多上传 10 个 PDF 文件（每个不超过 100MB）' }
      },
      { id: 'summaries', label: { en: 'Or Paste Summaries', cn: '或粘贴文本摘要' }, type: 'textarea', placeholder: { en: 'Paste abstract summaries here if not uploading...', cn: '如果不上传文件，可在此粘贴摘要...' } }
    ],
    templateGenerator: (v, lang) => {
      const hasFiles = v.uploaded_files && v.uploaded_files.length > 0;
      const fileContext = hasFiles 
        ? (lang === 'cn' ? "已上传完整的 PDF 文献文件供分析。" : "Full PDF literature files have been uploaded for analysis.")
        : "";
      
      const inputData = hasFiles 
        ? (lang === 'cn' ? `[附件: ${v.uploaded_files.length} 个 PDF 文件]\n补充文本: ${v.summaries}` : `[Attached: ${v.uploaded_files.length} PDF files]\nSupplementary Text: ${v.summaries}`)
        : v.summaries;

      if (lang === 'cn') {
        return buildOxfordPrompt(
          "资深学术研究员（PhD级别），擅长批判性文献综述与系统性空白分析。",
          "对提供的文献进行深度批判性分析，采用结构化方法识别研究空白并提出可研究问题。",
          `研究领域：${v.topic}。${fileContext} 必须严格基于提供的材料，引用具体段落/数据支撑观点。保持学术严谨性，避免主观臆断。`,
          "分析策略（三步走）：\n第一步：逐篇精读 → 提取各文献的核心贡献、方法局限、未解决问题\n第二步：横向比较 → 识别研究间的共识、矛盾、互补关系\n第三步：空白映射 → 根据理论/方法/实证三维度定位研究缺口，提出SMART研究问题（具体Specific、可测Measurable、可实现Achievable、相关Relevant、有时限Time-bound）",
          inputData,
          "请输出一份结构化的Markdown报告（使用清晰的层级标题、表格、列表）：\n\n## 📄 各文献评析\n### 文献1：[标题]\n- **核心发现**：3-5个要点\n- **方法优势**：\n- **局限与不足**：\n### 文献2：[标题]\n...\n\n## 🔍 综合分析\n### 主要发现综述\n（用简洁段落总结跨文献的共同结论）\n\n### 存在的矛盾/争议\n| 议题 | 观点A（文献X） | 观点B（文献Y） | 证据强度 |\n|------|---------------|---------------|----------|\n\n## 💡 研究空白识别\n### 理论空白\n- 空白1：描述 + 为何重要\n### 方法空白\n- 空白2：...\n### 实证空白\n- 空白3：...\n\n## ✅ 建议研究问题（RQ）\n1. **RQ1**：具体问题描述\n   - 研究意义：\n   - 建议方法：\n   - 预期贡献：\n2. **RQ2**：..."
        );
      }
      return buildOxfordPrompt(
        "Expert Academic Researcher (PhD-level) specializing in systematic literature reviews and gap analysis.",
        "Conduct in-depth critical analysis of provided literature using a structured approach to identify research gaps and formulate researchable questions.",
        `Research Topic: ${v.topic}. ${fileContext} Base analysis strictly on provided materials with specific citations. Maintain academic rigor and avoid speculation.`,
        "Three-phase strategy:\nPhase 1: Individual Analysis → Extract core contributions, methodological limitations, unresolved issues from each paper\nPhase 2: Cross-comparison → Identify consensus, contradictions, and complementary findings\nPhase 3: Gap Mapping → Locate voids across theoretical/methodological/empirical dimensions; propose SMART research questions (Specific, Measurable, Achievable, Relevant, Time-bound)",
        inputData,
        "Output a structured Markdown report with clear hierarchy, tables, and lists:\n\n## 📄 Individual Literature Analysis\n### Paper 1: [Title]\n- **Key Findings**: 3-5 bullet points\n- **Methodological Strengths**:\n- **Limitations & Gaps**:\n### Paper 2: [Title]\n...\n\n## 🔍 Synthesis\n### Main Findings Overview\n(Concise paragraph summarizing cross-literature conclusions)\n\n### Contradictions/Debates\n| Issue | View A (Paper X) | View B (Paper Y) | Evidence Strength |\n|-------|-----------------|------------------|-------------------|\n\n## 💡 Research Gaps\n### Theoretical Gaps\n- Gap 1: Description + Why it matters\n### Methodological Gaps\n- Gap 2: ...\n### Empirical Gaps\n- Gap 3: ...\n\n## ✅ Proposed Research Questions (RQ)\n1. **RQ1**: Specific question\n   - Significance:\n   - Suggested Method:\n   - Expected Contribution:\n2. **RQ2**: ..."
      );
    },
    systemInstruction: {
      en: "You are an expert academic researcher. If files are provided, read them thoroughly.",
      cn: "你是一位资深的学术研究专家。如果提供了文件，请仔细阅读。"
    }
  },

  // --- Ideation ---
  {
    id: 'research-question-refiner',
    category: 'ideation',
    title: { en: 'Research Question Refiner', cn: '研究问题细化' },
    description: { en: 'Turn vague ideas into testable hypotheses using FINER criteria.', cn: '使用 FINER 标准将模糊的想法转化为可验证的假设。' },
    fields: [
      { id: 'broad_topic', label: { en: 'Broad Interest', cn: '宽泛兴趣' }, type: 'text', placeholder: { en: 'e.g., Social Media and Mental Health', cn: '例如：社交媒体与心理健康' } },
      { 
        id: 'method_pref', 
        label: { en: 'Methodology', cn: '偏好方法' }, 
        type: 'select', 
        options: [
          { value: 'Quantitative', label: { en: 'Quantitative', cn: '定量研究 (Quantitative)' } },
          { value: 'Qualitative', label: { en: 'Qualitative', cn: '定性研究 (Qualitative)' } },
          { value: 'Mixed Methods', label: { en: 'Mixed Methods', cn: '混合方法 (Mixed Methods)' } }
        ],
        defaultValue: 'Quantitative', 
        placeholder: { en: 'Select methodology', cn: '选择方法论' } 
      }
    ],
    templateGenerator: (v, lang) => {
      const context = lang === 'cn' 
        ? `用户对 ${v.broad_topic} 感兴趣，倾向于使用 ${v.method_pref} 研究方法。需确保问题符合 FINER 标准（可行、有趣、新颖、伦理、相关）。`
        : `User is interested in ${v.broad_topic} using ${v.method_pref} methodology. Ensure questions meet FINER criteria (Feasible, Interesting, Novel, Ethical, Relevant).`;

      return buildOxfordPrompt(
        lang === 'cn' ? "学术导师 / 基金评审专家" : "Research Supervisor / Grant Reviewer",
        lang === 'cn' ? "生成5个具体、严谨且新颖的研究问题，并提供相应的假设。" : "Generate 5 specific, rigorous, and novel research questions with corresponding hypotheses.",
        context,
        lang === 'cn' ? "思维链 (Chain of Thought): 从宽泛话题出发 -> 结合方法论限制 -> 应用FINER标准筛选 -> 最终定稿。" : "Chain of Thought: Start broad -> Apply methodology constraints -> Filter via FINER criteria -> Finalize.",
        `Topic: ${v.broad_topic}\nMethod: ${v.method_pref}`,
        lang === 'cn' ? "列表形式，每项包含：\n1. **研究问题**\n2. **假设 (H1)**\n3. **可行性评估**" : "List format, each item containing:\n1. **Research Question**\n2. **Hypothesis**\n3. **Feasibility Assessment**"
      );
    },
    systemInstruction: { en: "Act as a strict Research Supervisor.", cn: "扮演一位严格的学术导师。" }
  },

  // --- Writing ---
  {
    id: 'section-drafter',
    category: 'writing',
    title: { en: 'Academic Flow Expansion', cn: '学术段落扩写' },
    description: { en: 'Convert bullet points into high-impact academic prose.', cn: '将简单的要点扩写为高影响力的学术散文。' },
    fields: [
      { 
        id: 'section', 
        label: { en: 'Section', cn: '论文部分' }, 
        type: 'select', 
        options: [
          { value: 'Introduction', label: { en: 'Introduction', cn: '引言 (Introduction)' } },
          { value: 'Literature Review', label: { en: 'Literature Review', cn: '文献综述 (Literature Review)' } },
          { value: 'Methods', label: { en: 'Methods', cn: '方法 (Methods)' } },
          { value: 'Results', label: { en: 'Results', cn: '结果 (Results)' } },
          { value: 'Discussion', label: { en: 'Discussion', cn: '讨论 (Discussion)' } },
          { value: 'Conclusion', label: { en: 'Conclusion', cn: '结论 (Conclusion)' } }
        ],
        defaultValue: 'Introduction', 
        placeholder: { en: 'Select section', cn: '选择部分' } 
      },
      { id: 'points', label: { en: 'Key Points', cn: '核心要点' }, type: 'textarea', placeholder: { en: '- Point 1\n- Point 2...', cn: '- 要点 1\n- 要点 2...' } }
    ],
    templateGenerator: (v, lang) => {
      const role = lang === 'cn' ? "专业学术编辑，擅长 Nature/Science 风格的写作。" : "Professional Academic Editor skilled in Nature/Science style writing.";
      const task = lang === 'cn' ? `将以下要点扩展为论文的 ${v.section} 部分。` : `Expand the following bullet points into the ${v.section} section of a paper.`;
      
      return buildOxfordPrompt(
        role,
        task,
        lang === 'cn' 
          ? "保持逻辑流畅（Logical Flow）。使用恰当的连接词。避免口语化，使用精确的学术词汇。每段必须有明确的主题句。" 
          : "Maintain logical flow. Use appropriate transition words. Avoid colloquialisms; use precise academic vocabulary. Each paragraph must have a clear topic sentence.",
        lang === 'cn' ? "逐步推理：理解要点逻辑关系 -> 构建段落骨架 -> 填充学术细节 -> 润色连接词。" : "Step-by-step: Understand logical relationships -> Build paragraph skeleton -> Fill with academic detail -> Polish transitions.",
        v.points,
        lang === 'cn' ? "一段或多段连贯的学术文本。" : "One or more coherent academic paragraphs."
      );
    },
    systemInstruction: { en: "Write in a formal, high-impact academic style.", cn: "使用正式、高影响力的学术风格写作。" }
  },

  // --- Polishing ---
  {
    id: 'academic-polisher',
    category: 'polishing',
    title: { en: 'Style Polisher', cn: '学术润色' },
    description: { en: 'Enhance clarity, formality, and conciseness.', cn: '提升清晰度、正式感和简洁性。' },
    fields: [
      { id: 'text', label: { en: 'Original Text', cn: '原文' }, type: 'textarea', placeholder: { en: 'Paste text here...', cn: '在此粘贴文本...' } },
      { 
        id: 'goal', 
        label: { en: 'Goal', cn: '目标' }, 
        type: 'select', 
        options: [
          { value: 'Maximize Clarity', label: { en: 'Maximize Clarity', cn: '最大化清晰度' } },
          { value: 'Reduce Word Count', label: { en: 'Reduce Word Count', cn: '精简字数' } },
          { value: 'Enhance Formality', label: { en: 'Enhance Formality', cn: '提升正式感' } },
          { value: 'Native Speaker Flow', label: { en: 'Native Speaker Flow', cn: '地道表达' } }
        ],
        defaultValue: 'Enhance Formality', 
        placeholder: { en: 'Select goal', cn: '选择目标' } 
      }
    ],
    templateGenerator: (v, lang) => {
      return buildOxfordPrompt(
        lang === 'cn' ? "顶级期刊审稿人 / 语言润色专家" : "Top-tier Journal Reviewer / Language Editor",
        lang === 'cn' ? `重写以下文本，主要目标是：${v.goal}。` : `Rewrite the following text with the primary goal: ${v.goal}.`,
        lang === 'cn' ? "保留原意，但提升词汇的精确性。避免被动语态的过度使用（除非必要）。确保句子结构多样化。" : "Preserve original meaning but improve vocabulary precision. Avoid overuse of passive voice. Ensure sentence structure variety.",
        lang === 'cn' ? "分析原句结构 -> 识别弱动词和冗余 -> 应用学术替代词 -> 重组句子。" : "Analyze sentence structure -> Identify weak verbs/redundancy -> Apply academic synonyms -> Restructure.",
        v.text,
        lang === 'cn' ? "1. **润色后的文本**\n2. **修改说明**（解释关键改动的原因）" : "1. **Polished Text**\n2. **Change Log** (Explain key changes)"
      );
    },
    systemInstruction: { en: "You are a meticulous editor.", cn: "你是一位一丝不苟的编辑。" }
  },

  // --- Methodology ---
  {
    id: 'data-cleaning',
    category: 'methodology',
    title: { en: 'Data Cleaning Strategy', cn: '数据清洗策略' },
    description: { en: 'Generate Python/Pandas code for dirty data.', cn: '为脏数据生成 Python/Pandas 清洗代码。' },
    fields: [
      { id: 'data_desc', label: { en: 'Data Description', cn: '数据描述' }, type: 'textarea', placeholder: { en: 'e.g., CSV with missing dates, mixed strings in numeric columns...', cn: '例如：CSV 文件，日期缺失，数值列混杂字符串...' } }
    ],
    templateGenerator: (v, lang) => {
      return buildOxfordPrompt(
        lang === 'cn' ? "资深数据科学家 (Python/Pandas 专家)" : "Senior Data Scientist (Python/Pandas Expert)",
        lang === 'cn' ? "编写一个 Python 脚本来清洗描述的数据集。" : "Write a Python script to clean the described dataset.",
        lang === 'cn' ? "必须包含错误处理。代码应具有生产级质量，并带有注释。处理缺失值、异常值和类型转换。" : "Must include error handling. Code should be production-quality and commented. Handle missing values, outliers, and type casting.",
        lang === 'cn' ? "1. 导入库\n2. 加载数据\n3. 逐步清洗（每步解释原因）\n4. 验证最终数据完整性" : "1. Import libraries\n2. Load data\n3. Step-by-step cleaning (explain why)\n4. Verify final integrity",
        v.data_desc,
        lang === 'cn' ? "Python 代码块 + 简要的逻辑解释" : "Python Code Block + Brief logic explanation"
      );
    },
    systemInstruction: { en: "Provide clean, efficient Python code.", cn: "提供整洁、高效的 Python 代码。" }
  },
  {
    id: 'method-advisor',
    category: 'methodology',
    title: { en: 'Research Method Advisor', cn: '研究方法顾问' },
    description: { en: 'Recommend suitable research methods based on your data.', cn: '根据您的数据结构推荐合适的研究方法及参考文献。' },
    fields: [
      { id: 'research_goal', label: { en: 'Research Goal', cn: '研究目标' }, type: 'text', placeholder: { en: 'e.g., Understand the impact of policy X on Y', cn: '例如：理解政策X对Y的影响' } },
      { id: 'data_desc', label: { en: 'Data Description', cn: '数据描述' }, type: 'textarea', placeholder: { en: 'e.g., Panel data, 300 companies, 10 years, missing values...', cn: '例如：面板数据，300家上市公司，10年跨度，包含缺失值...' } },
      { id: 'field', label: { en: 'Field of Study', cn: '所属领域' }, type: 'text', placeholder: { en: 'e.g., Economics / Sociology', cn: '例如：经济学 / 社会学' } }
    ],
    templateGenerator: (v, lang) => {
      const task = lang === 'cn' 
         ? "根据用户的研究目标和数据特征，推荐最合适的研究方法，并提供执行指南。"
         : "Recommend the most suitable research methodology based on user's goal and data characteristics, providing an execution guide.";
         
      const strategy = lang === 'cn'
         ? "1. 分析数据结构（横截面/面板/时间序列/文本等）。\n2. 匹配该领域的主流方法（如DID, IV, SEM, Thematic Analysis）。\n3. 评估可行性。\n4. 引用经典文献作为支撑。"
         : "1. Analyze data structure (Cross-sectional/Panel/Time-series/Text etc).\n2. Match with field standards (DID, IV, SEM, Thematic Analysis).\n3. Assess feasibility.\n4. Cite classic literature.";

      return buildOxfordPrompt(
        lang === 'cn' ? "资深研究方法学家 (Methodologist)" : "Senior Research Methodologist",
        task,
        `Field: ${v.field}. Goal: ${v.research_goal}. Data: ${v.data_desc}.`,
        strategy,
        `Goal: ${v.research_goal}\nData: ${v.data_desc}`,
        lang === 'cn' 
          ? "Markdown 格式：\n1. **推荐方法** (Recommended Method)\n2. **选择理由** (Justification - 结合数据特征)\n3. **执行步骤指南** (Step-by-step Guide)\n4. **推荐参考文献** (Key Literature - 3-5篇经典或示例论文)"
          : "Markdown Format:\n1. **Recommended Method**\n2. **Justification** (Based on data features)\n3. **Execution Guide**\n4. **Key Literature** (3-5 classic or example papers)"
      );
    },
    systemInstruction: { en: "Provide authoritative methodological advice.", cn: "提供权威的方法论建议。" }
  },
  
  // --- Submission ---
  {
    id: 'rebuttal-generator',
    category: 'submission',
    title: { en: 'Reviewer Rebuttal', cn: '审稿回复信' },
    description: { en: 'Diplomatic responses to tough criticism.', cn: '针对严厉批评的礼貌且有力的回复。' },
    fields: [
      { id: 'comment', label: { en: 'Reviewer Comment', cn: '审稿人意见' }, type: 'textarea', placeholder: { en: 'Paste comment...', cn: '粘贴意见...' } },
      { 
        id: 'stance', 
        label: { en: 'Your Stance', cn: '你的立场' }, 
        type: 'select', 
        options: [
          { value: 'Agree & Fixed', label: { en: 'Agree & Fixed', cn: '同意并已修改' } },
          { value: 'Disagree Respectfully', label: { en: 'Disagree Respectfully', cn: '礼貌地反驳' } },
          { value: 'Clarification Only', label: { en: 'Clarification Only', cn: '仅做澄清' } }
        ],
        defaultValue: 'Agree & Fixed', 
        placeholder: { en: 'Select stance', cn: '选择立场' } 
      }
    ],
    templateGenerator: (v, lang) => {
      return buildOxfordPrompt(
        lang === 'cn' ? "学术交流专家，擅长冲突解决" : "Academic Communication Expert specializing in conflict resolution",
        lang === 'cn' ? "起草一段对审稿人的回复。" : "Draft a response to the reviewer.",
        lang === 'cn' ? `立场：${v.stance}。语气必须极度礼貌、感激但自信。使用“三明治法”（感谢 -> 回应 -> 再次感谢/确认）。` : `Stance: ${v.stance}. Tone must be extremely polite, appreciative, yet confident. Use the "Sandwich Method".`,
        lang === 'cn' ? "1. 感谢审稿人的洞察。\n2. 直接说明是否接受建议。\n3. 详细解释修改内容或反驳理由。\n4. 指出修改位置。" : "1. Thank reviewer for insight.\n2. State acceptance/rejection.\n3. Explain fix or rebuttal logic.\n4. Point to location.",
        v.comment,
        lang === 'cn' ? "回复文本" : "Response Text"
      );
    },
    systemInstruction: { en: "Be polite, professional, and concise.", cn: "礼貌、专业且简洁。" }
  }
];

// Helper to get icon component
export const getIcon = (iconName: string) => {
  const icons: {[key: string]: React.ElementType} = {
    Search, BookOpen, PenTool, FileText, BarChart2, Send, Database, LayoutTemplate, Compass
  };
  return icons[iconName] || FileText;
};

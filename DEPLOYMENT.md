# 部署指南 | Deployment Guide

## 中文

### Vercel 部署步骤

#### 1. 前置准备
- 拥有 [Vercel 账户](https://vercel.com)
- 拥有 [Google Gemini API Key](https://ai.google.dev)
- 项目已推送到 GitHub

#### 2. 连接 GitHub 仓库
1. 登录 Vercel 控制台
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 搜索并选择 `Scholar-Prompt` 仓库
5. 点击 "Import"

#### 3. 配置环境变量
**最重要的一步！** 

在 Vercel 项目设置中，必须添加以下环境变量：

**Environment Variables:**
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**步骤：**
1. 进入 "Settings" → "Environment Variables"
2. 添加新变量：
   - Name: `VITE_GEMINI_API_KEY`
   - Value: 你的 Gemini API Key（从 [Google AI Studio](https://ai.google.dev/aistudio) 获取）
   - Environments: 选择 "Production", "Preview", "Development"
3. 保存

#### 4. 构建配置
项目已自动配置 Vite 构建设置，无需额外配置。框架检测为 "Other"。

#### 5. 部署
1. 填写完环境变量后，点击 "Deploy"
2. 等待构建完成（通常 2-3 分钟）
3. 部署完成后，Vercel 会提供生产 URL

#### 6. 测试
部署完成后：
1. 打开生成的 URL
2. 选择 "Settings" 配置 API（可选）
   - 选择 "Gemini (Default)" - 使用环境变量中的 API Key
   - 或选择 "Custom API" 使用其他服务（DeepSeek/Qwen/Kimi）
3. 选择一个模板并测试功能

### 常见问题排查

#### 问题：API Key selection failed
**原因**：在 Vercel 部署环境中，`window.aistudio` 不可用

**解决**：
- 确保在 Settings 中正确配置了 API Key
- 或使用自定义 API 提供商（DeepSeek/Qwen 等）

#### 问题：VITE_GEMINI_API_KEY is undefined
**原因**：Vercel 环境变量未正确配置

**解决**：
1. 检查环境变量是否添加到所有环境（Production/Preview/Development）
2. 重新部署或清除缓存：
   - 在 Vercel 项目 "Deployments" 中找到最新部署
   - 点击 "Redeploy"

#### 问题：403 Region not supported
**原因**：IP 地址所在地区不支持

**解决**：
- 检查是否需要使用 VPN（推荐美国/新加坡/日本节点）
- 或使用 Custom API 模式配置国内 AI 服务

#### 问题：Failed to load resource from aistudiocdn.com
**原因**：私有 CDN 不可访问

**解决**：
这是已知问题。在 Vercel 部署时，某些 CDN 资源可能不可用。
- 应用会自动 fallback 到 npm 依赖
- 如仍有问题，需要在 `index.html` 中更改 CDN 地址

---

## English

### Vercel Deployment Steps

#### 1. Prerequisites
- A [Vercel account](https://vercel.com)
- A [Google Gemini API Key](https://ai.google.dev)
- Project pushed to GitHub

#### 2. Connect GitHub Repository
1. Login to Vercel Console
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Search and select `Scholar-Prompt` repository
5. Click "Import"

#### 3. Configure Environment Variables
**This is the critical step!**

In Vercel project settings, add the following environment variable:

**Environment Variables:**
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Steps:**
1. Go to "Settings" → "Environment Variables"
2. Add new variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API Key (from [Google AI Studio](https://ai.google.dev/aistudio))
   - Environments: Select "Production", "Preview", "Development"
3. Save

#### 4. Build Configuration
The project is already configured with Vite build settings. Framework is auto-detected as "Other".

#### 5. Deploy
1. After environment variables are set, click "Deploy"
2. Wait for build completion (usually 2-3 minutes)
3. Vercel provides your production URL upon successful deployment

#### 6. Testing
After deployment:
1. Open the generated URL
2. Go to "Settings" to configure API (optional)
   - Select "Gemini (Default)" to use environment variable
   - Or select "Custom API" to use other services (DeepSeek/Qwen/Kimi)
3. Select a template and test functionality

### Troubleshooting

#### Issue: API Key selection failed
**Cause**: `window.aistudio` is not available in Vercel environment

**Solution**:
- Ensure API Key is properly configured in Settings
- Or use Custom API provider (DeepSeek/Qwen, etc.)

#### Issue: VITE_GEMINI_API_KEY is undefined
**Cause**: Vercel environment variable not properly configured

**Solution**:
1. Verify environment variable is added to all environments (Production/Preview/Development)
2. Redeploy:
   - Find latest deployment in Vercel "Deployments"
   - Click "Redeploy"

#### Issue: 403 Region not supported
**Cause**: IP region not supported by API

**Solution**:
- Check if VPN is needed (recommend US/SG/JP nodes)
- Or use Custom API mode with domestic AI service

#### Issue: Failed to load resource from aistudiocdn.com
**Cause**: Private CDN not accessible

**Solution**:
This is a known issue. Some CDN resources may be unavailable on Vercel.
- Application will auto-fallback to npm dependencies
- If still issues, update CDN URLs in `index.html`

---

## 获取 Gemini API Key | Get Gemini API Key

1. 访问 [Google AI Studio](https://ai.google.dev/aistudio)
2. 点击 "Get API Key"
3. 创建或选择现有项目
4. 复制 API Key
5. 在 Vercel 环境变量中粘贴

**重要**: 不要在公开代码中暴露 API Key。始终使用环境变量。

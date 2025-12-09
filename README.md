<div align="center">
  
# 🎓 ScholarPrompt

**专业学术科研AI提示词工程工具**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)](https://www.typescriptlang.org/)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 📖 项目简介

**ScholarPrompt** 是一款专为学术研究人员打造的智能提示词工程工具，基于前沿的 **标准提示词架构** (Standard Prompt Framework)，帮助科研工作者高效利用大语言模型（LLM）完成文献综述、论文写作、数据分析等学术任务。

### ✨ 核心亮点

#### 🎯 1. 专业的学术场景覆盖
- **文献综述模块**：上传多达20篇PDF文献，自动识别研究空白与矛盾点
- **选题与架构**：基于FINER标准细化研究问题，生成可验证的假设
- **论文写作辅助**：将简单要点扩写为Nature/Science风格的高影响力学术段落
- **润色与修改**：多目标润色（清晰度/字数/正式感/地道表达）
- **方法与分析**：生成Python数据清洗脚本，推荐研究方法及经典文献
- **投稿辅助**：生成审稿回复信，外交化回应严厉批评

#### 🏗️ 2. 学术标准提示词架构
每个模板均采用结构化的六要素提示词设计：
```
1. Role (角色定位) - 确立AI的专业身份
2. Instructions (任务指令) - 明确的任务目标
3. Context & Constraints (上下文与约束) - 领域知识与边界条件
4. Reasoning Strategy (推理策略) - 思维链/步骤分解
5. Input Data (输入数据) - 结构化的用户输入
6. Output Format (输出格式) - 预定义的返回结构
```

这种架构确保生成的提示词**清晰、严谨、可复现**，显著提升LLM输出质量。

#### 🔄 3. 多模型支持
- **原生Gemini模式**：支持文件上传（PDF多文档分析）
- **自定义API模式**：兼容OpenAI格式的所有国内外模型
  - DeepSeek (深度求索)
  - Qwen (通义千问)
  - Kimi (月之暗面)
  - Claude / GPT-5 等

#### 🌍 4. 双语界面与模板
- 完整的中英文双语支持
- 所有提示词模板均提供中英文版本
- 一键切换语言，无需重新配置

#### 💾 5. 历史记录与复用
- 自动保存每次生成的提示词和AI响应
- 本地localStorage存储，保护隐私
- 支持历史记录查看、复制和再次编辑

### 🚀 快速开始

#### ⚡ 在线使用（推荐）

**打开即用，1分钟配置完成！**

1. **访问部署地址**：
   - 🌐 **Vercel 部署版**：https://scholarprompt.vercel.app
   - 📦 **GitHub Pages**：https://quzhiii.github.io/Scholar-Prompt

2. **首次配置 API Key**（仅需一次）：
   
   点击左下角 **⚙️ 设置** → 按以下步骤配置：

   **方式 A：使用国内 AI 服务（🔥 推荐 - 性价比高）**
   
   | 服务商 | 免费额度 | 价格（输入/输出） | PDF支持 | 性价比 | 推荐指数 |
   |--------|---------|------------------|---------|--------|----------|
   | **DeepSeek v3** ⭐ | ￥5 | ￥0.1/￥0.28 每百万tokens | ✅ | 🌟🌟🌟🌟🌟 | **最推荐** |
   | **Kimi R2** | 免费试用 | ￥0.1/￥0.1 每百万tokens | ✅ 原生 | 🌟🌟🌟🌟 | 推荐 |
   | **智谱 GLM-4** | ￥25 | ￥5/￥5 每百万tokens | ✅ | 🌟🌟🌟 | 一般 |
   | **通义千问** | 免费试用 | ￥0.4/￥1.2 每百万tokens | ✅ | 🌟🌟🌟🌟 | 推荐 |

   **🏆 性价比冠军：DeepSeek v3**
   - 💰 **价格最低**：输入仅 ￥0.1/百万tokens（比 GPT-4 便宜 100 倍）
   - 🧠 **思考能力强**：支持深度推理模式
   - 🎁 **新用户福利**：注册送 ￥5 额度（约 500 万 tokens）
   - ✅ **支持 PDF 上传**：通过 Vision API

   **快速配置 DeepSeek（推荐）：**
   ```
   1. 访问: https://platform.deepseek.com
   2. 注册账号（赠送 ￥5）
   3. 创建 API Key
   4. 在 ScholarPrompt 设置中：
      - 选择"国内 AI 服务商"
      - Base URL: https://api.deepseek.com/v1
      - API Key: 粘贴你的密钥
      - Model: deepseek-chat
   5. 点击"保存配置"
   ```

   **其他服务商配置：**
   - **Kimi**: https://platform.moonshot.cn （原生PDF支持，128K上下文）
     - Base URL: `https://api.moonshot.cn/v1`
     - Model: `moonshot-v1-auto`
   
   - **智谱 GLM**: https://open.bigmodel.cn （多模态能力强）
     - Base URL: `https://open.bigmodel.cn/api/paas/v4`
     - Model: `glm-4v-plus`
   
   - **通义千问**: https://bailian.console.aliyun.com （阿里云生态）
     - Base URL: `https://dashscope.aliyuncs.com/compatible-mode/v1`
     - Model: `qwen-vl-max`

   **方式 B：使用 Gemini API（需付费）**
   - ⚠️ **注意**：Gemini 免费配额已取消，现在需要付费
   - 💵 **价格**：Gemini 1.5 Flash 约 $0.075/$0.30 每百万tokens
   - ✅ **优势**：原生 PDF 支持，多模态能力强
   
   配置步骤：
   ```
   1. 访问: https://ai.google.dev/aistudio
   2. 绑定付费账号
   3. 创建 API Key
   4. 在 ScholarPrompt 设置中选择 Gemini
   5. 模型推荐: gemini-3-pro-preview 或 gemini-2.0-flash-exp
   ```

3. **开始使用**！
   - 选择左侧模板类别
   - 填写表单内容
   - 点击"AI 深度运行"

> 💡 **配置保存在浏览器本地**，无需每次输入。所有 API 调用都在您的浏览器中完成，数据完全安全。

---

#### 🏠 本地开发运行

**适合开发者进行二次开发或离线使用**

**环境要求：**
- Node.js 18+ 
- 现代浏览器

**步骤：**

1. **克隆项目**
```bash
git clone https://github.com/quzhiii/Scholar-Prompt.git
cd Scholar-Prompt
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

4. **首次使用时配置 API Key**
   
   在浏览器中打开后，点击"设置"按钮配置您的 API Key。

#### 部署到生产环境

```bash
npm run build
npm run preview
```

构建产物在 `dist/` 目录，可部署到任何静态托管服务（Vercel / Netlify / GitHub Pages）。

### 📂 项目结构

```
scholarprompt/
├── components/           # React组件
│   ├── LandingPage.tsx   # 首页
│   ├── Sidebar.tsx       # 侧边栏导航
│   ├── PromptBuilder.tsx # 表单构建器
│   ├── OutputSection.tsx # 输出与运行
│   ├── History.tsx       # 历史记录
│   └── SettingsModal.tsx # 设置弹窗
├── services/             # 服务层
│   ├── geminiService.ts  # API调用逻辑
│   └── storageService.ts # 本地存储
├── constants.tsx         # 模板与多语言配置
├── types.ts              # TypeScript类型定义
├── App.tsx               # 主应用组件
└── index.tsx             # 入口文件
```

### 🎨 技术栈

- **前端框架**: React 19.2 + TypeScript 5.8
- **构建工具**: Vite 6.2
- **UI样式**: Tailwind CSS (via CDN)
- **图标库**: Lucide React
- **AI集成**: Google Gemini API / OpenAI Compatible APIs
- **Markdown渲染**: React-Markdown

### 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 📄 开源协议

本项目采用 MIT License 开源。详情请见 [LICENSE](LICENSE) 文件。

### 🙏 致谢

- 感谢 Google Gemini 团队提供强大的多模态AI能力
- 提示词架构灵感来源于学术界的最佳实践与研究方法论

### 📧 联系方式

- **在线演示**: https://scholarprompt.vercel.app
- **项目主页**: https://github.com/quzhiii/Scholar-Prompt
- **问题反馈**: [GitHub Issues](https://github.com/quzhiii/Scholar-Prompt/issues)

### 🔑 关于 API Key 与费用

**ScholarPrompt 是完全免费的开源工具，采用"用户自备 API Key"模式：**

#### 为什么这样设计？

1. **🔒 安全性**
   - 不存储任何用户数据
   - 所有 API 调用都在您的浏览器中完成
   - API Key 保存在本地浏览器，永不上传

2. **💰 超低成本**
   - 项目完全开源免费
   - 使用 DeepSeek：新用户送 ￥5（约 5000 万 tokens）
   - 典型使用：生成一篇综述约消耗 ￥0.01-0.05
   - **每天使用成本 < ￥1**
   - 使用自己的免费 API 配额

3. **⚡ 灵活性**
   - 可选择任何兼容的 AI 服务商
   - 自主控制使用频率和配额
   - 切换不同模型（DeepSeek/Kimi/GLM/Qwen）

#### API 服务商价格对比（2025年最新）

| 服务商 | 注册赠送 | 输入价格 | 输出价格 | PDF支持 | 综合评分 |
|--------|---------|---------|---------|---------|----------|
| **DeepSeek v3** 🏆 | ￥5 | ￥0.1/M tokens | ￥0.28/M tokens | ✅ | ⭐⭐⭐⭐⭐ |
| **Kimi R2** | 试用额度 | ￥0.1/M tokens | ￥0.1/M tokens | ✅ 原生 | ⭐⭐⭐⭐ |
| **通义千问** | 试用额度 | ￥0.4/M tokens | ￥1.2/M tokens | ✅ | ⭐⭐⭐⭐ |
| **智谱 GLM-4** | ￥25 | ￥5/M tokens | ￥5/M tokens | ✅ | ⭐⭐⭐ |
| **Gemini Flash** | 已取消 | $0.075/M tokens | $0.30/M tokens | ✅ 原生 | ⭐⭐⭐ |

**💰 费用估算（以 DeepSeek 为例）：**
- **文献综述**（3万字）：约 ￥0.02
- **论文写作**（5千字 × 5次修改）：约 ￥0.05
- **数据分析**（生成Python代码）：约 ￥0.01
- **每日重度使用**（20次生成）：约 ￥0.50
- **￥5 赠送额度可使用 100+ 天**

💡 **推荐配置**：
- 🏆 **性价比最高** → **DeepSeek v3**（新用户送￥5，价格最低）
- 📄 **PDF 原生支持** → **Kimi R2**（128K上下文，PDF解析好）
- 🇨🇳 **国内网络稳定** → **通义千问** / **智谱 GLM**
- 🌟 **最强能力（付费）** → **Gemini 3 Pro**（多模态最强）

#### 快速获取 API Key

**方法 1：使用 Gemini（推荐，支持 PDF）**

1. 访问 [Google AI Studio](https://ai.google.dev/aistudio)
2. 使用 Google 账号登录
3. 点击左侧 "Get API key"
4. 点击 "Create API key" 创建新密钥
5. 复制生成的 API Key（格式：`AIza...`）
6. 在 ScholarPrompt 设置中：
   - Base URL 保持默认：`https://generativelanguage.googleapis.com/v1beta`
   - API Key：粘贴你复制的密钥
   - Model：选择模型（推荐最新的 `gemini-3-pro-preview`）
     - **Gemini 3 Pro Preview**: 🌟 最新预览版，强大推理+多模态（推荐！）
     - **Gemini 2.0 Flash Exp**: 快速版本
     - **Gemini 2.0 Flash Thinking**: 深度思考推理模式
     - **Gemini 1.5 Pro**: 稳定版，128K 长上下文
7. 点击"保存配置"

**方法 2：使用国内服务商（以通义千问为例）**

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com)
2. 注册并登录阿里云账号
3. 进入"API Key 管理"创建密钥
4. 在 ScholarPrompt 设置中选择"国内 AI 服务商"：
   - Base URL：`https://dashscope.aliyuncs.com/compatible-mode/v1`
   - API Key：你的通义千问 API Key
   - Model：`qwen-vl-max`（支持图片）或 `qwen-max`（纯文本）
5. 点击"保存配置"

**其他国内服务商配置示例：**

| 服务商 | Base URL | 模型示例 |
|--------|----------|----------|
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` | `glm-4v-plus` (图片), `glm-4-plus` (文本) |
| Kimi | `https://api.moonshot.cn/v1` | `moonshot-v1-auto` |
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |

⚠️ **重要提示**：
- Gemini 原生支持 PDF：直接上传，无需转换
- 国内服务支持图片：需将 PDF 转为 JPG/PNG 后上传
- API Key 仅保存在您的浏览器本地，不会上传到任何服务器

---

## English

### 📖 About

**ScholarPrompt** is a professional prompt engineering tool designed specifically for academic researchers. Built on the cutting-edge **Standard Prompt Framework**, it helps scholars efficiently leverage Large Language Models (LLMs) for literature review, academic writing, data analysis, and more.

### ✨ Key Highlights

#### 🎯 1. Comprehensive Academic Scenarios
- **Literature Review**: Upload up to 20 PDF papers for automated research gap identification
- **Ideation & Structure**: Refine research questions using FINER criteria
- **Academic Writing**: Expand bullet points into Nature/Science-style prose
- **Polishing**: Multi-objective optimization (clarity/conciseness/formality/fluency)
- **Methods & Analysis**: Generate Python data cleaning scripts, recommend methodologies
- **Submission Support**: Generate diplomatic reviewer rebuttals

#### 🏗️ 2. Standard Prompt Architecture
Every template follows a structured 6-element design:
```
1. Role - Establish AI's professional identity
2. Instructions - Clear task objectives
3. Context & Constraints - Domain knowledge and boundaries
4. Reasoning Strategy - Chain-of-Thought / step decomposition
5. Input Data - Structured user inputs
6. Output Format - Predefined return structure
```

#### 🔄 3. Multi-Model Support
- **Native Gemini**: Supports file uploads (multi-PDF analysis)
- **Custom API**: Compatible with OpenAI-format endpoints
  - DeepSeek, Qwen, Kimi (Moonshot)
  - Claude, GPT-4, etc.

#### 🌍 4. Bilingual Interface
- Full English / Chinese support
- All prompt templates available in both languages
- One-click language switching

#### 💾 5. History & Reusability
- Auto-save generated prompts and AI responses
- Local storage for privacy protection
- View, copy, and re-edit history

### 🚀 Quick Start

#### ⚡ Online Usage (Recommended)

**No installation required - Use immediately!**

1. Visit deployment:
   - **Vercel Deployment**: https://scholarprompt.vercel.app (Recommended)
   - **GitHub Pages**: https://quzhiii.github.io/Scholar-Prompt

2. First-time setup - Configure API Key:
   - Click "Settings" icon ⚙️ in the bottom left
   - Choose API Provider:
     - **Gemini** - Free, full-featured (PDF upload support) → [Get API Key](https://ai.google.dev/aistudio)
     - **Custom API** - DeepSeek/Qwen/Kimi and other services

3. Start using! Select a template, enter content, click "Run with Gemini"

> 💡 **Note**: GitHub Pages version requires users to configure their own API Key. Vercel version can have API Key pre-configured in environment variables.

#### 🏠 Local Development

**Prerequisites**
- Node.js 18+
- Modern browser (Chrome / Edge / Safari / Firefox)

**Steps:**

1. **Clone Repository**
```bash
git clone https://github.com/quzhiii/Scholar-Prompt.git
cd Scholar-Prompt
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure API Key** (Optional)

Create `.env.local` file and add your Gemini API Key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

> 💡 If not configured, the app will prompt you to manually enter API Key in Settings.

4. **Start Dev Server**
```bash
npm run dev
```

App will run on `http://localhost:3000`.

#### Production Build

```bash
npm run build
npm run preview
```

Build output is in `dist/` and can be deployed to any static hosting (Vercel / Netlify / GitHub Pages).

### 📂 Project Structure

```
scholarprompt/
├── components/           # React components
│   ├── LandingPage.tsx   # Landing page
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── PromptBuilder.tsx # Form builder
│   ├── OutputSection.tsx # Output & execution
│   ├── History.tsx       # History view
│   └── SettingsModal.tsx # Settings modal
├── services/             # Service layer
│   ├── geminiService.ts  # API integration
│   └── storageService.ts # Local storage
├── constants.tsx         # Templates & i18n
├── types.ts              # TypeScript types
├── App.tsx               # Main app component
└── index.tsx             # Entry point
```

### 🎨 Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API / OpenAI Compatible
- **Markdown**: React-Markdown

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

### 🙏 Acknowledgments

- Thanks to Google Gemini team for powerful multimodal AI capabilities
- Prompt architecture inspired by academic best practices and research methodologies

### 📧 Contact

- **Live Demo**: https://scholarprompt.vercel.app
- **Project Home**: https://github.com/quzhiii/Scholar-Prompt
- **Issues**: [GitHub Issues](https://github.com/quzhiii/Scholar-Prompt/issues)

### 🔑 About API Keys

**ScholarPrompt uses client-side API calls to protect user privacy and data security:**

1. **Fully Transparent** - All API calls are made from your browser
2. **Data Security** - Your research content doesn't pass through any third-party servers
3. **User Control** - Use your own API Key, manage your own quota

**Get Free API Keys:**
- **Gemini**: [Google AI Studio](https://ai.google.dev/aistudio) - Free, 60 requests/minute
- **DeepSeek**: [DeepSeek Platform](https://platform.deepseek.com) - Available in China
- **Qwen**: [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) - Available in China

> 💡 **Why no built-in API Key?**
> 1. Security - Public API Keys would be abused, causing service disruption
> 2. Fairness - Each user uses their own quota, avoiding resource contention
> 3. Flexibility - Users can choose any compatible AI service provider

---

<div align="center">

**Made with ❤️ for the Academic Research Community**

⭐ If you find this project helpful, please consider giving it a star!

</div>

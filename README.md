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
  - Claude / GPT-4 等

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

**无需安装，直接使用！**

1. 访问部署地址：
   - **Vercel 部署版**：https://scholarprompt.vercel.app （推荐）
   - **GitHub Pages**：https://quzhiii.github.io/Scholar-Prompt

2. 首次使用需配置 API Key：
   - 点击左下角"设置"图标 ⚙️
   - 选择 API 提供商：
     - **Gemini** - 免费，功能完整（支持PDF上传）→ [获取 API Key](https://ai.google.dev/aistudio)
     - **自定义API** - DeepSeek/Qwen/Kimi 等国内服务

3. 开始使用！选择模板，输入内容，点击"AI 深度运行"

> 💡 **注意**：GitHub Pages 版本需要用户自己配置 API Key。Vercel 版本可以在环境变量中预配置。

#### 🏠 本地运行

**环境要求**
- Node.js 18+ 
- 现代浏览器（Chrome / Edge / Safari / Firefox）

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

3. **配置API密钥** (可选)

创建 `.env.local` 文件，添加你的Gemini API Key：
```
VITE_GEMINI_API_KEY=your_api_key_here
```

> 💡 如果不配置，应用会提示在设置中手动输入 API Key。

4. **启动开发服务器**
```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

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

### 🔑 关于 API Key

**ScholarPrompt 使用客户端 API 调用模式，保护用户隐私和数据安全：**

1. **完全透明** - 所有 API 调用都在您的浏览器中完成
2. **数据安全** - 您的研究内容不会经过任何第三方服务器
3. **自主控制** - 使用您自己的 API Key，掌握使用配额

**获取免费 API Key：**
- **Gemini**: [Google AI Studio](https://ai.google.dev/aistudio) - 免费，每分钟60次请求
- **DeepSeek**: [DeepSeek 开放平台](https://platform.deepseek.com) - 国内可用
- **通义千问**: [阿里云百炼](https://bailian.console.aliyun.com/) - 国内可用

> 💡 **为什么不内置 API Key？**
> 1. 安全性 - 公开的 API Key 会被滥用，导致服务中断
> 2. 公平性 - 每个用户使用自己的配额，避免资源抢占
> 3. 灵活性 - 用户可以选择任何兼容的 AI 服务商

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

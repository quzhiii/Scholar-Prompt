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
- **Kimi K2 模式**：✅ 原生PDF支持，已测试可用（推荐）
  - kimi-k2-turbo-preview（最新）
  - moonshot-v1-128k/32k/8k
- **Gemini 模式**：备选方案，但需付费
  - gemini-2.0-flash-exp
  - gemini-1.5-pro

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
   
   > 💡 **国内访问说明**：
   > 
   > **问题**：Vercel 和 GitHub Pages 在国内可能访问较慢或无法访问
   > 
   > **解决方案（2选1）**：
   > 1. **使用代理/VPN** - 最简单，访问速度快
   > 2. **本地运行** - 见下方"本地开发运行"章节，完全离线使用
   > 
   > **CORS 跨域说明**：
   > - ✅ Kimi K2：已测试可用，无跨域问题（推荐）
   > - ✅ Gemini：原生支持，但需付费
   > 
   > **CORS 跨域说明**：
   > - ✅ Kimi K2：已测试可用，无跨域问题（推荐）
   > - ✅ Gemini：原生支持，但需付费

2. **首次配置 API Key**（仅需一次）：
   
   点击左下角 **⚙️ 设置** → 按以下步骤配置：

   **🏆 推荐方案：Kimi K2（已测试可用 - 原生PDF支持）**
   
   | 模型 | PDF支持 | 特点 | 推荐指数 |
   |------|---------|------|----------|
   | **kimi-k2-turbo-preview** ⭐ | ✅ 原生 | 最新K2，已测试可用 | 🌟🌟🌟🌟🌟 |
   | **moonshot-v1-128k** | ✅ 原生 | 128K超长上下文 | 🌟🌟🌟🌟 |

   **快速配置 Kimi K2（推荐）：**
   ```
   1. 访问: https://platform.moonshot.cn
   2. 注册账号 → 充值（最低10元）
   3. 创建 API Key → 复制
   4. 在 ScholarPrompt 设置中：
      - 选择"Kimi"区块
      - 📄 从下拉菜单选择: kimi-k2-turbo-preview (自动填充配置)
      - Base URL: https://api.moonshot.cn/v1 (已自动填充)
      - API Key: 粘贴您的 Key
      - Model: kimi-k2-turbo-preview (已自动填充)
   5. 点击"保存配置"
   ```
   
   > ✅ **已测试确认**: kimi-k2-turbo-preview 在浏览器环境完全可用

   **备选方案：Google Gemini（需付费）**
   
   - 访问: https://ai.google.dev/aistudio
   - ⚠️ 注意: Gemini免费额度已取消，需绑定付费账户
   - ✅ 优势: 多模态能力最强
   - 💵 价格: $0.075-0.30/M tokens

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

---

### 🌐 国内访问与技术说明

#### 国内访问解决方案

**问题**: Vercel 和 GitHub Pages 在国内可能访问缓慢

**解决方案（2选1）**:

1. **使用代理/VPN** ⭐ 推荐
   - 最简单快捷
   - 访问速度最快
   - 所有功能完整可用

2. **本地运行** 
   ```bash
   git clone https://github.com/quzhiii/Scholar-Prompt.git
   cd Scholar-Prompt
   npm install
   npm run dev
   ```
   - 完全离线使用
   - 无需担心网络问题
   - 适合长期重度使用

#### CORS 跨域问题说明

**什么是 CORS？**

CORS (Cross-Origin Resource Sharing) 是浏览器的安全机制。当您的网站调用其他域名的 API 时，浏览器会检查 API 服务器是否允许跨域访问。

**ScholarPrompt 的解决方案：**

✅ **Kimi K2 原生支持 CORS**

- **无需代理**: Kimi API 原生支持 CORS，直接调用
- **已测试确认**: kimi-k2-turbo-preview 在浏览器环境完全可用
- **完全透明**: 用户无需任何额外配置

**技术细节** (开发者参考):
- Kimi API (api.moonshot.cn) 返回正确的 CORS 头
- 支持浏览器直接调用，无需服务器中转
- 测试工具: test-api.html

---

### 🔑 关于 API Key 与费用

**ScholarPrompt 是完全免费的开源工具，采用"用户自备 API Key"模式：**

#### 为什么这样设计？

1. **🔒 安全性**: API Key 保存在本地浏览器，所有调用在您的浏览器中完成，永不上传
2. **💰 低成本**: 使用 Kimi K2 性价比高，适合学术研究
3. **⚡ 灵活性**: 可选择 Kimi 或 Gemini，自主控制使用频率

#### API 服务商价格对比（2025年最新）

| 服务商 | PDF支持 | 价格 | 综合评分 |
|--------|---------|------|----------|
| **Kimi K2 Turbo** ⭐ | 低成本 | 低成本 | 低成本 | ✅ 原生 | ⭐⭐⭐⭐⭐ |
| **Moonshot V1-128k** | 低成本 | 低成本 | 低成本 | ✅ 原生 | ⭐⭐⭐⭐ |
| **Gemini Flash** | 已取消免费 | $0.075/M tokens | $0.30/M tokens | ✅ 原生 | ⭐⭐⭐ |

💡 **推荐配置**：
- 🏆 **已测试可用** → **Kimi K2 Turbo**（kimi-k2-turbo-preview，浏览器环境完全支持）
- 📄 **PDF 原生支持** → **Moonshot V1-128k**（128K超长上下文，稳定可靠）
- 🌟 **备选方案（付费）** → **Gemini 2.0 Flash**（多模态最强但需付费）

---

#### 💡 API Key 获取教程

##### 🏆 推荐: Kimi K2 (已测试可用 - 原生PDF支持)

**为什么选择 Kimi K2?**
- ✅ **已测试确认**: kimi-k2-turbo-preview 在浏览器环境完全可用
- 📄 **原生 PDF 支持**: 直接上传 PDF 文件，支持 OCR
- 💰 **价格合理**: 低成本，性价比高
- 🚀 **最新技术**: K2 系列是 Moonshot 最新一代模型

**配置步骤:**

1. **注册账号**
   - 访问: https://platform.moonshot.cn
   - 点击右上角"注册"
   - 使用手机号或邮箱注册

2. **充值**
   - 最低充值 10元
   - 支持微信/支付宝

3. **获取 API Key**
   - 登录后进入"API Keys"页面
   - 点击"创建 API Key"
   - 复制生成的密钥

4. **在 ScholarPrompt 中配置**
   - 打开设置 → 展开"Kimi"区块
   - 📄 从下拉菜单选择: **kimi-k2-turbo-preview** (自动填充配置)
   - **Base URL**: https://api.moonshot.cn/v1 (已自动填充)
   - **API Key**: 粘贴您的密钥
   - **Model**: kimi-k2-turbo-preview (已自动填充)
   - 点击"保存配置"

5. **开始使用**
   - ✅ 已在 test-api.html 测试通过
   - 支持多文档PDF分析
   - 无 CORS 跨域问题

---

##### 🌐 备选方案: Google Gemini (需付费)

**注意**: Gemini 免费额度已取消，需绑定付费账号

1. 访问: https://ai.google.dev/aistudio
2. 登录 Google 账号并绑定付费信息
3. 创建 API Key(格式: `AIza...`)
4. 在设置中选择 Gemini，配置会自动填充
5. 推荐模型: `gemini-2.0-flash-exp`

---

⚠️ **隐私保护**: 所有 API Key 仅保存在浏览器本地，不会上传到任何服务器

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
  - Kimi K2 (Moonshot)
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
     - **Custom API** - Kimi K2 and other compatible services

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

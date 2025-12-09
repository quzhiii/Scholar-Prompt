# GitHub Pages 设置指南

## 启用 GitHub Pages

1. **访问仓库设置**
   - 打开 https://github.com/quzhiii/Scholar-Prompt
   - 点击 `Settings` (设置)

2. **配置 Pages**
   - 在左侧菜单找到 `Pages`
   - 在 **Source** 下拉菜单中选择：`GitHub Actions`
   - 保存设置

3. **等待部署**
   - 推送代码后会自动触发部署
   - 在 `Actions` 标签页查看部署进度
   - 部署成功后，网站将在以下地址访问：
     - https://quzhiii.github.io/Scholar-Prompt/

## 自动部署流程

每次推送到 `main` 分支时，GitHub Actions 会自动：
1. 安装依赖 (`npm ci`)
2. 构建项目 (`npm run build`)
3. 部署到 GitHub Pages

## 故障排除

如果遇到 404 错误：
- 确认 Settings > Pages > Source 设置为 `GitHub Actions`
- 检查 Actions 标签页中的部署日志
- 确认 `vite.config.ts` 中的 `base: '/Scholar-Prompt/'` 配置正确

## 验证部署

部署完成后访问：https://quzhiii.github.io/Scholar-Prompt/

应该能看到完整的 ScholarPrompt 应用界面。

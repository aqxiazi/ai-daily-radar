# AI Daily Radar ⚡

全自动 AI 资讯 + 工具导航站。

## 架构

- **前端**: Nuxt 3 + TailwindCSS (SSR)
- **内容**: @nuxt/content (Markdown)
- **部署**: Vercel (免费)
- **自动化**: GitHub Actions 每天抓取 RSS → AI 生成内容 → 自动 Commit

## 本地开发

```bash
cd ~/Desktop/ai-daily-radar
npm install
npm run dev
```

## 部署到线上

1. 在 GitHub 创建新仓库 `ai-daily-radar`
2. 推送代码:
   ```bash
   git init
   git remote add origin git@github.com:你的用户名/ai-daily-radar.git
   git branch -M main
   git add . && git commit -m "init"
   git push -u origin main
   ```
3. 在 Vercel 导入该仓库 → 自动部署
4. 部署完成后访问 `ai-daily-radar.vercel.app`

## 自动化

- GitHub Actions 每天 UTC 00:00 (北京时间 08:00) 自动抓取
- 新内容自动入库 → 触发 Vercel 重新部署 → 网站更新
- 你什么都不用管

## 成本

- Vercel: 免费
- GitHub Actions: 免费 (2000分钟/月)
- 域名: 暂用 Vercel 二级域名 (免费)

## 变现

1. 文章中的 affiliateLink 指向工具官网 → CPS 分成
2. 流量起来后接 Google AdSense
3. 高级会员/付费模板 (后期)

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import TurndownService from 'turndown';

const turndown = new TurndownService();

// 配置 RSS 源
const RSS_SOURCES = [
  { name: 'HackerNews AI', url: 'https://hnrss.org/newest?q=AI&count=10', category: 'AI' },
  { name: 'HackerNews Best', url: 'https://hnrss.org/best?count=10', category: '开源' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: '资讯' },
];

const CONTENT_DIR = path.join('content', 'posts');
if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

// 简单的 RSS 解析器
function parseRSS(xml) {
  const items = [];
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const item = match[1];
    const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || '').replace(/&#\d+;/g, '');
    const link = item.match(/<link>(.*?)<\/link>/)?.[1];
    const rawDesc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || item.match(/<description>(.*?)<\/description>/)?.[1] || '';
    const description = turndown.turndown(rawDesc.replace(/&#\d+;/g, ''));
    if (title && link) {
      items.push({ title, link, description });
    }
  }
  return items;
}

// 模拟 LLM 调用 (实际部署时替换为 Jellyfish API)
async function summarizeWithAI(item) {
  // 这里模拟 AI 生成，实际可接入 OpenAI/Jellyfish
  // 示例：返回结构化的 Markdown
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const date = new Date().toISOString().split('T')[0];
  
  const content = `---
title: "${item.title.replace(/"/g, '\\"')}"
date: ${date}
category: 工具
description: "自动生成的 AI 工具简介"
source: AI Daily Radar
affiliateLink: "${item.link}"
---

## 简介

${item.description.substring(0, 200)}...

## 核心功能

1. **智能生成**：利用最新 AI 模型提升效率。
2. **自动化流程**：一键完成复杂任务。

> 💡 **提示**: 通过上方链接访问官网，体验最新功能。

[阅读原文](${item.link})
`;
  return { slug, content };
}

async function fetchAndSave() {
  console.log('🔍 开始抓取数据...');
  
  for (const source of RSS_SOURCES) {
    try {
      console.log(`正在抓取 ${source.name}...`);
      const res = await axios.get(source.url, {
        headers: { 'User-Agent': 'AI-Daily-Radar/1.0' },
        timeout: 10000
      });
      
      const items = parseRSS(res.data);
      
      for (const item of items.slice(0, 3)) { // 每个源只取前 3 条
        const { slug, content } = await summarizeWithAI(item);
        const filePath = path.join(CONTENT_DIR, `${slug}.md`);
        
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`✅ 已保存: ${slug}`);
        }
      }
    } catch (err) {
      console.error(`❌ ${source.name} 抓取失败:`, err.message);
    }
  }
  
  console.log('🎉 抓取完成！');
}

fetchAndSave();

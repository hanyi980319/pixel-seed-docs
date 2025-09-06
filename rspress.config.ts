import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Pixel Seed 文档',
  description: 'AI 驱动的像素风游戏生成器 - 完整文档',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '快速开始',
        link: '/guide/',
      },
      {
        text: 'API 文档',
        link: '/api/',
      },
      {
        text: '架构设计',
        link: '/architecture/',
      },
      {
        text: '产品需求',
        link: '/prd/',
      },
      {
        text: '常见问题',
        link: '/faq/',
      },
      {
        text: '部署指南',
        link: '/deployment/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [
            {
              text: '介绍',
              link: '/guide/',
            },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            {
              text: 'API 概览',
              link: '/api/',
            },
          ],
        },
      ],
      '/architecture/': [
        {
          text: '架构设计',
          items: [
            {
              text: '系统架构',
              link: '/architecture/',
            },
          ],
        },
      ],
      '/prd/': [
        {
          text: '产品需求文档',
          items: [
            {
              text: 'PRD 概览',
              link: '/prd/',
            },
          ],
        },
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            {
              text: 'FAQ',
              link: '/faq/',
            },
          ],
        },
      ],
      '/deployment/': [
        {
          text: '部署指南',
          items: [
            {
              text: '部署配置',
              link: '/deployment/',
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/pixel-seed/pixel-seed',
      },
    ],
    footer: {
      message: 'Released under the MIT License. Copyright © 2024 Pixel Seed Team',
    },
  },
});

# 快速开始

欢迎来到 **Pixel Seed** 的世界！本指南将帮助你快速了解如何使用 AI 生成属于自己的像素风游戏世界。

## 🎯 核心概念

### 什么是 Pixel Seed？

Pixel Seed 是一款基于 AI 生成的 2D 像素风网页游戏，核心创新在于：

- **AI 驱动内容生成**：使用大语言模型和图像生成技术
- **主题驱动创作**：通过"种子"（主题/提示词）生成游戏世界
- **即时游戏化**：生成的内容可立即用于游戏体验
- **无限创意可能**：每次生成都是独特的像素宇宙

### 核心理念

> **"A Seed, A World."**  
> 每一次生成，都是一次独特的创造。AI 是世界的"种子"，玩家是世界的"探索者"。

## 🚀 开始使用

### 第一步：选择主题

你可以通过两种方式开始创建你的像素世界：

#### 1. 预设主题

我们提供了四个精心设计的预设主题：

- **🏰 史诗魔幻 (Epic Fantasy)**
  - 包含：魔法、龙、城堡、森林等元素
  - 适合：喜欢奇幻冒险的玩家

- **🌃 赛博朋克 (Cyberpunk)**
  - 包含：霓虹灯、机械、未来城市等元素
  - 适合：科幻爱好者

- **🤠 西部世界 (Western World)**
  - 包含：牛仔、酒馆、沙漠景观、边疆小镇等元素
  - 适合：西部片粉丝

- **🐠 海底世界 (Underwater World)**
  - 包含：珊瑚礁、深海生物、古代海底文明等元素
  - 适合：海洋探索爱好者

#### 2. 自定义主题

你也可以输入自己的创意提示词：

```
示例提示词：
- "蒸汽朋克风格的天空之城，充满齿轮和飞艇"
- "末日废土中的机器人城市，锈迹斑斑但充满希望"
- "糖果王国的甜蜜冒险，彩虹桥和棉花糖云朵"
- "忍者村庄的夜晚，樱花飞舞和月光如水"
```

:::tip 提示词技巧
- 描述具体的视觉元素和氛围
- 包含色彩、材质、建筑风格等细节
- 保持在 200 字符以内
- 可以混合不同的风格元素
:::

### 第二步：AI 生成内容

点击"生成"按钮后，AI 将为你创建：

1. **角色形象** (1328×1328px)
   - 符合主题风格的像素角色
   - 支持游戏中的移动和动画

2. **游戏背景** (1664×928px)
   - 沉浸式的场景背景
   - 多层次的视觉深度

3. **地面纹理**
   - 可行走的地面元素
   - 与主题风格一致的材质

4. **障碍物**
   - 环境装饰元素
   - 增加场景的丰富度

:::info 生成时间
通常需要 10-30 秒完成所有内容的生成，请耐心等待。
:::

### 第三步：预览和调整

生成完成后，你将看到四象限预览界面：

- **左上角**：角色预览
- **右上角**：背景预览
- **左下角**：地面纹理
- **右下角**：障碍物

如果对某个元素不满意，可以点击对应的"重新生成"按钮单独重新生成该元素。

### 第四步：开始游戏

满意生成结果后，点击"开始游戏"按钮进入游戏界面。

## 🎮 游戏操作

### 基础控制

- **移动**：`WASD` 键或方向键
- **跳跃**：`W` 键、上方向键或空格键
- **下蹲**：`S` 键或下方向键
- **暂停**：`ESC` 键

### 游戏特性

- **重力系统**：角色会自然下落到地面
- **边界限制**：防止角色移出游戏区域
- **流畅动画**：平滑的移动和方向切换
- **响应式设计**：支持不同屏幕尺寸

## 🛠️ 技术架构

### 前端技术栈

- **框架**：Next.js 15.5.2
- **样式**：Tailwind CSS 4.0
- **状态管理**：Zustand 5.0.8
- **UI 组件**：Ant Design 5.27.1
- **动画**：Framer Motion 12.23.12

### AI 集成

- **图像生成**：Qwen-Image (DashScope API)
- **生成规格**：
  - 角色：1328×1328px，像素艺术风格
  - 背景：1664×928px，横向场景
  - 统一的《死亡细胞》风格调色板

### 游戏渲染

- **混合方案**：CSS 背景 + 绝对定位角色
- **游戏循环**：16ms 间隔，60fps 流畅体验
- **状态同步**：实时位置和动作状态管理

## 🔧 高级功能

### 主题管理

- **持久化存储**：使用 localStorage 保存创建的主题
- **主题删除**：支持删除自定义主题
- **主题重用**：可以重新使用之前创建的主题

### 图像重新生成

每个图像类型都支持独立重新生成：

```typescript
// 重新生成特定类型的图像
const regenerateImage = async (type: 'character' | 'background' | 'ground' | 'obstacle') => {
  // 调用 API 重新生成指定类型的图像
  // 更新对应的状态和 UI
}
```

### 状态管理

使用 Zustand 进行全局状态管理：

- `gameState`：游戏运行状态
- `selectedTheme`：当前选中主题
- `gameData`：游戏数据（角色、背景等）
- `playerPosition`：玩家位置
- `isLoading`：加载状态

## 🎨 自定义开发

### 添加新主题

```typescript
// configs/themes.ts
export const CUSTOM_THEMES: Theme[] = [
  {
    id: 'steampunk',
    name: 'Steampunk Adventure',
    description: 'A world of gears, steam, and Victorian-era machinery',
    // ... 其他配置
  }
]
```

### 扩展游戏机制

```typescript
// 添加碰撞检测
const checkCollision = (playerPos: Position, obstacles: Obstacle[]) => {
  return obstacles.some(obstacle => {
    return playerPos.x < obstacle.x + obstacle.width &&
           playerPos.x + playerWidth > obstacle.x &&
           playerPos.y < obstacle.y + obstacle.height &&
           playerPos.y + playerHeight > obstacle.y
  })
}
```

## 🚀 部署指南

### 本地开发

```bash
# 克隆项目
git clone https://github.com/pixel-seed/pixel-seed.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 环境变量

```env
# .env.local
DASHSCOPE_API_KEY=your_dashscope_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🤝 贡献指南

我们欢迎社区贡献！你可以通过以下方式参与：

1. **报告问题**：在 GitHub Issues 中报告 bug
2. **功能建议**：提出新功能的想法和建议
3. **代码贡献**：提交 Pull Request
4. **文档改进**：完善项目文档

### 开发规范

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 代码规范
- 编写单元测试覆盖核心功能
- 提交前运行完整的测试套件

## 📚 更多资源

- [项目需求文档 (PRD)](/prd) - 详细的产品规划和技术规范
- [API 文档](/api) - 完整的 API 接口说明
- [架构设计](/architecture) - 系统架构和设计理念
- [常见问题](/faq) - 常见问题解答

---

**准备好开始你的 AI 像素世界之旅了吗？** 🚀

立即访问 [Pixel Seed 应用](https://pixel-seed.vercel.app) 开始创造属于你的独特游戏世界！

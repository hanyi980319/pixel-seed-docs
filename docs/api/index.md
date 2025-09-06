# API 文档

本文档详细介绍了 Pixel Seed 项目中使用的 API 接口，包括 AI 图像生成、主题管理和游戏数据处理等核心功能。

## 🎨 图像生成 API

### 生成游戏图像

**接口地址**：`POST /api/generate-image`

**功能描述**：基于主题描述生成游戏所需的像素风格图像

#### 请求参数

```typescript
interface GenerateImageRequest {
  theme: string;           // 主题描述文本
  type: ImageType;         // 图像类型
  style?: string;          // 可选的风格描述
}

type ImageType = 'character' | 'background' | 'ground' | 'obstacle';
```

#### 请求示例

```json
{
  "theme": "史诗魔幻世界，充满魔法和神秘色彩",
  "type": "character",
  "style": "像素艺术风格，参考《死亡细胞》的调色板"
}
```

#### 响应格式

```typescript
interface GenerateImageResponse {
  success: boolean;
  data?: {
    imageUrl: string;      // 生成的图像URL
    prompt: string;        // 实际使用的提示词
    taskId: string;        // 任务ID（用于追踪）
  };
  error?: {
    code: string;
    message: string;
  };
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "imageUrl": "https://dashscope.oss-cn-beijing.aliyuncs.com/images/xxx.png",
    "prompt": "pixel art character in epic fantasy style...",
    "taskId": "task_12345"
  }
}
```

#### 图像规格说明

| 类型 | 尺寸 | 描述 |
|------|------|------|
| character | 1328×1328px | 角色形象，正方形，支持动画 |
| background | 1664×928px | 游戏背景，横向场景 |
| ground | 自适应 | 地面纹理，可平铺 |
| obstacle | 自适应 | 障碍物和装饰元素 |

### 批量生成图像

**接口地址**：`POST /api/generate-batch`

**功能描述**：一次性生成游戏所需的所有图像类型

#### 请求参数

```typescript
interface GenerateBatchRequest {
  theme: string;
  types: ImageType[];
  style?: string;
}
```

#### 请求示例

```json
{
  "theme": "赛博朋克未来城市",
  "types": ["character", "background", "ground", "obstacle"],
  "style": "霓虹灯效果，暗色调，像素艺术"
}
```

#### 响应格式

```typescript
interface GenerateBatchResponse {
  success: boolean;
  data?: {
    images: Record<ImageType, {
      imageUrl: string;
      prompt: string;
    }>;
    batchId: string;
  };
  error?: {
    code: string;
    message: string;
    failedTypes?: ImageType[];
  };
}
```

## 🎯 主题管理 API

### 获取预设主题

**接口地址**：`GET /api/themes/presets`

**功能描述**：获取系统预设的主题列表

#### 响应格式

```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  prompt: string;
  tags: string[];
  preview?: string;
}

interface GetPresetsResponse {
  success: boolean;
  data?: Theme[];
  error?: {
    code: string;
    message: string;
  };
}
```

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "id": "epic-fantasy",
      "name": "史诗魔幻",
      "description": "充满魔法与冒险的奇幻世界",
      "prompt": "epic fantasy world with magic, dragons, castles...",
      "tags": ["fantasy", "magic", "adventure"],
      "preview": "https://example.com/preview.jpg"
    }
  ]
}
```

### 保存自定义主题

**接口地址**：`POST /api/themes/custom`

**功能描述**：保存用户创建的自定义主题

#### 请求参数

```typescript
interface SaveCustomThemeRequest {
  name: string;
  description: string;
  prompt: string;
  tags?: string[];
}
```

#### 请求示例

```json
{
  "name": "蒸汽朋克天空城",
  "description": "充满齿轮和蒸汽的空中城市",
  "prompt": "steampunk sky city with gears, steam, airships...",
  "tags": ["steampunk", "sky", "mechanical"]
}
```

### 删除自定义主题

**接口地址**：`DELETE /api/themes/custom/{themeId}`

**功能描述**：删除指定的自定义主题

#### 路径参数

- `themeId`: 主题ID

#### 响应格式

```typescript
interface DeleteThemeResponse {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}
```

## 🎮 游戏数据 API

### 保存游戏数据

**接口地址**：`POST /api/game/save`

**功能描述**：保存当前游戏状态和生成的资源

#### 请求参数

```typescript
interface SaveGameRequest {
  themeId: string;
  gameData: {
    character: {
      imageUrl: string;
      position: { x: number; y: number };
    };
    background: {
      imageUrl: string;
    };
    ground: {
      imageUrl: string;
    };
    obstacles: Array<{
      imageUrl: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }>;
  };
  metadata: {
    createdAt: string;
    playTime?: number;
    score?: number;
  };
}
```

### 加载游戏数据

**接口地址**：`GET /api/game/load/{gameId}`

**功能描述**：加载指定的游戏存档

#### 路径参数

- `gameId`: 游戏存档ID

#### 响应格式

```typescript
interface LoadGameResponse {
  success: boolean;
  data?: {
    gameId: string;
    themeId: string;
    gameData: SaveGameRequest['gameData'];
    metadata: SaveGameRequest['metadata'];
  };
  error?: {
    code: string;
    message: string;
  };
}
```

## 🔧 工具类 API

### 图像处理

**接口地址**：`POST /api/utils/process-image`

**功能描述**：对生成的图像进行后处理（裁剪、缩放、格式转换等）

#### 请求参数

```typescript
interface ProcessImageRequest {
  imageUrl: string;
  operations: Array<{
    type: 'resize' | 'crop' | 'format' | 'filter';
    params: Record<string, any>;
  }>;
}
```

#### 请求示例

```json
{
  "imageUrl": "https://example.com/image.png",
  "operations": [
    {
      "type": "resize",
      "params": { "width": 1328, "height": 1328 }
    },
    {
      "type": "format",
      "params": { "format": "webp", "quality": 90 }
    }
  ]
}
```

### 提示词优化

**接口地址**：`POST /api/utils/optimize-prompt`

**功能描述**：优化用户输入的主题描述，生成更适合 AI 图像生成的提示词

#### 请求参数

```typescript
interface OptimizePromptRequest {
  userInput: string;
  imageType: ImageType;
  style?: string;
  language?: 'zh' | 'en';
}
```

#### 响应格式

```typescript
interface OptimizePromptResponse {
  success: boolean;
  data?: {
    optimizedPrompt: string;
    keywords: string[];
    suggestions: string[];
  };
  error?: {
    code: string;
    message: string;
  };
}
```

## 📊 统计分析 API

### 获取使用统计

**接口地址**：`GET /api/analytics/usage`

**功能描述**：获取 API 使用统计信息

#### 查询参数

- `period`: 统计周期（day, week, month）
- `startDate`: 开始日期（YYYY-MM-DD）
- `endDate`: 结束日期（YYYY-MM-DD）

#### 响应格式

```typescript
interface UsageAnalyticsResponse {
  success: boolean;
  data?: {
    totalRequests: number;
    successRate: number;
    averageResponseTime: number;
    popularThemes: Array<{
      theme: string;
      count: number;
    }>;
    imageTypeDistribution: Record<ImageType, number>;
    dailyStats: Array<{
      date: string;
      requests: number;
      errors: number;
    }>;
  };
}
```

## 🚨 错误码说明

### 通用错误码

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| `INVALID_REQUEST` | 请求参数无效 | 检查请求参数格式和必填字段 |
| `UNAUTHORIZED` | 未授权访问 | 检查 API 密钥是否正确 |
| `RATE_LIMIT_EXCEEDED` | 请求频率超限 | 降低请求频率或升级配额 |
| `INTERNAL_ERROR` | 服务器内部错误 | 稍后重试或联系技术支持 |

### 图像生成错误码

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| `GENERATION_FAILED` | 图像生成失败 | 检查提示词内容，避免敏感词汇 |
| `INVALID_THEME` | 主题描述无效 | 提供更具体的主题描述 |
| `UNSUPPORTED_TYPE` | 不支持的图像类型 | 使用支持的图像类型 |
| `QUOTA_EXCEEDED` | 生成配额已用完 | 等待配额重置或升级套餐 |

### 主题管理错误码

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| `THEME_NOT_FOUND` | 主题不存在 | 检查主题ID是否正确 |
| `THEME_EXISTS` | 主题已存在 | 使用不同的主题名称 |
| `INVALID_THEME_DATA` | 主题数据无效 | 检查主题数据格式 |

## 🔐 认证和安全

### API 密钥认证

所有 API 请求都需要在请求头中包含有效的 API 密钥：

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

### 请求限制

- **频率限制**：每分钟最多 60 次请求
- **并发限制**：同时最多 5 个图像生成请求
- **数据大小**：单次请求最大 10MB

### 安全最佳实践

1. **保护 API 密钥**：不要在客户端代码中暴露 API 密钥
2. **使用 HTTPS**：所有 API 请求都应使用 HTTPS
3. **输入验证**：对用户输入进行严格验证
4. **错误处理**：妥善处理 API 错误响应

## 📝 SDK 和示例

### JavaScript/TypeScript SDK

```typescript
import { PixelSeedAPI } from '@pixel-seed/sdk';

const api = new PixelSeedAPI({
  apiKey: process.env.PIXEL_SEED_API_KEY,
  baseURL: 'https://api.pixel-seed.com'
});

// 生成角色图像
const character = await api.generateImage({
  theme: '史诗魔幻世界',
  type: 'character'
});

// 批量生成
const gameAssets = await api.generateBatch({
  theme: '赛博朋克城市',
  types: ['character', 'background', 'ground', 'obstacle']
});
```

### Python SDK

```python
from pixel_seed import PixelSeedAPI

api = PixelSeedAPI(api_key=os.getenv('PIXEL_SEED_API_KEY'))

# 生成图像
result = api.generate_image(
    theme='史诗魔幻世界',
    type='character'
)

if result.success:
    print(f'Generated image: {result.data.image_url}')
```

### cURL 示例

```bash
# 生成角色图像
curl -X POST https://api.pixel-seed.com/api/generate-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "史诗魔幻世界，充满魔法和神秘色彩",
    "type": "character"
  }'

# 获取预设主题
curl -X GET https://api.pixel-seed.com/api/themes/presets \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 🔄 版本控制

当前 API 版本：`v1`

### 版本策略

- **主版本**：不兼容的 API 更改
- **次版本**：向后兼容的功能添加
- **修订版本**：向后兼容的问题修复

### 版本迁移

当发布新的主版本时，我们会：

1. 提前 3 个月通知弃用计划
2. 提供迁移指南和工具
3. 在过渡期内同时支持新旧版本
4. 提供技术支持协助迁移

## 📞 技术支持

如果在使用 API 过程中遇到问题，可以通过以下方式获取帮助：

- **文档**：查看完整的 [API 文档](https://docs.pixel-seed.com)
- **示例代码**：参考 [GitHub 示例仓库](https://github.com/pixel-seed/examples)
- **社区论坛**：在 [讨论区](https://github.com/pixel-seed/pixel-seed/discussions) 提问
- **技术支持**：发送邮件至 support@pixel-seed.com

---

**API 文档持续更新中，如有疑问请及时反馈！** 🚀
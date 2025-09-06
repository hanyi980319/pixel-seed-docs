# 部署指南

本指南将帮助您部署 Pixel Seed 项目到不同的环境中。

## 环境要求

### 系统要求
- **操作系统**: Linux, macOS, Windows
- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 yarn >= 1.22.0
- **内存**: 最小 2GB，推荐 4GB+
- **存储**: 最小 1GB 可用空间

### 依赖服务
- **数据库**: MongoDB 4.4+ 或 PostgreSQL 12+
- **Redis**: 6.0+ (用于缓存和会话管理)
- **AI 服务**: OpenAI API 或兼容的 AI 服务

## 本地开发环境

### 1. 克隆项目
```bash
git clone https://github.com/pixel-seed/pixel-seed.git
cd pixel-seed
```

### 2. 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 环境配置
创建 `.env` 文件：
```bash
cp .env.example .env
```

配置环境变量：
```env
# 应用配置
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# 数据库配置
DATABASE_URL=mongodb://localhost:27017/pixel-seed
# 或 PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/pixel_seed

# Redis 配置
REDIS_URL=redis://localhost:6379

# AI 服务配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://api.openai.com/v1

# 文件存储
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# 安全配置
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret

# 日志配置
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### 4. 启动服务
```bash
# 开发模式
npm run dev

# 生产模式
npm run build
npm start
```

## Docker 部署

### 1. 使用 Docker Compose
创建 `docker-compose.yml`：
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/pixel-seed
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    volumes:
      - ./uploads:/app/uploads

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:
```

### 2. 启动容器
```bash
docker-compose up -d
```

## 云平台部署

### Vercel 部署

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **配置 vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

3. **部署**
```bash
vercel --prod
```

### Heroku 部署

1. **创建 Heroku 应用**
```bash
heroku create pixel-seed-app
```

2. **配置环境变量**
```bash
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=your_key
```

3. **部署**
```bash
git push heroku main
```

### AWS EC2 部署

1. **启动 EC2 实例**
- 选择 Ubuntu 20.04 LTS
- 配置安全组开放 80, 443, 22 端口

2. **安装依赖**
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install nginx -y
```

3. **配置 Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **启动应用**
```bash
# 使用 PM2 启动
pm2 start npm --name "pixel-seed" -- start
pm2 startup
pm2 save
```

## 数据库配置

### MongoDB 配置

1. **本地安装**
```bash
# Ubuntu/Debian
sudo apt install mongodb

# macOS
brew install mongodb-community

# 启动服务
sudo systemctl start mongod
```

2. **云数据库**
- MongoDB Atlas
- AWS DocumentDB
- Azure Cosmos DB

### PostgreSQL 配置

1. **本地安装**
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql

# 创建数据库
sudo -u postgres createdb pixel_seed
```

2. **云数据库**
- AWS RDS
- Google Cloud SQL
- Azure Database

## 性能优化

### 1. 缓存配置
```javascript
// Redis 缓存配置
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('Redis server refused connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
});
```

### 2. CDN 配置
```javascript
// 静态资源 CDN
const CDN_BASE_URL = process.env.CDN_BASE_URL || '';

const getAssetUrl = (path) => {
  return CDN_BASE_URL ? `${CDN_BASE_URL}${path}` : path;
};
```

### 3. 负载均衡
```nginx
upstream pixel_seed {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    location / {
        proxy_pass http://pixel_seed;
    }
}
```

## 监控和日志

### 1. 应用监控
```javascript
// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### 2. 日志配置
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

### 3. 性能监控
- **APM 工具**: New Relic, DataDog, AppDynamics
- **错误追踪**: Sentry, Bugsnag
- **日志聚合**: ELK Stack, Splunk

## 安全配置

### 1. HTTPS 配置
```bash
# 使用 Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. 防火墙配置
```bash
# UFW 配置
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 3. 安全头配置
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
```

## 备份和恢复

### 1. 数据库备份
```bash
# MongoDB 备份
mongodump --db pixel-seed --out /backup/$(date +%Y%m%d)

# PostgreSQL 备份
pg_dump pixel_seed > /backup/pixel_seed_$(date +%Y%m%d).sql
```

### 2. 文件备份
```bash
# 上传文件备份
tar -czf /backup/uploads_$(date +%Y%m%d).tar.gz ./uploads

# 同步到云存储
aws s3 sync /backup s3://your-backup-bucket/
```

## 故障排除

### 常见问题

1. **端口占用**
```bash
# 查看端口占用
lsof -i :3000

# 杀死进程
kill -9 <PID>
```

2. **内存不足**
```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 app.js
```

3. **数据库连接失败**
```bash
# 检查数据库状态
sudo systemctl status mongod
sudo systemctl status postgresql
```

### 日志分析
```bash
# 查看应用日志
pm2 logs pixel-seed

# 查看系统日志
sudo journalctl -u nginx
sudo tail -f /var/log/nginx/error.log
```

## 扩展和维护

### 1. 版本更新
```bash
# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 重启应用
pm2 restart pixel-seed
```

### 2. 数据库迁移
```bash
# 运行迁移脚本
npm run migrate

# 回滚迁移
npm run migrate:rollback
```

### 3. 性能调优
- 定期清理日志文件
- 优化数据库索引
- 监控资源使用情况
- 更新依赖包版本

---

通过本部署指南，您应该能够成功将 Pixel Seed 项目部署到各种环境中。如果遇到问题，请参考故障排除部分或联系技术支持团队。
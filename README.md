# AI 记账本

一个简单的个人记账应用，使用 React + TypeScript + Vite 开发。

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router DOM
- **日期处理**: date-fns
- **数据存储**: LocalStorage
- **代码规范**: ESLint + Prettier

## 项目结构

```
src/
├── components/     # 可复用组件
├── pages/          # 页面组件
│   ├── HomePage.tsx    # 首页（交易列表和统计）
│   └── AddPage.tsx     # 添加交易页面
├── hooks/          # 自定义 Hooks
│   ├── useTransactions.ts  # 交易记录管理
│   └── useStats.ts         # 统计数据计算
├── utils/          # 工具函数
│   └── storage.ts        # LocalStorage 操作
├── types/          # TypeScript 类型定义
│   └── index.ts          # 数据模型定义
├── main.tsx        # 应用入口
└── index.css       # 全局样式
```

## 功能特性

### MVP 功能（已实现）
✅ 添加收支记录
   - 金额输入
   - 类型选择（收入/支出）
   - 分类选择（餐饮、交通、工资等）
   - 备注（可选）
   - 日期选择

✅ 查看记录列表
   - 按日期倒序显示
   - 显示金额、类型、分类、备注
   - 可以删除记录

✅ 月度统计
   - 显示当月总收入
   - 显示当月总支出
   - 显示当月结余

### 数据持久化
所有数据存储在 LocalStorage，无需后端服务。

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000/

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 代码格式化
```bash
npm run format
```

### 代码检查
```bash
npm run lint
```

## 部署

### Vercel 部署
1. 安装 Vercel CLI
2. 运行 `vercel` 命令
3. 按照提示完成部署

## 开发规范

- 使用 TypeScript，确保类型安全
- 组件使用函数式组件 + Hooks
- 使用 Tailwind CSS 编写样式
- 组件名使用 PascalCase
- 函数名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE

## 注意事项

- 保持代码简洁，避免过度设计
- 优先实现核心功能
- 确保移动端适配

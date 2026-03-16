# Node.js + React + Ant Design 示例应用

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-0170FE?style=flat-square&logo=ant-design&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)

一个简洁优雅的全栈应用示例，展示了如何使用 React + Ant Design 构建现代化前端界面，以及使用 Node.js + Express 构建 RESTful API 后端服务。

[在线演示](#-快速开始) · [功能特性](#-功能特性) · [技术栈](#-技术栈) · [API 文档](#-api-文档)

</div>

---

## 📸 应用预览

### 用户管理界面
- ✨ 响应式侧边栏布局
- 📝 表单验证和数据提交
- 📊 数据表格展示
- 🗑️ 用户增删操作
- 💬 友好的消息提示

## ✨ 功能特性

### 前端功能
- 🎨 **现代化 UI** - 使用 Ant Design 组件库，界面美观专业
- 📱 **响应式设计** - 侧边栏可折叠，适配不同屏幕尺寸
- ✅ **表单验证** - 实时验证用户输入（姓名、年龄、邮箱格式）
- 📋 **数据表格** - 支持分页、状态标签、操作按钮
- 🔔 **消息提示** - 操作成功/失败的即时反馈
- ⚡ **React Hooks** - 使用现代化的 React 开发方式

### 后端功能
- 🚀 **RESTful API** - 标准的 REST 接口设计
- 🔄 **CRUD 操作** - 完整的增删改查功能
- 🌐 **CORS 支持** - 跨域资源共享配置
- 📦 **JSON 数据** - 统一的数据格式
- 🧪 **易于测试** - 提供测试脚本

## 🛠 技术栈

### 前端
- **框架**: React 18.x
- **UI 库**: Ant Design 5.x
- **状态管理**: React Hooks (useState)
- **图标**: Ant Design Icons
- **构建工具**: Create React App

### 后端
- **运行时**: Node.js
- **框架**: Express 4.x
- **中间件**: CORS, body-parser

### 开发工具
- **包管理**: npm
- **版本控制**: Git
- **测试**: Shell 脚本

## 📁 项目结构

```
node_sample/
├── client/                 # React 前端应用
│   ├── public/            # 静态资源
│   ├── src/
│   │   ├── App.js        # 主应用组件 ⭐
│   │   ├── App.css       # 样式文件
│   │   └── ...
│   └── package.json
│
├── server/                # Node.js 后端服务
│   ├── index.js          # Express 服务器 ⭐
│   └── package.json
│
├── test-api.sh           # API 测试脚本
├── PROJECT_GUIDE.md      # 详细项目指南
├── QUICK_START.md        # 快速开始指南
└── README.md             # 本文件
```

## 🚀 快速开始

### 前置要求

- Node.js >= 14.x
- npm >= 6.x

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/sjtubzhu-debug/node_sample.git
cd node_sample

# 安装前端依赖
cd client
npm install

# 安装后端依赖
cd ../server
npm install
```

### 启动应用

**方式一：分别启动（推荐用于开发）**

```bash
# 终端 1 - 启动后端服务器
cd server
npm start
# 后端运行在 http://localhost:5001

# 终端 2 - 启动前端应用
cd client
PORT=3001 npm start
# 前端运行在 http://localhost:3001
```

**方式二：使用默认端口**

```bash
# 后端（默认 5001）
cd server && npm start

# 前端（默认 3000，如果被占用会提示选择其他端口）
cd client && npm start
```

### 访问应用

- 🌐 **前端界面**: http://localhost:3001
- 🔌 **后端 API**: http://localhost:5001
- 📚 **API 文档**: 见下方 [API 文档](#-api-文档)

## 📡 API 文档

### 基础信息

- **Base URL**: `http://localhost:5001`
- **数据格式**: JSON
- **响应格式**: `{ success: boolean, data: any, message?: string }`

### 端点列表

| 方法 | 端点 | 描述 | 请求体 |
|------|------|------|--------|
| GET | `/` | 欢迎信息 | - |
| GET | `/api/users` | 获取所有用户 | - |
| GET | `/api/users/:id` | 获取单个用户 | - |
| POST | `/api/users` | 创建新用户 | `{ name, age, email }` |
| PUT | `/api/users/:id` | 更新用户 | `{ name?, age?, email? }` |
| DELETE | `/api/users/:id` | 删除用户 | - |

### 示例请求

```bash
# 获取所有用户
curl http://localhost:5001/api/users

# 创建新用户
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","age":28,"email":"zhangsan@example.com"}'

# 更新用户
curl -X PUT http://localhost:5001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age":29}'

# 删除用户
curl -X DELETE http://localhost:5001/api/users/1
```

## 🧪 测试

### 运行 API 测试

```bash
# 确保后端服务器正在运行
chmod +x test-api.sh
./test-api.sh
```

测试脚本会执行以下操作：
1. ✅ 获取欢迎信息
2. ✅ 获取所有用户
3. ✅ 创建新用户
4. ✅ 获取单个用户
5. ✅ 更新用户信息
6. ✅ 删除用户
7. ✅ 验证最终状态

## 📖 使用指南

### 前端操作

1. **添加用户**
   - 在表单中输入姓名、年龄、邮箱
   - 点击"添加用户"按钮
   - 查看成功提示和表格更新

2. **删除用户**
   - 在表格中找到要删除的用户
   - 点击"删除"按钮
   - 确认删除成功提示

3. **查看用户状态**
   - 绿色标签表示"活跃"
   - 红色标签表示"未激活"

### 后端开发

查看 `server/index.js` 了解：
- Express 路由配置
- CRUD 操作实现
- 数据模型结构

## 🔧 配置说明

### 端口配置

**前端端口** (默认 3001):
```bash
PORT=3001 npm start
```

**后端端口** (在 `server/index.js` 中修改):
```javascript
const PORT = 5001;
```

### 环境变量

创建 `.env` 文件（可选）:
```env
# 后端
PORT=5001
NODE_ENV=development

# 前端
REACT_APP_API_URL=http://localhost:5001
```

## 📚 更多文档

- 📘 [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) - 详细的项目指南和架构说明
- 🚀 [QUICK_START.md](./QUICK_START.md) - 快速开始和常见问题
- ✅ [GIT_CHECKLIST.md](./GIT_CHECKLIST.md) - Git 配置和提交检查清单

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License

## 👨‍💻 作者

Created by [sjtubzhu-debug](https://github.com/sjtubzhu-debug)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

Made with ❤️ using React + Ant Design + Node.js

</div>

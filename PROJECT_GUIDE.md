# Node.js + React + Ant Design 示例项目

这是一个简单的全栈应用示例，使用 Node.js 作为后端，React + Ant Design 作为前端。

## 项目结构

```
node_sample/
├── client/          # React 前端应用
│   ├── src/
│   │   ├── App.js   # 主应用组件
│   │   └── App.css  # 样式文件
│   └── package.json
├── server/          # Node.js 后端服务
│   ├── index.js     # Express 服务器
│   └── package.json
└── README.md
```

## 功能特性

### 前端 (React + Ant Design)
- ✅ 响应式布局（侧边栏可折叠）
- ✅ 用户管理界面
- ✅ 表单验证
- ✅ 数据表格展示
- ✅ 添加/删除用户功能
- ✅ 消息提示反馈
- ✅ 美观的 UI 组件

### 后端 (Node.js + Express)
- ✅ RESTful API
- ✅ CORS 支持
- ✅ 用户 CRUD 操作
- ✅ JSON 数据格式

## 已启动的服务

### 前端服务
- **URL**: http://localhost:3001
- **状态**: ✅ 运行中
- **技术栈**: React 18 + Ant Design 5

### 后端服务
- **URL**: http://localhost:5001
- **状态**: ✅ 运行中
- **技术栈**: Node.js + Express

## API 端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/` | 欢迎信息 |
| GET | `/api/users` | 获取所有用户 |
| GET | `/api/users/:id` | 获取单个用户 |
| POST | `/api/users` | 创建新用户 |
| PUT | `/api/users/:id` | 更新用户 |
| DELETE | `/api/users/:id` | 删除用户 |

## 测试 API

```bash
# 获取所有用户
curl http://localhost:5001/api/users

# 创建新用户
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","age":30,"email":"test@example.com"}'

# 删除用户
curl -X DELETE http://localhost:5001/api/users/1
```

## 如何启动（如果需要重新启动）

### 启动后端服务器
```bash
cd server
npm install  # 首次运行需要安装依赖
npm start
```

### 启动前端应用
```bash
cd client
npm install  # 首次运行需要安装依赖
PORT=3001 npm start
```

## 前端功能演示

1. **侧边栏导航**: 点击左侧菜单可以切换不同页面（当前为演示版本）
2. **添加用户**: 在表单中输入姓名、年龄和邮箱，点击"添加用户"按钮
3. **删除用户**: 点击表格中的"删除"按钮可以删除对应用户
4. **表单验证**: 所有字段都有验证，邮箱格式会自动检查
5. **消息提示**: 操作成功或失败都会有友好的提示信息

## 技术栈

- **前端**: React 18, Ant Design 5, React Hooks
- **后端**: Node.js, Express 4
- **开发工具**: Create React App, npm

## 下一步建议

1. 连接前端和后端（使用 axios 或 fetch）
2. 添加数据持久化（MongoDB, PostgreSQL 等）
3. 添加用户认证功能
4. 添加更多页面和功能
5. 编写单元测试和集成测试

## 注意事项

- 当前后端使用内存存储数据，重启后数据会丢失
- 生产环境需要添加适当的错误处理和安全措施
- 建议添加环境变量配置文件


const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库
let users = [
  { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', age: 32, email: 'lisi@example.com', status: 'active' },
  { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', status: 'inactive' },
];

// 路由
app.get('/', (req, res) => {
  res.json({ message: '欢迎使用 Node.js + React API 服务器' });
});

// 获取所有用户
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, message: '用户未找到' });
  }
});

// 创建用户
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    status: 'active'
  };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json({ success: true, data: users[index] });
  } else {
    res.status(404).json({ success: false, message: '用户未找到' });
  }
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json({ success: true, data: deletedUser[0] });
  } else {
    res.status(404).json({ success: false, message: '用户未找到' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});


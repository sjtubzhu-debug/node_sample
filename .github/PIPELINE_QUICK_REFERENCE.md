# GitHub Actions Pipeline 快速参考

## 🎯 工作流触发条件

| 工作流 | 触发事件 | 分支 |
|--------|----------|------|
| **CI/CD Pipeline** | Push, Pull Request | main, develop |
| **Deploy** | Push, Tag, Manual | main |
| **Code Review** | Pull Request | main, develop |

## 📊 查看 Pipeline 状态

### 方法 1: GitHub 网页
1. 访问 https://github.com/sjtubzhu-debug/node_sample
2. 点击 **Actions** 标签
3. 查看所有工作流运行历史

### 方法 2: 徽章状态
在 README.md 顶部查看实时状态徽章：
- 🟢 绿色 = 通过
- 🔴 红色 = 失败
- 🟡 黄色 = 运行中

## 🚀 手动触发部署

```bash
# 方法 1: 通过 GitHub 网页
1. 进入 Actions 标签
2. 选择 "Deploy to Production"
3. 点击 "Run workflow"
4. 选择分支并确认

# 方法 2: 通过 Git Tag
git tag v1.0.0
git push origin v1.0.0
```

## 📦 下载构建产物

1. 进入 Actions → 选择成功的工作流运行
2. 滚动到底部 **Artifacts** 部分
3. 下载需要的构建产物：
   - `frontend-build-18.x` - Node.js 18 构建
   - `frontend-build-20.x` - Node.js 20 构建
   - `deployment-package` - 完整部署包

## 🔍 Pipeline 执行流程

### CI/CD Pipeline
```
推送代码
  ↓
并行执行：
  ├─ Frontend CI (Node 18.x, 20.x)
  │   ├─ 安装依赖
  │   ├─ Lint 检查
  │   ├─ 运行测试
  │   └─ 构建
  │
  ├─ Backend CI (Node 18.x, 20.x)
  │   ├─ 安装依赖
  │   ├─ Lint 检查
  │   └─ 健康检查
  │
  └─ Code Quality
      ├─ 大文件检查
      └─ TODO 扫描
  ↓
API Integration Test
  ├─ 启动服务器
  └─ 运行测试脚本
  ↓
Build Summary
  └─ 汇总结果
```

## ⚡ 常用命令

### 本地模拟 CI 环境

```bash
# 前端测试
cd client
npm ci
npm test -- --coverage --watchAll=false
npm run build

# 后端测试
cd server
npm ci
npm start &
sleep 5
curl http://localhost:5001/
```

### 检查工作流语法

```bash
# 安装 act (本地运行 GitHub Actions)
brew install act

# 列出所有工作流
act -l

# 本地运行 CI
act push
```

## 🐛 故障排查

### Pipeline 失败怎么办？

1. **查看日志**
   - 点击失败的工作流
   - 展开失败的步骤
   - 查看详细错误信息

2. **常见问题**
   
   | 错误 | 原因 | 解决方案 |
   |------|------|----------|
   | `npm ci` 失败 | package-lock.json 不存在 | 提交 lock 文件或使用 `npm install` |
   | 测试失败 | 代码问题 | 本地运行测试并修复 |
   | 构建失败 | 依赖问题 | 检查 package.json |
   | 健康检查失败 | 端口占用 | 修改端口配置 |

3. **重新运行**
   - 点击 "Re-run jobs"
   - 选择 "Re-run failed jobs" 或 "Re-run all jobs"

## 📈 优化建议

### 加速构建

1. **使用缓存**（已配置）
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

2. **并行执行**（已配置）
   - Frontend 和 Backend 并行运行
   - 多个 Node.js 版本并行测试

3. **跳过不必要的步骤**
   ```bash
   # 提交信息包含 [skip ci] 会跳过 CI
   git commit -m "docs: update README [skip ci]"
   ```

## 🔐 Secrets 配置

如需添加敏感信息（API 密钥、部署令牌等）：

1. 进入仓库 **Settings**
2. 选择 **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加密钥（如 `DEPLOY_TOKEN`）

在工作流中使用：
```yaml
env:
  TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

## 📊 监控和通知

### 添加 Slack 通知

```yaml
- name: Slack 通知
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 添加邮件通知

GitHub 默认会发送邮件通知：
- Settings → Notifications → Actions

## 🔗 有用的链接

- 📚 [GitHub Actions 文档](https://docs.github.com/en/actions)
- 🛠️ [Actions Marketplace](https://github.com/marketplace?type=actions)
- 📖 [工作流语法](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- 🎯 [本项目详细文档](../GITHUB_ACTIONS.md)

---

**快速访问：** https://github.com/sjtubzhu-debug/node_sample/actions


# GitHub Actions CI/CD 配置说明

## 📋 概述

本项目配置了三个 GitHub Actions 工作流，用于自动化测试、构建和部署。

## 🔄 工作流列表

### 1. CI/CD Pipeline (`ci.yml`)

**触发条件：**
- 推送到 `main` 或 `develop` 分支
- 创建针对 `main` 或 `develop` 的 Pull Request

**包含的任务：**

#### 📱 Frontend CI
- ✅ 在 Node.js 18.x 和 20.x 上测试
- ✅ 安装依赖（使用 `npm ci` 确保一致性）
- ✅ 运行 ESLint 代码检查
- ✅ 运行单元测试（带覆盖率）
- ✅ 构建生产版本
- ✅ 上传构建产物（保留 7 天）

#### 🔧 Backend CI
- ✅ 在 Node.js 18.x 和 20.x 上测试
- ✅ 安装依赖
- ✅ 运行 ESLint 代码检查
- ✅ 启动服务器并进行健康检查

#### 🧪 API Integration Test
- ✅ 启动后端服务器
- ✅ 运行 API 测试脚本
- ✅ 验证所有 API 端点

#### 📊 Code Quality Check
- ✅ 检查大文件（>5MB）
- ✅ 扫描 TODO 和 FIXME 注释

#### 📈 Build Summary
- ✅ 汇总所有任务的执行结果
- ✅ 显示整体构建状态

---

### 2. Deploy to Production (`deploy.yml`)

**触发条件：**
- 推送到 `main` 分支
- 创建版本标签（如 `v1.0.0`）
- 手动触发（workflow_dispatch）

**部署流程：**

1. ✅ 检出代码
2. ✅ 安装前端依赖并构建
3. ✅ 安装后端依赖（仅生产依赖）
4. ✅ 创建部署包（包含前端构建和后端代码）
5. ✅ 上传部署包（保留 30 天）
6. ✅ 发送部署通知

**可选功能：**
- 部署到 GitHub Pages（需取消注释）
- 部署到云服务器（可自定义添加）

---

### 3. Code Review (`code-review.yml`)

**触发条件：**
- 创建针对 `main` 或 `develop` 的 Pull Request

**检查项目：**

1. ✅ 提交信息格式检查
2. ✅ 文件变更列表
3. ✅ 代码行数统计
4. ✅ 检查遗留的 `console.log`
5. ✅ 检查调试代码（`debugger`）
6. ✅ PR 大小检查（文件数和行数）

---

## 🚀 如何使用

### 查看工作流状态

1. 访问你的 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看所有工作流的运行历史

### 手动触发部署

1. 进入 **Actions** 标签
2. 选择 **Deploy to Production** 工作流
3. 点击 **Run workflow** 按钮
4. 选择分支并确认

### 查看构建产物

1. 进入某次工作流运行详情
2. 滚动到底部的 **Artifacts** 部分
3. 下载构建产物

---

## 📊 工作流状态徽章

在 README.md 中添加状态徽章：

```markdown
![CI/CD](https://github.com/sjtubzhu-debug/node_sample/workflows/CI%2FCD%20Pipeline/badge.svg)
![Deploy](https://github.com/sjtubzhu-debug/node_sample/workflows/Deploy%20to%20Production/badge.svg)
```

效果：
![CI/CD](https://github.com/sjtubzhu-debug/node_sample/workflows/CI%2FCD%20Pipeline/badge.svg)

---

## 🔧 自定义配置

### 修改 Node.js 版本

编辑 `.github/workflows/ci.yml`：

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # 添加更多版本
```

### 添加环境变量

在工作流中添加：

```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com
```

### 添加 Secrets

1. 进入仓库 **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加密钥（如 `DEPLOY_TOKEN`）
4. 在工作流中使用：

```yaml
- name: 部署
  env:
    TOKEN: ${{ secrets.DEPLOY_TOKEN }}
  run: ./deploy.sh
```

---

## 📦 部署到不同平台

### GitHub Pages

取消 `deploy.yml` 中的注释：

```yaml
- name: 部署到 GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./client/build
```

### Vercel

添加新步骤：

```yaml
- name: 部署到 Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Docker

添加 Docker 构建和推送：

```yaml
- name: 构建 Docker 镜像
  run: docker build -t myapp:latest .

- name: 推送到 Docker Hub
  run: |
    echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
    docker push myapp:latest
```

---

## 🐛 故障排查

### 构建失败

1. 查看失败的步骤日志
2. 检查依赖是否正确安装
3. 确认 Node.js 版本兼容性

### 测试失败

1. 在本地运行相同的测试命令
2. 检查环境变量配置
3. 确认测试数据和模拟服务

### 部署失败

1. 检查 Secrets 配置是否正确
2. 验证部署目标的访问权限
3. 查看部署日志的详细错误信息

---

## 📈 最佳实践

1. ✅ **使用 `npm ci` 而不是 `npm install`**
   - 更快、更可靠
   - 基于 package-lock.json 安装

2. ✅ **缓存依赖**
   - 使用 `actions/setup-node` 的 cache 功能
   - 加速构建时间

3. ✅ **矩阵测试**
   - 在多个 Node.js 版本上测试
   - 确保兼容性

4. ✅ **分离任务**
   - 前端、后端、测试分开运行
   - 并行执行提高效率

5. ✅ **保留构建产物**
   - 方便调试和回滚
   - 设置合理的保留期限

---

## 🔗 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [工作流语法](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

---

## 📝 工作流文件位置

```
.github/
└── workflows/
    ├── ci.yml           # CI/CD 主流程
    ├── deploy.yml       # 部署流程
    └── code-review.yml  # 代码审查
```

---

**现在你的项目已经配置了完整的 CI/CD 流程！** 🎉

每次推送代码或创建 PR 时，GitHub Actions 会自动运行测试和检查。


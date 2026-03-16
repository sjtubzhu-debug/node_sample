#!/bin/bash

echo "======================================"
echo "测试 Node.js + React API"
echo "======================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试 1: 获取欢迎信息
echo -e "${BLUE}测试 1: 获取欢迎信息${NC}"
echo "GET http://localhost:5001/"
response=$(curl -s http://localhost:5001/)
echo "响应: $response"
echo ""

# 测试 2: 获取所有用户
echo -e "${BLUE}测试 2: 获取所有用户${NC}"
echo "GET http://localhost:5001/api/users"
response=$(curl -s http://localhost:5001/api/users)
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 3: 创建新用户
echo -e "${BLUE}测试 3: 创建新用户${NC}"
echo "POST http://localhost:5001/api/users"
response=$(curl -s -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","age":30,"email":"test@example.com"}')
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 4: 获取单个用户
echo -e "${BLUE}测试 4: 获取单个用户 (ID: 1)${NC}"
echo "GET http://localhost:5001/api/users/1"
response=$(curl -s http://localhost:5001/api/users/1)
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 5: 更新用户
echo -e "${BLUE}测试 5: 更新用户 (ID: 1)${NC}"
echo "PUT http://localhost:5001/api/users/1"
response=$(curl -s -X PUT http://localhost:5001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"张三（已更新）","age":29}')
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 6: 再次获取所有用户（查看更新后的数据）
echo -e "${BLUE}测试 6: 再次获取所有用户（查看更新）${NC}"
echo "GET http://localhost:5001/api/users"
response=$(curl -s http://localhost:5001/api/users)
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 7: 删除用户
echo -e "${BLUE}测试 7: 删除用户 (ID: 3)${NC}"
echo "DELETE http://localhost:5001/api/users/3"
response=$(curl -s -X DELETE http://localhost:5001/api/users/3)
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 测试 8: 最终用户列表
echo -e "${BLUE}测试 8: 最终用户列表${NC}"
echo "GET http://localhost:5001/api/users"
response=$(curl -s http://localhost:5001/api/users)
echo "响应: $response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

echo -e "${GREEN}======================================"
echo "所有测试完成！"
echo "======================================${NC}"


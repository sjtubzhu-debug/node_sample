import React, { useState } from 'react';
import { Layout, Menu, Card, Button, Form, Input, Table, Space, message, Tag } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState([
    { key: '1', name: '张三', age: 28, email: 'zhangsan@example.com', status: 'active' },
    { key: '2', name: '李四', age: 32, email: 'lisi@example.com', status: 'active' },
    { key: '3', name: '王五', age: 25, email: 'wangwu@example.com', status: 'inactive' },
  ]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '活跃' : '未激活'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            <DeleteOutlined /> 删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    setUsers(users.filter(user => user.key !== key));
    message.success('删除成功！');
  };

  const onFinish = (values) => {
    const newUser = {
      key: String(users.length + 1),
      name: values.name,
      age: values.age,
      email: values.email,
      status: 'active',
    };
    setUsers([...users, newUser]);
    message.success('添加用户成功！');
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            设置
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff', paddingLeft: 24, fontSize: 20, fontWeight: 'bold' }}>
          React + Ant Design 示例应用
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Card title="添加新用户" style={{ marginBottom: 24 }} extra={<PlusOutlined />}>
              <Form
                form={form}
                name="userForm"
                onFinish={onFinish}
                layout="inline"
                style={{ marginBottom: 16 }}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: '请输入姓名！' }]}
                >
                  <Input placeholder="姓名" />
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[{ required: true, message: '请输入年龄！' }]}
                >
                  <Input type="number" placeholder="年龄" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱！' },
                    { type: 'email', message: '请输入有效的邮箱地址！' }
                  ]}
                >
                  <Input placeholder="邮箱" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    添加用户
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card title="用户列表" extra={<Tag color="blue">共 {users.length} 人</Tag>}>
              <Table columns={columns} dataSource={users} pagination={{ pageSize: 5 }} />
            </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          React + Ant Design ©2026 Created by Node Sample
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;

import React from 'react';
import { login } from '../../../services/APIService';
import './Login.css';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification } from 'antd';
import LocalStorageService from '../../../services/LocalStorageService';
import { ACCESS_TOKEN_FIELD_FROM_BACKEND } from '../../../config/constants';

function Login() {
    const onFinish = values => {
        console.log('Received values of form: ', values);
        const payload = {
            username: values.username,
            password: values.password,
        }

        login(payload)
            .then(result => {
                notification.success({
                    message: "Login successful.",
                })
                LocalStorageService.setToken(result.data[ACCESS_TOKEN_FIELD_FROM_BACKEND]);
                LocalStorageService.setRole(result.data.roles)
            }).catch(error => {
                console.log(error)
                notification.error({
                    message: "Login failed.",
                    description: error?.response?.data?.error || "Something went wrong."
                })
            })
    };

    return (
        <div className="signup-container">
            <h1>Login</h1>
            <div className="signup-content">
                <Form
                    name="login"
                    className="login-container"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link href="/signup">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
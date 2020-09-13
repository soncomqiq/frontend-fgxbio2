import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../../services/APIService';
import './Signup.css';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Button,
  notification
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Signup(props) {
  const [form] = Form.useForm();

  const onFinish = async values => {
    console.log('Received values of form:', values);
    const signupRequest = {
      name: values.name,
      email: values.email,
      username: values.username,
      password: values.password,
      role: ["lab_user", "user"]
    };
    fetchSignup(signupRequest);
  };

  async function fetchSignup(signupRequest) {
    try {
      await signup(signupRequest);
      notification.success({
        message: 'Signup completed',
        description: "Thank you! You're successfully registered. Please Login to continue!",
      });
      props.history.push("/login");
    }
    catch (error) {
      notification.error({
        message: 'Forenseq App',
        description: error.response?.data?.error || 'Sorry! Something went wrong. Please try again!'
      });
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <div className="signup-content">
        <Form
          {...formItemLayout}
          form={form}
          name="signup"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="fullname"
            label={
              <span>
                Full name&nbsp;
            <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input your full name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
        </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
import React from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../css/login.css'
import { authorType, User } from '../global';
import { AnyAction } from 'redux';

interface props {
    user: User
    dispatch: (arg: AnyAction) => void
}

const Login = (props: props) => {

    const onFinish = (values: string) => {

        interface temp {
            username: string
            password: string
        }
        let json = values as unknown as temp

        let action = {
            type: 'newUser',
            user: new User(json.username, json.password)
        }

        props.dispatch(action)

        if (action.user.token === 'guess') {
            alert("账号或密码错误，请重新输入！")
            window.location.reload()
        } else if (action.user.author === authorType.admin) {

            window.location.href = 'http://' + window.location.host + '/admin'
        } else if (action.user.author === authorType.students) {

            window.location.href = 'http://' + window.location.host + '/profile'
        } else {
            alert("账号或密码错误，请重新输入！")
            window.location.reload()
        }
    };



    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <h1>Login</h1>
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
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
        </a>

            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
        </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    );
};

export default Login

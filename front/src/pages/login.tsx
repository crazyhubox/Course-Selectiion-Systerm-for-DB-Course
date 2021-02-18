import React from 'react';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../css/login.scss'
import { authorType, User } from '../global';
import { AnyAction } from 'redux';

interface props {
    user: User
    dispatch: (arg: AnyAction) => void
}

const Login = (props: props) => {

    //  输入结束，点击登录
    const onFinish = (values: string) => {


        // 解释传入参数
        interface temp {
            username: string
            password: string
        }
        let json = values as unknown as temp


        // 创建 action ，传出更新数据
        let action = {
            type: 'newUser',
            user: new User(json.username, json.password)
        }

        console.log("login:", action, props);

        props.dispatch(action)


        // 页面跳转
        if (action.user.author === authorType.admin) {

            //  history 没有传入，目前还不知道是否有更加适当的方法
            //  用来完成页面跳转
            let link = document.getElementById('to/admin')
            console.log("logn link：", link);
            if (link !== null) {
                link.click()
            }

        } else if (action.user.author === authorType.students) {

            let link = document.getElementById('to/profile')
            console.log("logn link：", link);
            if (link !== null) {
                link.click()
            }
        } else {
            message.error("账号或密码错误，请重新输入！")
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

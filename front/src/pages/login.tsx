import React from 'react';
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>

            <h1>登录界面</h1>
            <ul>
                <li><Link to="/login">登录</Link></li>
                <li><Link to="/admin">管理员</Link></li>
            </ul>
        </div>
    );
}



export default Login

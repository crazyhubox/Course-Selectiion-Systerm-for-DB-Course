import React from 'react';
import { Layout } from 'antd'

import '../css/profile.css'


const { Header, Footer, Sider, Content } = Layout;


function Profile() {
    return (
        <Layout>
            {/* 用户信息 */}
            <Sider>
                <h2>学生信息</h2>

            </Sider>

            {/* 选课窗口 */}
            <Content>

                <Layout>
                    {/* 待选课程窗口 */}
                    <Content>选课窗口

                    </Content>


                    {/* 已选课程窗口 */}
                    <Content>已选课程窗口

                    </Content>
                </Layout>

            </Content>


            {/* 已选课程窗口 */}


            {/* 成绩表 */}
            <Sider>成绩表

            </Sider>
        </Layout>
    );
}

export default Profile
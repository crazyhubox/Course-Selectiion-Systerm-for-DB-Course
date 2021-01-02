import React from 'react';
import { Layout } from 'antd'

import '../css/profile.css'
import { Course, Student } from '../global';
import { connect } from 'react-redux';


const { Sider, Content } = Layout;



// 页面 props
interface props {
    student: Student,
    courseFinish: Course[],
    courseUnfinish: Course[],
}


// 页面 组件
function Profile(props: props) {

    return (
        <Layout>
            {/* 用户信息 */}
            <Sider>
                <h2>学生信息</h2>
                <STDInfoContainer>
                </STDInfoContainer>
            </Sider>

            {/* 选课窗口 */}
            <Content>

                <Layout>
                    {/* 待选课程窗口 */}
                    <Content>选课窗口
                        <CourseUnfinishContainer></CourseUnfinishContainer>
                    </Content>


                    {/* 已选课程窗口 */}
                    <Content>已选课程窗口
                        <CourseFinishContainer></CourseFinishContainer>
                    </Content>
                </Layout>

            </Content>


            {/* 已选课程窗口 */}


            {/* 成绩表 */}
            <Sider >
                <h2>成绩表</h2>

            </Sider>
        </Layout>
    );
}


// 定义 Props 接口
interface StudentProps {
    student: Student
}

interface CourseProps {
    courses: Course[]
}



// 定义插件

function STDInfo(props: StudentProps) {
    console.log("StudentProps:", props);

    return (<div></div>)
}

function CourseList(props: CourseProps) {
    console.log("CourseProps:", props);
    return (<div></div>)

}



// 定义容器
let STDInfoContainer = connect(
    (state: any) => ({ student: state.student })
)(STDInfo)


let CourseFinishContainer = connect(
    (state: any) => ({ courses: state.courseFinish })
)(CourseList)

let CourseUnfinishContainer = connect(
    (state: any) => ({ courses: state.courseUnfinish })
)(CourseList)




export default Profile
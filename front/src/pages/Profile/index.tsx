import React, { } from 'react';
import { Layout } from 'antd'

import '../../css/profile.css'
import STDInfoContainer from './studentInfo';
import CourseFinishContainer from './gradeTable';
import CourseList from './courseList';
import { connect } from 'react-redux';
import { Course, Student } from '../../global';


const { Sider, Content } = Layout;

// 定义容器
let CourseUnFinishContainer = connect(
    (state: any) => ({ courses: state.courseUnfinish })
)(CourseList)


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
            <Sider >
                <STDInfoContainer>
                </STDInfoContainer>
            </Sider>

            {/* 选课窗口 */}
            <Content>

                {/* 选课窗口 */}
                <div className='CourseMainBox'>
                    <CourseUnFinishContainer></CourseUnFinishContainer>
                </div>
            </Content>

            {/* 成绩表 */}
            <Sider width='300'>
                <CourseFinishContainer></CourseFinishContainer>
            </Sider>
        </Layout >
    );
}



export default Profile
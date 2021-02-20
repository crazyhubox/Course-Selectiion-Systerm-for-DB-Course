import React, { } from 'react';
import { Layout, Affix } from 'antd'

import '../../css/profile.scss'
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
        <div className="Profile">
            <div className='InnerBox'>
                <Layout>
                    {/* 用户信息 */}
                    <Sider >
                        <div className='InnerBox'>

                            <Affix offsetTop={10} >
                                <STDInfoContainer>
                                </STDInfoContainer>
                            </Affix>
                        </div>
                    </Sider>

                    {/* 选课窗口 */}
                    <Content>

                        {/* 选课窗口 */}
                        <div className='InnerBox'>
                            <CourseUnFinishContainer></CourseUnFinishContainer>
                        </div>
                    </Content>

                    {/* 成绩表 */}
                    <Sider width='300'>
                        <div className='InnerBox'>
                            <CourseFinishContainer></CourseFinishContainer>
                        </div>
                    </Sider>
                </Layout >
            </div>

        </div>

    );
}

// 链接 reducer 
let ProfileContainer = connect(
    (state: any) => ({
        student: state.student,
        courseFinish: state.courseFinish,
        courseUnfinish: state.courseUnfinish,
    })
)(Profile)

export default ProfileContainer
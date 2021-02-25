import { connect } from "react-redux";
import { AnyAction } from "redux";
import { CourseWithEditflag, myClone, StudentWithEditflag } from "../../../global";
import { Button, Input, Table, Tabs } from 'antd';
import React, { useState } from "react";
import EffectDispatch from "../../../reducer/effect";


const { TabPane } = Tabs;

interface props {
    studentsList: StudentWithEditflag[],
    coursesList: CourseWithEditflag[],
    dispatch: (arg: AnyAction) => void
}

function Maintain(props: props) {

    // useState

    const [currentStudents, setStudents] = useState(props.studentsList === undefined ? [] : props.studentsList)
    const [currentCourses, setCourses] = useState(props.coursesList === undefined ? [] : props.coursesList)
    const [tabSelected, setTabSelected] = useState('1')


    console.log("debug", "maitain", currentStudents, currentCourses);



    // Data Process
    const studentsColumns = [
        {
            title: '学号',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: '姓名',
            dataIndex: 'sname',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '院系',
            dataIndex: 'sdept',
        },
        {
            title: '登陆名',
            dataIndex: 'logn',
        }
    ]

    const dataSource_StudentsTable = currentStudents.map(item => {
        return {
            sno: (
                <Input

                    value={item.student.sno}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.sno = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),
            sname: (
                <Input

                    value={item.student.sname}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.sname = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),
            logn: (
                <Input

                    value={item.student.logn}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.logn = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),
            sex: (
                <Input

                    value={item.student.sex}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.sex = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),
            age: (
                <Input

                    value={item.student.age}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.age = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),
            sdept: (
                <Input

                    value={item.student.sdept}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: StudentWithEditflag[] = myClone(currentStudents)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.student.sno === item.student.sno) {
                                    stuItem.edited = true
                                    stuItem.student.sdept = event.target.value
                                }
                            })
                            setStudents(temp)
                        }
                    }
                />
            ),

        }
    })


    const coursesColumns = [
        {
            title: '课程号',
            dataIndex: 'cno',
            key: 'cno',
        },
        {
            title: '课程名',
            dataIndex: 'cname',
        },
        {
            title: '学分',
            dataIndex: 'credit',
        },
        {
            title: '开设院系',
            dataIndex: 'cdept',
        },
        {
            title: '任课教师',
            dataIndex: 'tname',
        }

    ]

    const dataSource_CoursesTable = currentCourses.map(item => {
        return {
            cno: (
                <Input

                    value={item.course.cno}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: CourseWithEditflag[] = myClone(currentCourses)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.course.cno === item.course.cno) {
                                    stuItem.edited = true
                                    stuItem.course.cno = event.target.value
                                }
                            })
                            setCourses(temp)
                        }
                    }
                />
            ),
            cname: (
                <Input

                    value={item.course.cname}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: CourseWithEditflag[] = myClone(currentCourses)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.course.cno === item.course.cno) {
                                    stuItem.edited = true
                                    stuItem.course.cname = event.target.value
                                }
                            })
                            setCourses(temp)
                        }
                    }
                />
            ),
            credit: (
                <Input

                    value={item.course.credit}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: CourseWithEditflag[] = myClone(currentCourses)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.course.cno === item.course.cno) {
                                    stuItem.edited = true
                                    let num = Number(event.target.value)
                                    if (!isNaN(num)) {
                                        stuItem.course.credit = num
                                    }
                                }
                            })
                            setCourses(temp)
                        }
                    }
                />
            ),
            cdept: (
                <Input

                    value={item.course.cdept}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: CourseWithEditflag[] = myClone(currentCourses)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.course.cno === item.course.cno) {
                                    stuItem.edited = true
                                    stuItem.course.cdept = event.target.value
                                }
                            })
                            setCourses(temp)
                        }
                    }
                />
            ),
            tname: (
                <Input

                    value={item.course.tname}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            // 修改curentStudent 的数据
                            let temp: CourseWithEditflag[] = myClone(currentCourses)
                            // tempStudent
                            temp.forEach((stuItem) => {
                                if (stuItem.course.cno === item.course.cno) {
                                    stuItem.edited = true
                                    stuItem.course.tname = event.target.value
                                }
                            })
                            setCourses(temp)
                        }
                    }
                />
            )

        }
    })


    // event Handler
    function handleTabSelect(key: string) {
        setTabSelected(key)
    }

    function handleSaveButtonClick() {
        let action: AnyAction = { type: '' }
        if (tabSelected === '1') {
            action.type = 'fixStudent'
            action.StudentsList = currentStudents
        } else {
            action.type = 'fixCourse'
            action.CoursesList = currentCourses
        }

        // props.dispatch(action)
        EffectDispatch(action)
    }


    return (
        <div className="Maintain">
            <h1>信息维护</h1>
            {/* 保存按钮 */}
            <Button
                onClick={handleSaveButtonClick} >
                保存
            </Button>
            {/* 标签 */}
            <Tabs defaultActiveKey="1" onChange={handleTabSelect}>
                <TabPane tab="学生信息" key="1">
                    <Table dataSource={dataSource_StudentsTable}
                        columns={studentsColumns}>
                    </Table>
                </TabPane>
                <TabPane tab="课程信息" key="2">
                    <Table dataSource={dataSource_CoursesTable}
                        columns={coursesColumns}>
                    </Table>
                </TabPane>
            </Tabs>
        </div>
    )
}

// connect to redux
let MaintainContainer = connect(
    (state: any) => {
        return ({
            studentsList: state.studentsList,
            coursesList: state.coursesList,
        })
    }
)(Maintain)

export default MaintainContainer
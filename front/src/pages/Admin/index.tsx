import React, { useState } from 'react';
import { CourseWithStudents, myClone } from '../../global';
import { Select, Card, Table, Button, Input } from 'antd'
import { SelectValue } from 'antd/lib/select';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';




const { Option } = Select

interface props {
    courseInfo: CourseWithStudents[],
    dispatch: (arg: AnyAction) => void
}


function Admin(props: props) {

    console.log(props);


    // useState
    const [currentCourse, setCurrentCourse] = useState<CourseWithStudents>(props.courseInfo[0])
    const [editFlag, setEditFlag] = useState(false)
    const [editButtonText, setEditButtonText] = useState("录入成绩")




    // data process
    const dataSource_StudentsTable = currentCourse.students.map((item) => (
        {
            sno: item.sno,
            sname: item.sname,

            // 为每个单元格准备 key
            key2: (item.sno + "-2"),
            key3: (item.sno + "-3"),

            // 可修改的 grade 单元格
            grade: (
                <Input
                    style={{
                        width: 200
                    }}
                    disabled={!editFlag}
                    value={item.grade}
                    maxLength={2}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {

                            // 修改curentCourse的数据
                            let tempCurse: CourseWithStudents = myClone(currentCourse)
                            // tempCurse
                            tempCurse.students.forEach((stuItem) => {
                                if (stuItem.sno === item.sno) {
                                    let num = Number(event.target.value)
                                    if (!isNaN(num)) {
                                        stuItem.grade = num
                                    }
                                }
                            })
                            setCurrentCourse(tempCurse)
                        }
                    }
                />
            )
        }
    ))


    console.log("dataSource_StudentsTable", dataSource_StudentsTable);


    const columns = [
        {
            title: '学号',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: '姓名',
            dataIndex: 'sname',
            key: 'key2'
        },
        {
            title: '成绩',
            dataIndex: 'grade',
            key: 'key3'

        }
    ]



    // evnt handler
    function handleCourseSelectorOnChange(value: SelectValue) {
        props.courseInfo.forEach((item) => {
            if (item.course.cname === value) (
                setCurrentCourse(item)
            )
        })
    }

    function handleEditButtonOnClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {

        if (editFlag) {
            setEditFlag(false)
            setEditButtonText("录入成绩")
            // 将 State 同步到 props
            const action = {
                type: 'fixGrade',
                courseEdited: currentCourse
            }
            props.dispatch(action)
        } else {
            setEditFlag(true)
            setEditButtonText("完成录入")
        }
    }

    function handleMaintainButtonClick() {
        let link = document.getElementById('to/admin/maintain')
        link?.click()
    }

    function handleGraphButtonClick() {
        let link = document.getElementById('to/admin/graph')
        link?.click()
    }




    return (
        <div>
            <h1>管理员页面</h1>
            {/* 课程选择按钮 */}
            <Select
                placeholder="请选择课程"
                style={{ width: 200 }}
                onChange={handleCourseSelectorOnChange}
            >
                {props.courseInfo.map((courseWithStudent) => (
                    <Option
                        key={courseWithStudent.course.cname}
                        value={courseWithStudent.course.cname}>
                        {courseWithStudent.course.cname}
                    </Option>
                ))}
            </Select>
            {/* 成绩分布 */}
            {/* 成绩修改（锁）信息维护按钮 成绩分布按钮 */}
            <span>
                <Button
                    onClick={handleEditButtonOnClick} >
                    {editButtonText}
                </Button>
                <Button disabled={editFlag}
                    onClick={handleMaintainButtonClick} >
                    信息维护
                </Button>
                <Button disabled={editFlag}
                    onClick={handleGraphButtonClick}>
                    成绩分布
                </Button>
            </span>


            {/* 课程信息 */}
            <div id="CourseBasicInfo">
                <Card title="课程信息">
                    <Card.Grid style={{
                        width: '50%',
                        textAlign: 'center'
                    }}
                        hoverable={false}>
                        <span>课程名称: </span>
                        <span>{currentCourse.course.cname}</span>
                    </Card.Grid>
                    <Card.Grid style={{
                        width: '50%',
                        textAlign: 'center'
                    }}
                        hoverable={false}>
                        <span>任课老师: </span>
                        <span>{currentCourse.course.tname}</span>
                    </Card.Grid>
                </Card>
            </div>

            {/* 学生 成绩 列表 */}
            <Table dataSource={dataSource_StudentsTable}
                columns={columns}>
            </Table>

        </div>
    );
}


// connect to redux
let AdminContainer = connect(
    (state: any) => {
        return ({
            courseInfo: state.courseInfo,
        })
    }
)(Admin)



export default AdminContainer 

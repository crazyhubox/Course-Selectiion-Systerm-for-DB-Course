import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { Course, Student } from "../../../global";


interface CourseProps {
    courses: Course[]
    student: Student
    dispatch: (arg: AnyAction) => void
}

function GradeTable(props: CourseProps) {

    let avg = (arg: Course[]) => {

        let sum = 0
        arg.forEach((item) => {
            sum += item.grade
        })
        return sum / arg.length
    }

    const columns: ColumnsType<Course> = [
        {
            title: '课号',
            dataIndex: 'cno',
        },
        {
            title: '  课名  ',
            dataIndex: 'cname',
        },
        {
            title: '成绩',
            dataIndex: 'grade',
        },
        {
            title: '学分',
            dataIndex: 'credit',
        },
        {
            title: '任课老师',
            dataIndex: 'tname',
        }
    ];
    return (
        <div>
            <h1>{props.student.sno} {props.student.sname} 学生成绩表</h1>
            <Table<Course> size='middle' columns={columns}
                rowKey={record => record.cno}
                dataSource={props.courses}
            />
            <h2>平均成绩 ：{avg(props.courses)}</h2>
        </div>
    )
}

let CourseFinishContainer = connect(
    (state: any) => ({
        student: state.student,
        courses: state.courseFinish
    })
)(GradeTable)


export default CourseFinishContainer
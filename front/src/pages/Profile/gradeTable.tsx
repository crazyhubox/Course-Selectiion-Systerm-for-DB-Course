import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { Course } from "../../global";

interface CourseProps {
    courses: Course[]
    dispatch: (arg: AnyAction) => void
}

function GradeTable(props: CourseProps) {


    // event handler
    function mainOnClick() {
        let link = document.getElementById('to/profile/gradedetail')
        link?.click()
    }

    const columns: ColumnsType<Course> = [
        {
            title: '课号',
            dataIndex: 'cno',
        },
        {
            title: '  课 名  ',
            dataIndex: 'cname',
        },
        {
            title: '成绩',
            dataIndex: 'grade',
        }
    ];
    return (
        <div onClick={mainOnClick} >
            <h3>成绩表</h3>
            <Table<Course> size='middle' columns={columns}
                rowKey={record => record.cno}
                dataSource={props.courses}
            />
        </div>
    )
}

let CourseFinishContainer = connect(
    (state: any) => ({ courses: state.courseFinish })
)(GradeTable)


export default CourseFinishContainer
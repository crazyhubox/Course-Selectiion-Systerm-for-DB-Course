import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Student } from "../../global";


interface StudentProps {
    student: Student
}


function STDInfo(props: StudentProps) {
    console.log("StudentProps:", props);
    const { Meta } = Card

    const student = props.student
    return (<div>
        <Card title="学生信息"  >

            <Meta
                avatar={
                    <Avatar icon={<UserOutlined />} />
                }
                title={student.sname}
                description={student.sno}
            />
            <div>
                <p>性别：{student.sex}</p>
                <p>年龄： {student.age}</p>
                <p>院系：{student.sdept}</p>
            </div>
        </Card>
    </div>)
}


const STDInfoContainer = connect(
    (state: any) => ({ student: state.student })
)(STDInfo)


export default STDInfoContainer


import React from 'react';
import { connect } from "react-redux"
import { AnyAction } from "redux"
import ReactEcharts from "echarts-for-react";
import { CourseWithStudents } from '../../../global';


let avg = (arg: CourseWithStudents) => {

    let sum = 0
    arg.students.forEach((item) => {
        sum += item.grade
    })
    return sum / arg.students.length
}





interface props {
    courseInfo: CourseWithStudents[],
    dispatch: (arg: AnyAction) => void
}

function Graph(props: props) {

    let option = {
        title: {
            text: '各课程平均成绩'
        },
        tooltip: {},
        legend: {
            data: ['平均分']
        },
        xAxis: {
            data: props.courseInfo.map(item => item.course.cname)
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: props.courseInfo.map(item => avg(item))
        }]
    };


    return (
        <div >
            <ReactEcharts
                option={option}
            ></ReactEcharts>
        </div>
    )
}


// connect to redux
let Container = connect(
    (state: any) => {
        return ({
            courseInfo: state.courseInfo,
        })
    }
)(Graph)

export default Container
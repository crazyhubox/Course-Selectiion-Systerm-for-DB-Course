import { User, Student, Course, CourseWithStudents } from './global'


// ! 学生页面相关数据

// *学生信息 S表
// 
let STDInfo = {
    sno: '2481', sname: 'lin', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}
let student = new Student(STDInfo)

// *课程信息 C表获取所有课程，SC表区分相应课程
// 
let courseFinish: Course[] = []
let courseUnfinish: Course[] = []

courseFinish.push(new Course({
    cno: '08305001', cname: '离散数学', credit: 4, cdept: '计算机学院', tname: '罗国强', grade: 80
}))

courseUnfinish.push(new Course({
    cno: '08305002', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305003', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '罗国强'
}))

courseUnfinish.push(new Course({
    cno: '08305004', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305005', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: ''
}))

courseUnfinish.push(new Course({
    cno: '08305006', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305007', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '马小黄'
}))

courseUnfinish.push(new Course({
    cno: '08305008', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305009', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '马小黄'
}))


courseUnfinish.push(new Course({
    cno: '08305010', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305011', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '马小黄'
}))



courseUnfinish.push(new Course({
    cno: '08305012', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305013', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '马小黄'
}))


// 设置已经选课程
courseUnfinish[1].choosed = true
courseUnfinish[2].choosed = true
courseUnfinish[3].choosed = true
courseUnfinish[4].choosed = true
courseUnfinish[5].choosed = true
courseUnfinish[6].choosed = true




// ! 管理员相关页面

//  * 课程的学生信息 CS表 
// 课程名称 < 学号 姓名 成绩
let courseInfo = []
courseInfo.push(
    new CourseWithStudents({
        cno: '08305008', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
    })
)

courseInfo[0].addStudent({
    sno: '2481', sname: 'lin', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}, 80)

courseInfo[0].addStudent({
    sno: '2482', sname: 'lin', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}, 81)


courseInfo.push(new CourseWithStudents({
    cno: '08305008', cname: '计算机组成原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseInfo[1].addStudent({
    sno: '2481', sname: 'Ling', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}, 80)

courseInfo[1].addStudent({
    sno: '2482', sname: 'Ling', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}, 81)


// * 所有课程以及学生的信息  S表和C表
//  修改S表和C表



let initState = {
    user: new User(),
    student: student,
    courseFinish: courseFinish,
    courseUnfinish: courseUnfinish,
    courseInfo:courseInfo
}




export default initState
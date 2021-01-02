import { User, Student, Course } from './global'

let STDInfo = {
    sno: '2481', sname: 'lin', sex: 'male', age: '18', sdept: '计科', logn: 'lin'
}
let student = new Student(STDInfo)
let courseFinish: Course[] = []
let courseUnfinish: Course[] = []

courseFinish.push(new Course({
    cno: '08305001', cname: '离散数学', credit: 4, cdept: '计算机学院', tname: '马小红', grade: 80
}))

courseUnfinish.push(new Course({
    cno: '08305002', cname: '数据库原理', credit: 4, cdept: '计算机学院', tname: '马小红'
}))

courseUnfinish.push(new Course({
    cno: '08305003', cname: '编译原理', credit: 4, cdept: '计算机学院', tname: '马小黄'
}))

courseUnfinish[1].choosed = true

let initState = {
    user: new User(),
    student: student,
    courseFinish: courseFinish,
    courseUnfinish: courseUnfinish,
}




export default initState
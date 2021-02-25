// 定义所有 在 dispatch（修改state） 前请求数据的函数

import axios from "axios"
import { AnyAction } from "redux"
import { authorType, Course, CourseWithEditflag, CourseWithStudents, Student, StudentWithEditflag } from "../global"
import { dispatch } from "./store";


axios.defaults.baseURL = 'http://127.0.0.1:8000/';



// 副作用 应用器
class Effecter {
    childrens: unknown = []
    exec = async function (this: any, action: AnyAction) {

        this.childrens.forEach((i: Effecter) => i.exec(action))
        let type = action.type
        if (!(type in this)) {
            return
        }
        // 输出 调试 信息
        console.log("Efect:", action.type, action);
        // 执行对应的函数
        // 根据 action 修改 state
        return await this[type](action)
    }
    push = function (this: any, child: Effecter) {
        this.childrens.push(child)
    }
}


class InitState extends Effecter {

    login = async (action: AnyAction) => {
        // 获取登陆结果
        await axios.get('/API/author/', {
            params: {
                id: action.user.name,
                pswd: action.pswd
            }
        }).then((response) => {
            action.user.token = response.data.token
            switch (response.data.authorType) {
                case 0:
                    action.user.author = authorType.guest
                    break
                case 1:
                    action.user.author = authorType.students
                    break
                case 2:
                    action.user.author = authorType.admin
            }

            console.log("debug", "login", response.data, action);
        })
        // 更新用户信息
    }

    init = async (action: AnyAction) => {
        if (action.user.author === authorType.admin) {
            // get courseInfo , studentsList , coursesList

            action.courseInfo = []
            action.studentsList = []
            action.coursesList = []


            // 获取所有课程信息
            let respondOfCourseInfo = axios.get('/API/cws/').then((response) => {
                action.courseInfo = (response.data) as CourseWithStudents[]
            })

            let respondOfStudentsList = axios.get('/API/ass/').then((response) => {
                action.studentsList = response.data.map((item: { sno: string; sname: string; sex: string; age: string; sdept: string; logn: string; }) => new StudentWithEditflag(item))
            })

            let respondOfCoursesList = axios.get('/API/acs/').then((response) => {
                action.coursesList = response.data.map((item: { cno: string; cname: string; credit: number; cdept: string; tname: string; grade?: number | undefined; }) => new CourseWithEditflag(item))
            })




            await Promise.all([respondOfCourseInfo, respondOfStudentsList, respondOfCoursesList])

            // console.log("debug", "fortest", action);



        } else if (action.user.author === authorType.students) {
            // get     student: student,
            // courseFinish: [],
            // courseUnfinish: [],

            let s_id = action.user.name
            action.courseFinish = []
            action.courseUnfinish = []


            // 获取学生信息
            let respondOfStudent = axios.get('/API/s/', {
                params: {
                    id: s_id
                }
            }).then((response) => {
                action.student = new Student(response.data)
            })

            // 获取已完成课程信息
            let respondOfCourseFinish = axios.get('/API/cs/', {
                params: {
                    id: s_id,
                    flag: 'finished'
                }
            }).then((response) => {

                action.courseFinish = response.data.map((item: { cno: string; cname: string; credit: number; cdept: string; tname: string; grade?: number | undefined; }) => new Course(item))
            })


            // 获取 未完成 课程信息
            let respondOfCourseSelected = axios.get('/API/cs/', {
                params: {
                    id: s_id,
                    flag: 'unselected'
                }
            }).then((response) => {
                console.log("response unselected", response);

                let temp = response.data.map((item: { cno: string; cname: string; credit: number; cdept: string; tname: string; grade?: number | undefined; }) => new Course(item))
                console.log("courseUnfinish unselected", action.courseUnfinish, temp);
                action.courseUnfinish = temp.concat(action.courseUnfinish)


            })

            let respondOfCourseUnSelected = axios.get('/API/cs/', {
                params: {
                    id: s_id,
                    flag: 'selected'
                }
            }).then((response) => {
                console.log("response selected", response);

                let temp = response.data.map((item: { cno: string; cname: string; credit: number; cdept: string; tname: string; grade?: number | undefined; }) => {
                    let tempitem = new Course(item)
                    tempitem.choosed = true
                    return tempitem
                })
                action.courseUnfinish = temp.concat(action.courseUnfinish)

            })



            await Promise.all([respondOfStudent, respondOfCourseFinish, respondOfCourseSelected, respondOfCourseUnSelected]).then(() => {
                console.log('axios', action, [respondOfStudent, respondOfCourseFinish, respondOfCourseUnSelected, respondOfCourseSelected]);
            })

        }
    }

    // call the API 
    select = async (action: AnyAction) => {
        // 数据准备
        let cous: any[] = []
        const selectedRowKeys = action.selectedRowKeys

        action.courseUnChoosed.forEach((item: Course) => {
            if (selectedRowKeys.includes(item.cno)) {
                cous.push(item)
            }
        })

        // 发送数据
        let post = axios.post('/API/swc/?flag=add', { student: action.student, courses: cous }).then((response) => {
            console.assert(response.data.flag, "选课失败!")
        })
        await Promise.all([post])
    }

    unSelect = async (action: AnyAction) => {
        // 数据准备
        let cous: any[] = []
        const selectedRowKeys = action.selectedRowKeys

        action.courseChoosed.forEach((item: Course) => {
            if (selectedRowKeys.includes(item.cno)) {
                cous.push(item)
            }
        })

        // 发送数据
        let post = axios.post('/API/swc/?flag=del', { student: action.student, courses: cous }).then((response) => {
            console.assert(response.data.flag, "退课失败!")
        })
        await Promise.all([post])
    }


    fixGrade = async (action: AnyAction) => {
        // 数据准备

        // 发送数据
        let post = axios.post('/API/cws/', action.courseEdited).then((response) => {
            console.assert(response.data.flag, "修改成绩失败!")
        })

        await Promise.all([post])
    }


    fixStudent = async (action: AnyAction) => {
        // 数据准备
        let list = action.StudentsList.filter((item: StudentWithEditflag) => item.edited)
        list = list.map((item: StudentWithEditflag) => item.student)

        // 发送数据
        let post = axios.post('/API/ss/', list).then((response) => {
            console.assert(response.data.flag, "修改数据失败!")
        })

        await Promise.all([post])
    }

    fixCourse = async (action: AnyAction) => {
        // 数据准备
        let list = action.CoursesList.filter((item: CourseWithEditflag) => item.edited)
        list = list.map((item: CourseWithEditflag) => item.course)

        // 发送数据
        let post = axios.post('/API/cs/', list).then((response) => {
            console.assert(response.data.flag, "修改数据失败!")
        })

        await Promise.all([post])
    }


}


export default async function EffectDispatch(action: AnyAction) {
    const initer = new InitState()
    await initer.exec(action)

    // return action

    dispatch(action)

}





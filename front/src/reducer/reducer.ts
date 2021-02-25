import { AnyAction } from 'redux'
import { CourseWithStudents } from '../global';
import initState from '../testData'


// 初始化数据
console.log("init state:", initState);


// 数据更新器
class Reducer {
    childrens: unknown = []
    exec = function (this: any, state: any, action: AnyAction) {

        this.childrens.forEach((i: Reducer) => i.exec(state, action))
        let type = action.type
        if (!(type in this)) {
            return state
        }
        // 输出 调试 信息
        console.log(action.type, action);
        // 执行对应的函数
        return this[type](state, action)
    }
    push = function (this: any, child: Reducer) {
        this.childrens.push(child)
    }
}


// 用于修改用户信息
class EditUser extends Reducer {
    login = (state: any, action: AnyAction) => {
        state.user = action.user
    }

    init = (state: any, action: AnyAction) => {

        if ('student' in action)
            state.student = action.student
        if ('courseFinish' in action)
            state.courseFinish = action.courseFinish
        if ('courseUnfinish' in action)
            state.courseUnfinish = action.courseUnfinish
        if ('courseInfo' in action)
            state.courseInfo = action.courseInfo
        if ('studentsList' in action)
            state.studentsList = action.studentsList
        if ('coursesList' in action)
            state.coursesList = action.coursesList


    }
}


// 学生登录时 用于修改选课信息
class SelectCourse extends Reducer {
    select = (state: any, action: AnyAction) => {
        const selectedRowKeys = action.selectedRowKeys

        // 提交数据库 (在 Effect 中完成)
        // 成功后修改本地数据
        let [...newcourseUnfinish] = state.courseUnfinish;

        for (let i = 0; i < newcourseUnfinish.length; i++) {
            // const element = newcourseUnfinish[i];
            if (selectedRowKeys.includes(newcourseUnfinish[i].cno)) {
                let { ...newcourse } = state.courseUnfinish[i];
                newcourse.choosed = true
                newcourseUnfinish[i] = newcourse
            }
        }

        state.courseUnfinish = newcourseUnfinish
    }

    unSelect = (state: any, action: AnyAction) => {
        const selectedRowKeys = action.selectedRowKeys

        // 提交数据库 
        // 成功后修改本地数据
        let [...newcourseUnfinish] = state.courseUnfinish;

        for (let i = 0; i < newcourseUnfinish.length; i++) {
            // const element = newcourseUnfinish[i];
            if (selectedRowKeys.includes(newcourseUnfinish[i].cno)) {
                let { ...newcourse } = state.courseUnfinish[i];
                newcourse.choosed = false
                newcourseUnfinish[i] = newcourse
            }
        }

        state.courseUnfinish = newcourseUnfinish
    }
}


// 管理员登陆时修改相关信息
class EditCourse extends Reducer {

    // 修改成绩
    fixGrade = (state: any, action: AnyAction) => {


        // 提交数据库 
        // 成功后修改本地数据
        let courseEdited: CourseWithStudents = action.courseEdited


        // 解构替换 Course 数组
        let [...newCourseInfo] = state.courseInfo as CourseWithStudents[];
        // 解构替换 被修改课程的 students 数组
        for (let i = 0; i < newCourseInfo.length; i++) {
            if (newCourseInfo[i].course.cno === courseEdited.course.cno) {
                console.assert(newCourseInfo[i] !== undefined, " newCourseInfo[i]=== undefined, ")
                let { ...newCourse } = (newCourseInfo[i])
                newCourseInfo[i] = newCourse as CourseWithStudents
                // 解构替换  被修改的 StudentWithGrade 对象 并修改 Grade 
                for (let j = 0; j < courseEdited.students.length; j++) {
                    if (newCourseInfo[i].students[j].grade !== courseEdited.students[j].grade) {
                        // 查询修改 数据库

                        // 修改本身数据
                        newCourseInfo[i].students[j].grade = courseEdited.students[j].grade
                    }
                }
            }
        }

        // 重新复制 State 
        state.courseInfo = newCourseInfo
    }

    // 维护学生信息
    fixStudent = (state: any, action: AnyAction) => {

    }

    // 维护课程信息
    fixCourse = (state: any, action: AnyAction) => {

    }

}

// 数据更新器调用函数
export default function mainReducer(state: any, action: AnyAction) {


    if (state === undefined) {
        state = initState
    }
    let { ...newState } = state

    // 调用 数据更新器
    const editUser = new EditUser();
    editUser.exec(newState, action)
    const selectCourse = new SelectCourse()
    selectCourse.exec(newState, action)
    const editCourse = new EditCourse()
    editCourse.exec(newState, action)

    console.log("debug ", "after action ", newState);

    return newState
}


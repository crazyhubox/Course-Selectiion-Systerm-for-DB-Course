import { AnyAction } from 'redux'
import { Course } from '../global';
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
        return this[type](state, action)
    }
    push = function (this: any, child: Reducer) {
        this.childrens.push(child)
    }
}

class EditUser extends Reducer {
    newUser = (state: any, action: AnyAction) => {
        console.log("Action:", action);
        state.user = action.user
    }
}

class EditCourse extends Reducer {
    select = (state: any, action: AnyAction) => {
        console.log("Action:", action);
        const selectedRowKeys = action.selectedRowKeys

        // 提交数据库 
        // 成功后修改本地数据
        let [...newcourseUnfinish] = state.courseUnfinish;

        for (let i = 0; i < newcourseUnfinish.length; i++) {
            // const element = newcourseUnfinish[i];
            let flag = selectedRowKeys.includes(newcourseUnfinish[i].cno)
            console.log("flag:", flag, newcourseUnfinish[i].cno, selectedRowKeys);

            if (selectedRowKeys.includes(newcourseUnfinish[i].cno)) {
                let { ...newcourse } = state.courseUnfinish[i];
                newcourse.choosed = true
                newcourseUnfinish[i] = newcourse
            }
        }

        state.courseUnfinish = newcourseUnfinish
    }

    unSelect = (state: any, action: AnyAction) => {
        console.log("Action:", action);
        const selectedRowKeys = action.selectedRowKeys

        // 提交数据库 
        // 成功后修改本地数据
        let [...newcourseUnfinish] = state.courseUnfinish;

        for (let i = 0; i < newcourseUnfinish.length; i++) {
            // const element = newcourseUnfinish[i];
            let flag = selectedRowKeys.includes(newcourseUnfinish[i].cno)
            console.log("flag:", flag, newcourseUnfinish[i].cno, selectedRowKeys);

            if (selectedRowKeys.includes(newcourseUnfinish[i].cno)) {
                let { ...newcourse } = state.courseUnfinish[i];
                newcourse.choosed = false
                newcourseUnfinish[i] = newcourse
            }
        }

        state.courseUnfinish = newcourseUnfinish
    }
}


// 数据更新器调用函数
export default function mainReducer(state: any, action: AnyAction) {
    console.log("main reducer:", state);

    if (state === undefined) {
        state = initState
    }
    let { ...newState } = state

    // 调用 数据更新器
    const editUser = new EditUser();
    editUser.exec(newState, action)
    const editCourse = new EditCourse()
    editCourse.exec(newState, action)

    console.log("After main reducer:", newState);

    return newState
}


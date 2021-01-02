import { AnyAction } from 'redux'
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


// 数据更新器调用函数
export default function mainReducer(state: any, action: AnyAction) {
    console.log("main reducer:", state);

    if (state == undefined) {
        console.log("main reducer:", "state not defined");
        state = initState
    }
    let newState = Object.assign({}, state)

    // 调用 数据更新器
    const editUser = new EditUser();
    editUser.exec(newState, action)

    console.log("After main reducer:", newState);
    return newState
}


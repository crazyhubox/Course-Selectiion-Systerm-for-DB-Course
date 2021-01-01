import { AnyAction } from 'redux'
import { User } from '../global'

// 初始化数据
let initState = {
    user: new User()
}

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
export default function mainReducer(state: any = initState, action: AnyAction) {
    let newState = Object.assign({}, state)

    // 调用 数据更新器
    const editUser = new EditUser();
    editUser.exec(state, action)
    return newState
}


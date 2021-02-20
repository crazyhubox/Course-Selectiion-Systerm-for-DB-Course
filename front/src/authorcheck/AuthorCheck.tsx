//  检查权限信息，引导路由跳转

import { ReactNode } from 'react';
import { authorType, User } from '../global'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';







interface props {
    author: authorType,
    defult: string,
    user: User
    children: ReactNode[] | ReactNode
}

//  权限检查组件
// @author： 允许通过的权限等级
// @defult 默认返回路由
// @user 当前用户信息
// @children 被包含的子组件
function AuthorCheck(props: props): JSX.Element {

    console.log("authorckeck: ", props);

    if (props.author !== check(props.user)) {
        return (
            <Redirect to={props.defult}></Redirect>
        )
    }
    return (
        <>
            { props.children}
        </>
    )
}


// 将token发送到后端，获取当前用户的权限信息
function check(user: User): authorType {

    return user.author
}


//AuthorCheck 
let ACKContainer = connect(
    (state: any) => ({ user: state.user })
)(AuthorCheck)

export default ACKContainer
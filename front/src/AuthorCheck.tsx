import { type } from 'os';
import React, { ReactNode } from 'react';
import { authorType, User } from './global'




interface props {
    author: authorType,
    defult: ReactNode,
    user: User
    children: ReactNode[] | ReactNode

}

function AuthorCheck(props: props) {
    if (props.author !== check(props.user)) {
        return (props.defult)
    } else {
        return props.children
    }
}


function check(user: User): authorType {
    return authorType.students
}


export { AuthorCheck }
import { ReactNode } from 'react';
import { authorType, User } from '../global'
import { Redirect } from 'react-router'




interface props {
    author: authorType,
    defult: string,
    user: User
    children: ReactNode[] | ReactNode
}


function AuthorCheck(props: props): JSX.Element {
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


function check(user: User): authorType {
    return authorType.students
}


export { AuthorCheck }
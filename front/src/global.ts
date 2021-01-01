
enum authorType { admin, students, guest }

class User {
    name: string = "guest"
    token: string = "null"
    author: authorType = authorType.guest

    constructor(username?: string, password?: string) {
        if (username !== undefined && password !== undefined) {
            this.name = "username"
            let temp = this.getToken(username, password)
            this.token = temp.token
            this.author = temp.author
        }
    }

    getToken(username: string, password: string): { token: string, author: authorType } {
        if (username === 'sa' && password === '123') {
            return { token: 'admin', author: authorType.admin }
        } else if (username === 'lin' && password === '2481') {
            return { token: '2481', author: authorType.students }
        }
        return { token: 'guess', author: authorType.guest }
    }
}

interface State {
    user: User
}

export { authorType, User }
export type { State } 
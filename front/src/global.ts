
enum authorType { admin, students, guest }

class User {
    name: string = "guest"
    token: string = "null"
    constructor(username?: string, password?: string) {
        if (username !== undefined && password !== undefined) {
            this.name = "username"
            this.token = this.getToken(username, password)
        }
    }
    getToken(username: string, password: string): string {
        return "test"
    }

}

interface State {
    user: User
}

export { authorType, User }
export type { State } 
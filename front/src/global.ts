// 全局类型


enum authorType { admin, students, guest }

class User {
    name: string = "guest"
    token: string = "null"
    author: authorType = authorType.guest

    constructor(username?: string, password?: string) {
        if (username !== undefined && password !== undefined) {
            this.name = username
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





class Student {
    sno: string
    sname: string
    sex: string
    age: string
    sdept: string
    logn: string
    constructor(agrs: { sno: string, sname: string, sex: string, age: string, sdept: string, logn: string }) {
        this.sno = agrs.sno
        this.sname = agrs.sname
        this.sex = agrs.sex
        this.age = agrs.age
        this.sdept = agrs.sdept
        this.logn = agrs.logn
    }
}


class Course {
    cno: string
    cname: string
    credit: number
    cdept: string
    tname: string
    grade: number = -1
    choosed: boolean = false

    constructor(arg: { cno: string, cname: string, credit: number, cdept: string, tname: string, grade?: number }) {
        this.cno = arg.cno
        this.cname = arg.cname
        this.credit = arg.credit
        this.cdept = arg.cdept
        this.tname = arg.tname

        if (this.grade !== undefined) {
            this.grade = arg.grade as number
        }
    }

    public search(key: string) {
        if (this.cdept.indexOf(key) !== -1) {
            return true
        } else if (this.cname.indexOf(key) !== -1) {
            return true
        } else if (this.cno.indexOf(key) !== -1) {
            return true
        } else if (this.tname.indexOf(key) !== -1) {
            return true
        } else {
            return false
        }
    }

}



// bind student with his grade in specific course
class StudentWithGrade {
    student: Student
    grade: number

    constructor(agrs: { sno: string, sname: string, sex: string, age: string, sdept: string, logn: string }, grade: number) {
        this.student = new Student(agrs);
        this.grade = grade
    }
}

// Clear who are in the course 
class CourseWithStudents {
    course: Course
    students: StudentWithGrade[]
    constructor(args: { cno: string, cname: string, credit: number, cdept: string, tname: string, grade?: number }) {
        this.course = new Course(args)
        this.students = []
    }

    addStudent(args: { sno: string, sname: string, sex: string, age: string, sdept: string, logn: string }, grade: number) {
        this.students.push(new StudentWithGrade(args, grade))
    }
}






export { authorType, User, Student, Course, StudentWithGrade, CourseWithStudents }

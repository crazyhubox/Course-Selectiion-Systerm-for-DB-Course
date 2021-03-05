import asyncio
from asyncio.events import Handle
from model import Respond, StudentWithCourses
from model import Course, CourseWithStudents, Student
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import *
from components.handler import MyDataBase,Handler
from components.asyncMysql import AsyncHandler

# 使用数据库初始化一个处理器
# Handler是一服务器到数据库的接口，封装了数数据库具体的查询过程
# handler = Handler(MyDataBase(host='127.0.0.1',user='root',database='dataBase'))
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
async def start():
    global handler
    handler = AsyncHandler()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# 得到特定的学生    
@app.get("/API/s/", response_model=Student)
async def getTheStu(id: str):
    rs = await handler.getStudent(id_num=id)
    s = Student(**rs[0])
    return s

# 该学生所有的课程
@app.get("/API/cs/", response_model=List[Course])
async def getAllFinCousOfTheStu(id: str, flag: str):
    # 根据 flag 决定 SQL
    # 课程已经完成
    couse_list = await handler.getCouse(id_num=id,flag=flag)

    # 将结果 模型化并返回
    res = []
    if couse_list is not None:
        for i in couse_list:
            res.append(Course(**i))

    return res

# 得到所有学生
@app.get("/API/ass/", response_model=List[Student])
async def getAllStu():
    rs = await handler.getAllStudent()
    # 将结果 模型化并返回
    res = []
    if rs is not None:
        for i in rs:
            res.append(Student(**i))

    return res

# 得到所有的课程
@app.get("/API/acs/", response_model=List[Course])
async def getAllCous():
    # 初始化 SQL
    rs = await handler.getAllCouse()

    # 将结果 模型化并返回
    res = []
    if rs is not None:
        for i in rs:
            res.append(Course(**i))

    return res

# 得到学生的课程和成绩
@app.get("/API/cws/", response_model=List[CourseWithStudents])
async def getAllCousWS():
    # 载入 Course
    # courses = []

    # 初始化 SQL
    rs = await handler.getAllCouse()
    # 将结果 模型化并返回
    res = []
    if rs is not None:
        for i in rs:
            res.append(Course(**i))

    # 将 course list 转变为 Cws list
    cous = []
    for item in res:
        cous.append(CourseWithStudents(course=item,
                                       students=[]))

    # 载入 Students
    for item in cous:
        # 初始化 SQL
        rs = await handler.getStuGrade(item.course.cno)
        # 将结果 模型化并返回
        if rs is not None:
            for i in rs:
                item.students.append(Student(**i))
    # 返回 Cws
    return cous

# 登录校验
@app.get('/API/author/')
async def authorize(id: str, pswd: str):
    # admin
    if(id == 'sa' and pswd == '123'):
        return{
            'authorType': 2,
            'token': ''
        }

    # 查询 校对密码
    rs = await handler.getPassword(id_num=id)
    print(rs)
    if(len(rs) == 0 or rs[0]['pswd'].strip() != pswd.strip()):
        return{
            'authorType': 0,
            'token': ''
        }
    # student
    else:
        return {
            'authorType': 1,
            'token': ''
        }


# 添加或者删除某学生某课程
# ! methord: post
@app.post("/API/swc/", response_model=Respond)
async def selectCous(flag: str, swc: StudentWithCourses):
    for item in swc.courses:
        s_id = swc.student.sno
        c_id = item.cno
        # 初始化 SQL
        # 增选课程
        await handler.addORdeleteCourse(flag=flag,s_id=s_id,c_id=c_id)
    # 将结果 模型化并返回
    return Respond()

# 录入修改成绩
@app.post("/API/cws/", response_model=Respond)
async def fixGrade(cws: CourseWithStudents):
    for item in cws.students:
        c_id = cws.course.cno
        s_id = item.sno
        grade = item.grade
        # 初始化 SQL
        # if grade is None:  # 避免无效字段
        #     grade = 'Null'
        await handler.changeGrade(grade,s_id,c_id)

    # 将结果 模型化并返回
    return Respond()

# 管理员修改课程信息
@app.post("/API/cs/", response_model=Respond)
async def updCousInfo(cs: List[Course]):
    for item in cs:
        await handler.changeCourseInfo(item.cname, item.credit, item.cdept, item.tname, item.cno)
    # 将结果 模型化并返回
    return Respond()

# 管理员修改学生信息
@app.post("/API/ss/", response_model=Respond)
async def updStuInfo(ss: List[Student]):
    for item in ss:
        # 初始化 SQL
        await handler.changeStuInfo(item.sname, item.sex, item.age, item.sdept, item.logn, item.sno)
    # 将结果 模型化并返回
    return Respond()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000,reload=True)
    # uvicorn.run(app, host="0.0.0.0", port=9090)
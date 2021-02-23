from model import Respond, StudentWithCourses
from model import Course, CourseWithStudents, Student
from typing import List
from fastapi import FastAPI
import pymssql
from model import *

# connect to the database init
# 获取数据
sqlHost = "192.168.31.249"
conn = pymssql.connect(host=sqlHost, user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

cursor = conn.cursor(as_dict=True)


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/API/s/", response_model=Student)
async def getTheStu(id: str):
    sql = ' select * from S where SNO = %s' % (id)
    cursor.execute(sql)
    rs = cursor.fetchall()
    s = Student(**rs[0])
    return s


@app.get("/API/cs/", response_model=List[Course])
async def getAllFinCousOfTheStu(id: str, flag: str):
    # 获取课程信息

    # 课程已经完成
    if(flag == 'finished'):
        sql = ' select * from S where SNO = %s and grade is not null' % (id)
    # 课程 未完成 已选
    elif(flag == 'selected'):
        sql = ' select * from S where SNO = %s and grade is null' % (id)
    # 课程 未完成 未选
    else:
        pass

# 返回课程信息
    pass


@app.get("/API/ass/", response_model=List[Student])
async def getAllStu():
    pass


@app.get("/API/acs/", response_model=List[Course])
async def getAllCous():
    pass


@app.get("/API/cws/", response_model=List[CourseWithStudents])
async def getAllCousWS():
    pass


# ! methord: post
@app.post("/API/swc/", response_model=Respond)
async def selectCous(flag: str, swc: StudentWithCourses):
    pass


@app.post("/API/cws/", response_model=Respond)
async def fixGrade(flag: str, cws: CourseWithStudents):
    pass


@app.post("/API/cs/", response_model=Respond)
async def updCousInfo(flag: str, cs: List[Course]):
    pass


@app.post("/API/ss/", response_model=Respond)
async def updStuInfo(flag: str, ss: List[Student]):
    pass

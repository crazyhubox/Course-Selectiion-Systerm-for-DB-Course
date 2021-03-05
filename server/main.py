from model import Respond, StudentWithCourses
from model import Course, CourseWithStudents, Student
from typing import List
from fastapi import FastAPI
import pymssql
from fastapi.middleware.cors import CORSMiddleware
from model import *

# connect to the database init
# 获取数据
sqlHost = "10.89.146.84"
conn = pymssql.connect(host=sqlHost, user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

conn.autocommit(True)

cursor = conn.cursor(as_dict=True)


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://10.95.221.89:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    # 根据 flag 决定 SQL
    # 课程已经完成
    if(flag == 'finished'):
        sql = ''' 
            SELECT C.cno, cname, credit, cdept, tname, grade
            FROM C, SC
            WHERE C.cno =SC.cno
                AND SC.sno = %s
                AND grade IS NOT NULL
            ''' % (id)
    # 课程 未完成 已选
    elif(flag == 'selected'):
        sql = '''
            SELECT C.cno, cname, credit, cdept, tname, grade
            FROM C, SC
            WHERE C.cno =SC.cno
                AND SC.sno = %s
                AND grade IS NULL
        ''' % (id)
    # 课程 未完成 未选
    else:
        sql = '''
            SELECT *
            FROM C
            WHERE 
                not exists (select *
            from SC
            WHERE C.cno =SC.cno and SC.sno =%s )
        ''' % (id)

    # 执行 SQL 并获取结果
    cursor.execute(sql)
    couse_list = cursor.fetchall()

    # 将结果 模型化并返回
    res = []
    if couse_list is not None:
        for i in couse_list:
            res.append(Course(**i))

    return res


@app.get("/API/ass/", response_model=List[Student])
async def getAllStu():
    # 初始化 SQL
    sql = '''
        SELECT *
        FROM S
    '''

    # 执行 SQL 并获取结果
    cursor.execute(sql)
    rs = cursor.fetchall()

    # 将结果 模型化并返回
    res = []
    if rs is not None:
        for i in rs:
            res.append(Student(**i))

    return res


@app.get("/API/acs/", response_model=List[Course])
async def getAllCous():
    # 初始化 SQL
    sql = '''
        SELECT *
        FROM C
    '''

    # 执行 SQL 并获取结果
    cursor.execute(sql)
    rs = cursor.fetchall()

    # 将结果 模型化并返回
    res = []
    if rs is not None:
        for i in rs:
            res.append(Course(**i))

    return res


@app.get("/API/cws/", response_model=List[CourseWithStudents])
async def getAllCousWS():
    # 载入 Course
    courses = []
    # 初始化 SQL
    sql = '''
        SELECT *
        FROM C
    '''

    # 执行 SQL 并获取结果
    cursor.execute(sql)
    rs = cursor.fetchall()

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
        sql = '''
            SELECT S.sno, sname, sex, age, sdept, logn , grade
            FROM S, SC
            WHERE S.sno =SC.sno
                AND SC.cno = %s
        ''' % (item.course.cno)

        # 执行 SQL 并获取结果
        cursor.execute(sql)
        rs = cursor.fetchall()

        # 将结果 模型化并返回
        if rs is not None:
            for i in rs:
                item.students.append(Student(**i))

    # 返回 Cws
    return cous


@app.get('/API/author/')
async def authorize(id: str, pswd: str):

    # admin
    if(id == 'sa' and pswd == '123'):
        return{
            'authorType': 2,
            'token': ''
        }

    # 查询 校对密码
    sql = '''
    select pswd
    FROM S
    WHERE sno = '%s'
    ''' % (id)

    # 执行 SQL 并获取结果
    cursor.execute(sql)
    rs = cursor.fetchall()

    # guess
    # print(rs[0]['pswd'].strip(), pswd, rs[0]['pswd'].strip() == pswd)
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


# ! methord: post
@app.post("/API/swc/", response_model=Respond)
async def selectCous(flag: str, swc: StudentWithCourses):
    for item in swc.courses:
        s_id = swc.student.sno
        c_id = item.cno
        # 初始化 SQL
        # 增选课程
        if(flag == 'add'):
            sql = '''
            INSERT into SC
                (sno,cno)
            VALUES
                (%s , %s)
            ''' % (s_id, c_id)
        # 删选课程
        else:
            sql = '''
            DELETE from SC
            WHERE sno = %s 
            AND cno = %s
            ''' % (s_id, c_id)
        # 执行 SQL 并获取结果
        cursor.execute(sql)

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
        sql = '''
            UPDATE SC
            SET
            grade = %s
            WHERE sno = %s AND cno = %s 
            ''' % (grade, s_id, c_id)

        # 执行 SQL 并获取结果
        try:
            cursor.execute(sql)
        except pymssql.ProgrammingError as e:
            print(e)
            print(sql)

    # 将结果 模型化并返回
    return Respond()


@app.post("/API/cs/", response_model=Respond)
async def updCousInfo(cs: List[Course]):
    for item in cs:

        # 初始化 SQL
        sql = '''
            UPDATE C
            SET
            cname = '%s',
            credit = '%d',
            cdept = '%s',
            tname = '%s'
            WHERE cno = %s 
            ''' % (item.cname, item.credit, item.cdept, item.tname, item.cno)

        print(sql)

        # 执行 SQL 并获取结果
        cursor.execute(sql)

    # 将结果 模型化并返回
    return Respond()


@app.post("/API/ss/", response_model=Respond)
async def updStuInfo(ss: List[Student]):
    for item in ss:

        # 初始化 SQL
        sql = '''
            UPDATE S
            SET
            sname = '%s',
            sex = '%s',
            age = '%s',
            sdept = '%s',
            logn = '%s'
            WHERE sno = %s 
            ''' % (item.sname, item.sex, item.age, item.sdept, item.logn, item.sno)

        # 执行 SQL 并获取结果
        cursor.execute(sql)

    # 将结果 模型化并返回
    return Respond()

import pymssql
from typing import Optional, List
from pydantic import BaseModel


# 定义 modle
class Student(BaseModel):
    sno: str
    sname: str
    sex: str
    age: str
    sdept: str
    logn: str
    password: str
    grade: Optional[float] = None


class Course(BaseModel):
    cno: str
    cname: str
    credit: str
    cdept: str
    tname: str
    grade: Optional[float] = None


class CourseWithStudents(BaseModel):
    student: Student
    courses: List[Course]
    edit_type: None


class StudentWithCourses(BaseModel):
    course: Course
    student: List[Student]
    edit_type: None


# 获取数据
conn = pymssql.connect(host="192.168.31.249", user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

cursor = conn.cursor()

# 获取S表
sql = 'select * from s'
cursor.execute(sql)
rs = cursor.fetchall()

# 获取 C 表
sql = 'select * from C'
cursor.execute(sql)
crs = cursor.fetchall()


# 将获取的数据 映射成 数据模型
modles: list = []
if rs is not None:
    assert isinstance(rs, list)
    for item in rs:
        dic = {'sno': item[0], 'sname': item[1], 'sex': item[2], 'age': item[3], 'sdept': item[4],
               'logn': item[5], 'password': item[6]}
        modles.append(Student.parse_obj(dic))


courseModles: list = []
if rs is not None:
    assert isinstance(rs, list)
    for item in rs:
        dic = {'cno': item[0], 'cname': item[1],
               'credit': item[2], 'cdept': item[3], 'tname': item[4]}
        courseModles.append(Course.parse_obj(dic))

# 将数据输出 或者响应给请求
print((courseModles))

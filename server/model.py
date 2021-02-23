from typing import Optional, List
from pydantic import BaseModel, Field


# 定义 modle
class Student(BaseModel):
    sno: str
    sname: str
    sex: str
    age: str
    sdept: str
    logn: str
    pswd: str
    grade: Optional[float] = None


class Course(BaseModel):
    cno: str
    cname: str
    credit: str
    cdept: str
    tname: str
    grade: Optional[float] = None


class CourseWithStudents(BaseModel):
    course: Course
    students: List[Student]


class StudentWithCourses(BaseModel):
    student: Student
    courses: List[Course]


class Respond(BaseModel):
    flag: bool
    msg: Optional[str]

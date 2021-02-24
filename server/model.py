from typing import Optional, List
from pydantic import BaseModel, Field


# 定义 modle
class Student(BaseModel):
    sno: str
    sname: Optional[str]
    sex: Optional[str]
    age: Optional[str]
    sdept: Optional[str]
    logn: Optional[str]
    grade: Optional[float]


class Course(BaseModel):
    cno: str
    cname: Optional[str]
    credit: Optional[int]
    cdept: Optional[str]
    tname: Optional[str]
    grade: Optional[float]


class CourseWithStudents(BaseModel):
    course: Course
    students: List[Student]


class StudentWithCourses(BaseModel):
    student: Student
    courses: List[Course]


class Respond(BaseModel):
    flag: bool = True
    msg: Optional[str]

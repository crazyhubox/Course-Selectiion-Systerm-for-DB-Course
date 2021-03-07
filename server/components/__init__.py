from abc import ABCMeta,abstractmethod


class Handler(metaclass=ABCMeta):
    """Define the interface of Handler type"""
    
    @abstractmethod
    def getStudent(self,id):
        "Get student info by stuI.d"

    @abstractmethod
    def getCouse(self,id_num,flag):
        "Get course info by stuid."

    @abstractmethod
    def getAllStudent(self):
        "Get all stu info."

    @abstractmethod
    def getAllCouse(self):
        "Get all Course"

    @abstractmethod
    def getPassword(self,id_num):
        "Get stu pw by Stu id."

    @abstractmethod
    def addORdeleteCourse(self,flag,s_id,c_id):
       "Add or delete Course"

    @abstractmethod
    def changeGrade(self,grade,s_id,c_id):
        "Change the grade."

    @abstractmethod
    def changeCourseInfo(self,cname,credit,cdept,tname,cno):
        "Change the course infomation."

    @abstractmethod
    def changeStuInfo(self,sname, sex, age, sdept, logn, sno):
        "Change the student infomation."

    @abstractmethod
    def getStuGrade(self,cno):
        "Get the student course grade by course name."
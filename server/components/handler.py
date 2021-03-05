from typing import Dict, List
import pymysql


class MyDataBase:
    def __init__(self,host,user,database,passwods=None) -> None:
        self.conn = pymysql.connect(host=host, user=user, database=database,charset='utf8',cursorclass=pymysql.cursors.DictCursor)
        self.cursor = self.conn.cursor()
        # Q: close?
    def findAllStudent(self):
        # 初始化 SQL
        sql = '''SELECT * FROM S'''
        # 执行 SQL 并获取结果
        self.cursor.execute(sql)
        return self.cursor.fetchall()

        
    def findStudent(self,id_num):
        sql = ' select * from S where SNO = %s' % (id_num)
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def findCouse(self,id_num,flag) -> List[Dict]:
        # 根据 flag 决定 SQL
    # 课程已经完成
        if(flag == 'finished'):
            sql = ''' 
                SELECT C.cno, cname, credit, cdept, tname, grade
                FROM C, SC
                WHERE C.cno =SC.cno
                    AND SC.sno = %s
                    AND grade IS NOT NULL
                ''' % (id_num)
        # 课程 未完成 已选
        elif(flag == 'selected'):
            sql = '''
                SELECT C.cno, cname, credit, cdept, tname, grade
                FROM C, SC
                WHERE C.cno =SC.cno
                    AND SC.sno = %s
                    AND grade IS NULL
            ''' % (id_num)
        # 课程 未完成 未选
        else:
            sql = '''
                SELECT *
                FROM C
                WHERE 
                    not exists (select *
                from SC
                WHERE C.cno =SC.cno and SC.sno =%s )
            ''' % (id_num)

        # 执行 SQL 并获取结果
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def updateCourseGrade(self,grade,s_id,c_id):
        sql = '''
            UPDATE SC
            SET
            grade = %s
            WHERE sno = %s AND cno = %s 
            ''' % (grade, s_id, c_id)
        # 执行 SQL 并获取结果
        self.cursor.execute(sql)

    def findAllCouse(self):
        # 初始化 SQL
        sql = '''
            SELECT *
            FROM C
        '''
        # 执行 SQL 并获取结果
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def findPassword(self,id_num):
        # 查询 校对密码
        sql = '''
        select pswd
        FROM S
        WHERE sno = '%s'
        ''' % (id_num)
    # 执行 SQL 并获取结果
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def insertCourse(self,s_id,c_id):
        sql = '''
            INSERT into SC
                (sno,cno)
            VALUES
                (%s , %s)
            ''' % (s_id, c_id)

        self.cursor.execute(sql)


    def deleteCouse(self,s_id,c_id):
        sql = '''
            DELETE from SC
            WHERE sno = %s 
            AND cno = %s
            ''' % (s_id, c_id)
        self.cursor.execute(sql)

    def updateCourseInfo(self,cname,credit,cdept,tname,cno):
        # 初始化 SQL
        sql = '''
            UPDATE C
            SET
            cname = '%s',
            credit = '%d',
            cdept = '%s',
            tname = '%s'
            WHERE cno = %s 
            ''' % (cname, credit, cdept, tname, cno)
        print(sql)

        # 执行 SQL 并获取结果
        self.cursor.execute(sql)

    def updateStudent(self,sname, sex, age, sdept, logn, sno):
        sql = '''
            UPDATE S
            SET
            sname = '%s',
            sex = '%s',
            age = '%s',
            sdept = '%s',
            logn = '%s'
            WHERE sno = %s 
            ''' % (sname, sex, age, sdept, logn, sno)

        # 执行 SQL 并获取结果
        self.cursor.execute(sql)

    def findStuAndGrade(self,cno):
        sql = '''
            SELECT S.sno, sname, sex, age, sdept, logn , grade
            FROM S, SC
            WHERE S.sno =SC.sno
                AND SC.cno = %s
        ''' % (cno)
        self.cursor.execute(sql)
        return self.cursor.fetchall()

        
    

class Handler:

    def __init__(self,database:MyDataBase) -> None:
        self.db = database
        
    def getStudent(self,id):
        return self.db.findStudent(id_num=id)

    def getCouse(self,id_num,flag):
        # 将结果 模型化并返回
        couse_list = self.db.findCouse(id_num,flag)
        return couse_list
    
    def getAllStudent(self):
        return  self.db.findAllStudent()

    def getAllCouse(self):
        return self.db.findAllCouse()

    def getPassword(self,id_num):
        return self.db.findPassword(id_num=id_num)

    def addORdeleteCourse(self,flag,s_id,c_id):
        if(flag == 'add'):
            self.db.insertCourse(s_id=s_id,c_id=c_id)
        # 删选课程
        else:
            self.db.deleteCouse(s_id=s_id,c_id=c_id)

    def changeGrade(self,grade,s_id,c_id):
        self.db.updateCourseGrade(grade,s_id=s_id,c_id=c_id)

    def changeCourseInfo(self,cname,credit,cdept,tname,cno):
        self.db.updateCourseInfo(cname,credit,cdept,tname,cno)

    def changeStuInfo(self,sname, sex, age, sdept, logn, sno):
        self.db.updateCourseInfo(sname, sex, age, sdept, logn, sno)

    def getStuGrade(self,cno):
        return self.db.findStuAndGrade(cno=cno)
        
if __name__ == '__main__':
    obj = A()
    print(obj)
    print(obj.val)
    testFUnc(obj)
    print(obj.val)
    
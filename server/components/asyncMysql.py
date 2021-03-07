from components import Handler
import aiomysql
from aiomysql import Pool,DictCursor
import asyncio

from aiomysql import pool


class AsyncHandler(Handler):

    def __init__(self,host:str='127.0.0.1',port:int=3306,user:str='root',database:str='dataBase',minsize=1,maxsize=10) -> None:
        async def initPool():
            print('Init.')
            self.pool =  await aiomysql.create_pool(
                host=host, 
                port=port, 
                user=user, 
                db=database, 
                autocommit=True,
                minsize=minsize,
                maxsize=maxsize, 
                cursorclass=DictCursor
            )
        asyncio.create_task(initPool())
     

    async def getStudent(self,id_num):
        async with self.pool.acquire() as conn:
            sql = ' select * from S where SNO = %s' % (id_num)
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


    async def getCouse(self,id_num,flag):
        # 将结果 模型化并返回
        async with self.pool.acquire() as conn:
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
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()
    

    async def getAllStudent(self):
        async with self.pool.acquire() as conn:
            sql = '''SELECT * FROM S'''
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


    async def getAllCouse(self):
        async with self.pool.acquire() as conn:
            sql = '''SELECT * FROM C'''
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


    async def getPassword(self,id_num):
        async with self.pool.acquire() as conn:
            sql = '''
                select pswd
                FROM S
                WHERE sno = '%s'
                ''' % (id_num)
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


    async def addORdeleteCourse(self,flag,s_id,c_id):
        async with self.pool.acquire() as conn:
            if(flag == 'add'):
                sql = '''
                    INSERT into SC
                        (sno,cno)
                    VALUES
                        (%s , %s)
                    ''' % (s_id, c_id)
            else:
                sql = '''
                    DELETE from SC
                    WHERE sno = %s 
                    AND cno = %s
                    ''' % (s_id, c_id)
            cursor = await conn.cursor()
            await cursor.execute(sql)


    async def changeGrade(self,grade,s_id,c_id):
        async with self.pool.acquire() as conn:
            sql = '''
                UPDATE SC
                SET
                grade = %s
                WHERE sno = %s AND cno = %s 
                ''' % (grade, s_id, c_id)
            cursor = await conn.cursor()
            await cursor.execute(sql)


    async def changeCourseInfo(self,cname,credit,cdept,tname,cno):
        async with self.pool.acquire() as conn:
            sql = '''
            UPDATE C
            SET
            cname = '%s',
            credit = '%d',
            cdept = '%s',
            tname = '%s'
            WHERE cno = %s 
            ''' % (cname, credit, cdept, tname, cno)
            cursor = await conn.cursor()
            await cursor.execute(sql)


    async def changeStuInfo(self,sname, sex, age, sdept, logn, sno):
        async with self.pool.acquire() as conn:
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
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


    async def getStuGrade(self,cno):
        async with self.pool.acquire() as conn:
            sql = '''
                SELECT S.sno, sname, sex, age, sdept, logn , grade
                FROM S, SC
                WHERE S.sno =SC.sno
                    AND SC.cno = %s
            ''' % (cno)
            cursor = await conn.cursor()
            await cursor.execute(sql)
            return await cursor.fetchall()


def testMain():

    async def testp():
        async def coro_func():
            print(1)
            # loop.run_until_complete(coro_func())
            await asyncio.sleep(10)
            print(2)
        await coro_func()

    # asyncio.run(testp())

    def testNoAsync(loop:asyncio.AbstractEventLoop):
        async def asyncfunc():
            await asyncio.sleep(5)
        if not loop.is_running():
            loop = asyncio.new_event_loop()
            loop.run_until_complete(asyncfunc())
        else:
            asyncio.create_task(asyncfunc())

    loop = asyncio.get_event_loop()
    loop.run_until_complete(testNoAsync(loop))



if __name__ == '__main__':
    testMain()
    # print(res)

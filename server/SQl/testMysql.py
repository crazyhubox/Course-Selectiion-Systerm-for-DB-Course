import pymysql
from typing import Optional, List
from pydantic import BaseModel


# 获取数据
conn = pymysql.connect(host="127.0.0.1", user='root',
                        database='dataBase', charset='utf8',cursorclass=pymysql.cursors.DictCursor)

# cursor = conn.cursor(as_dict=True)
cursor = conn.cursor()


# 获取 C 表
id = '1107'

sql = ''' 
            SELECT *
            from SC
            WHERE sno = %s
            AND grade IS NOT NULL
            ''' % (id)
cursor.execute(sql)
rs = cursor.fetchall()


# 将数据输出 或者响应给请求
for each in rs:
    print(each)

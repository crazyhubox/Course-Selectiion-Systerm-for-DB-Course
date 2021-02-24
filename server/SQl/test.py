import pymssql
from typing import Optional, List
from pydantic import BaseModel


# 获取数据
conn = pymssql.connect(host="192.168.31.249", user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

cursor = conn.cursor(as_dict=True)


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
print((rs))

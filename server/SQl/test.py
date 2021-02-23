import pymssql
from typing import Optional, List
from pydantic import BaseModel


# 获取数据
conn = pymssql.connect(host="192.168.31.249", user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

cursor = conn.cursor(as_dict=True)


# 获取 C 表
sql = 'select * from SC where sno = 1107 and grade is not null'
cursor.execute(sql)
rs = cursor.fetchall()


# 将数据输出 或者响应给请求
print((rs))

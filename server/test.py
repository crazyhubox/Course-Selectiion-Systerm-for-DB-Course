from model import *
import pymssql


# 获取数据
conn = pymssql.connect(host="192.168.31.249", user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

cursor = conn.cursor(as_dict=True)

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
        # dic = {'sno': item[0], 'sname': item[1], 'sex': item[2], 'age': item[3], 'sdept': item[4], 'logn': item[5], 'password': item[6]}
        modles.append(Student.parse_obj(item))


# courseModles: list = []
# if rs is not None:
#     assert isinstance(rs, list)
#     for item in rs:
#         dic = {'cno': item[0], 'cname': item[1],
#                'credit': item[2], 'cdept': item[3], 'tname': item[4]}
#         courseModles.append(Course.parse_obj(dic))


# 将数据输出 或者响应给请求
# print((modles))


sql = " select * from S where SNO = 1107 "
cursor.execute(sql)
rs = cursor.fetchall()
s = Student(**rs[0])
print(s)

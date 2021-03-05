from model import *
import pymssql


# 建立连接
conn = pymssql.connect(host="127.0.0.1", user='sa',
                       password='lin12345678', database='DBforpProject', charset='utf8')

# 获取设定游标
cursor = conn.cursor(as_dict=True)

# 编写 SQL 语句
sql = 'select * from s'

# 执行SQL语句
cursor.execute(sql)

# 获取所有查询结果
rs = cursor.fetchall()

# 如果有进行修改的话需要 进行 commit
conn.commit()


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


sql = " select pswd from S where sno = 1107 "
cursor.execute(sql)
rs = cursor.fetchall()

print(rs[0]['pswd'].strip() == '1107')

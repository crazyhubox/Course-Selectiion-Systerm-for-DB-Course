# 简单的选课系统-修改详情

## 概述

1. 使用mysql数据库，一开始写的是同步版本在server/components/handler.py, 异步版本在server/components/asyncMysql.py中

2. 异步版本使用连接池实现, 考虑到选课期间连接数会激增的压力问题

3. sql语句被封装到Handler类当中, Handler类可以理解成接口类, 中定义一系列对数据库操作接口

``` python
# app启动时初始化一个全局的处理器
@app.on_event('startup')
async def start():
    global handler
    handler = AsyncHandler() 
    
# 得到特定的学生    
@app.get("/API/s/", response_model=Student)
async def getTheStu(id: str):
    rs = await handler.getStudent(id_num=id)
    # 类中定义的方法相同,如果换成其他数据库,main中的代码只改这一处
    # 例如如果使用redis数据库
    # 操作相同但是不使用sql语句了
    s = Student(**rs[0])
    return s
```

4. 在main.py中启动服务方式变化

``` python
if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000,reload=True)
```

## 使用方法

### 前端启用

1. 环境搭建

环境要求: Node.js + npm

前端环境搭建, 可以直接通过 在前端目录下执行以下命令完成

> `npm install`

2. 启用

在 `/front` 目录下 执行以下命令:

> npm start\

    前端部分代码基于 creat-react-app 手脚架搭建，，服务在 `3000` 端口 [详情](front/README.md)

### 后端启用

1. 环境搭建

环境要求: python3 + pip

需要安装以下模块:

``` 

pymssql
fastapi[all]
```

mac系统可能还需要安装 `freetds`

2. 启用:

 在 `server` 目录下执行以下命令完成

> `uvicorn main:app`

  

### 登陆账号

    

* 学生：默认为学生的学号和密码, 例:`1106:1106`
* 管理员：`sa:123`

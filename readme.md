# 简单的选课系统

## 概述

这个选课系统是作者数据库课程的作业的一部分，前端部分基于 React 和 Antd 构建，后端采用FastAPI 框架，通过 pymssql库 驱动连接SQLserver获取数据

## 使用方法

### 前端启用
1. 环境搭建

环境要求: Node.js + npm

前端环境搭建,可以直接通过 在前端目录下执行以下命令完成
> `npm install`

2. 启用

在 `/front`目录下 执行以下命令:
> npm start\

    前端部分代码基于 creat-react-app 手脚架搭建，，服务在`3000` 端口 [详情](front/README.md)


### 后端启用
1. 环境搭建

环境要求: python3 + pip

需要安装以下模块:
```
pymssql
fastapi[all]
```
mac系统可能还需要安装`freetds`

2. 启用:

 在`server`目录下执行以下命令完成

> `uvicorn main:app`
  

### 登陆账号
    
- 学生：默认为学生的学号和密码, 例:`1106:1106`
- 管理员：`sa:123`




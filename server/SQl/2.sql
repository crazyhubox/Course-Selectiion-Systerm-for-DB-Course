-- 更新 学生 或者 课程信息

USE DBforpProject
GO

SELECT *
FROM SC
GO

-- 修改成绩
-- Update rows in table 'SC'
UPDATE SC
SET
grade = 91
WHERE sno = 1107 AND cno = 	8305001 
GO



-- 修改其他信息
-- 插入删除

INSERT into SC
    (sno,cno,grade)
VALUES
    (1107 , 8305002, 99)

SELECT *
FROM SC
WHERE sno
= 1107
GO




DELETE from SC
WHERE sno
= 1107 AND cno = 	8305002

SELECT *
FROM SC
WHERE sno
= 1107
GO

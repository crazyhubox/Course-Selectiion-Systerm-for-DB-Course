-- 查询已选课程相关

select cno
FROM C
SELECT cno
from SC
WHERE sno = 1107


-- 未选课程
SELECT *
FROM C
WHERE cno IN (select cno
    FROM C  ) AND cno NOT IN ( select cno
    FROM SC
    WHERE sno
= 1107 )



-- 未完成 已选 课程

SELECT *
FROM C
WHERE cno not IN (SELECT cno
from SC
WHERE sno = 1107
    AND grade IS NULL)
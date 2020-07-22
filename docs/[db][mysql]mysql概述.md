# 事前陈述

RDBMS -----关系数据库管理系统（MySQL Oracle SQL DB2）

所有关系数据管理系统都使用结构化查询语言（SQL--Structured Query Language)

数据库：像是一个相关文件的集合（通俗理解）

行----单独实体的数据--------------------记录

列----与该记录相关的数据------属性------字段

## 索引概述









## 安装：

    下载
           http://dev.mysql.com/downloads/mysql/
    安装
         windows：
              http://jingyan.baidu.com/article/f3ad7d0ffc061a09c3345bf0.html

          linux：
               yum install mysql-server
           mac：
               一直点下一步

## 客户端操作

连接：
1、mysql 管理人默认为 root，没有设置密码则直接登录
mysql -h hostname -u root -p 不用输入密码按回车自动进入
mysq -h hostname -u usename -p password databasename
2、如果想设置 mysql 密码
mysqladmin -u root password 123456
3、如果你的 root 现在有密码了（123456），那么修改密码为 abcdef 的命令是：
mysqladmin -u root -p password abcdef
退出：
QUIT 或 EXIT 或按 Ctrl+D

创建库：
CREATE DATABASE firstdb；
按照编码创建数据库

# utf-8

CREATE DATABASE 数据库名称 DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

# gbk

CREATE DATABASE 数据库名称 DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;

登录 mysql 之后创建新用户 root1
SET PASSWORD=PASSWORD('root');
GRANT ALL ON firstdb.\* to root1@localhost INDENTIFED BY 'root';

查看数据库：
SHOW DATABASES;

打开数据库
USE db_name;
注：每次使用数据库必须打开相应数据库

查看表
SHOW TABLES;

查看表结构
DESCRIBE firstdb；

小量插入语句
INSERT INTO sales_rep(employee_number,surname,first_name,commission)VALUES(1,'Mik','Sol',12);

INSERT INTO sales_rep VALUES(1,'Mik','Sol',12);

INSERT INTO sales_rep (employee_number,surname,first_name,commission) VALUES(1,'Mik','Sol',12),(12,'Mik2','Sol2',11),(13,'Mik3','Sol3',13);

大量插入数据（LOAD DATA）：
LOAD DATA INFILE 'sales_rep.sql' INTO TABLE 'sales_rep';
---->文本中每条记录占一行

数据处理语言的四个标准语句（DML 语句：增删改查）

检索信息：（注意优先等级，OR \AND 适当用到括号）：
SELECT \* FROM sales_rep WHERE surname='Rive' AND first_name='Sol' OR commission>10;

SELECT \* FROM sales_rep WHERE surname='Rive' AND (first_name='Sol' OR commission>10);

模糊查询：模式匹配（LIKE 和%）
SELECT \* FROM sales_rep WHERE surname LIKE 'Ser%';

SELECT \* FROM sales_rep WHRER surname LIKE '%e\$';

分类（ORDER BY）
SELECT \* FROM sales_rep ORDER BY commission DESC,surname ASC, first_name ASC;

限制结果的数量（LIMIT 后面两个数（LIMIT 【偏移量】 【 行数】））

SELECT first_name,surname,commission FROM sales_rep ORDER BY DESC LIMIT 1,1;

mysql 常用函数：
MAX(字段)------返回字段最大值 SELECT MAX(commission) FROM sales_rep;
AVG(字段)------返回字段平均数 SELECT AVG(commission) FROM sales_rep;
MIN(字段)------返回字段最小值 SELECT MIN(commission) FROM sales_rep;
SUM(字段)------返回字段 总和 SELECT SUM(commission) FROM sales_rep;

允许在查询中执行计算----select 1+1--------结果为 2，也可以这样使用
SELECT surname,first_name,commission+1 FROM sales_rep;

删除记录
DELETE FROM sales_rep WHERE employee_numbber='5';

更新记录
UPDATA sales_rep SET commission=12 WHRER employee_numbber=1;

数据结构的处理语句（DDL【Data Definition Languages】：CREATE\DROP\ALTER\）
创建（CREATE)
创建表
CREATE TABLE commission(id INT);
创建数据库
CREATE DATABASE abortlived;

删除（DROP）
删除表
DROP TABLE commission;

删除数据库
DROP DATABASE abortlived;

改变表结构（字段---AlTER）
添加列（关键字--ADD）
ALTER TABLE sales_rep ADD data_joined DATE; ----DATA 是一个列类型，格式（YYYY-MM-DD）

ALTER TABLE sales_rep ADD year_born YEAR; -----YEAR

① 修改字段名和字段的定义（关键字--CHANGE）
ALTER TABLE sales_rep CHANGE year_born birthday DATA;

② 修改字段的定义（关键字--MODIFY）
ALTER TABLE sales_rep CHANGE year_born DATA;

为表重新命名

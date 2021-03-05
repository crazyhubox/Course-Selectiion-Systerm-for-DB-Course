/*
 Navicat Premium Data Transfer

 Source Server         : datas_mysql
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : dataBase

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 05/03/2021 00:28:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for C
-- ----------------------------
DROP TABLE IF EXISTS `C`;
CREATE TABLE `C` (
  `cno` int unsigned NOT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `credit` int unsigned DEFAULT NULL,
  `cdept` varchar(255) DEFAULT NULL,
  `tname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of C
-- ----------------------------
BEGIN;
INSERT INTO `C` VALUES (8305001, '离散数学', 4, '计算机学院', '吴宝钢');
INSERT INTO `C` VALUES (8305002, '数据库原理', 4, '计算机学院', '陈迪茂');
INSERT INTO `C` VALUES (8305003, '数据结构', 4, '计算机学院', '马小红');
INSERT INTO `C` VALUES (8305004, '系统结构', 6, '计算机学院', '张心颖');
INSERT INTO `C` VALUES (8301001, '分子物理学', 4, '材料学院', '吴宝钢');
INSERT INTO `C` VALUES (8302001, '通信学', 3, '通讯学院', '陈迪茂');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

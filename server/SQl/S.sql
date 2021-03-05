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

 Date: 05/03/2021 00:28:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for S
-- ----------------------------
DROP TABLE IF EXISTS `S`;
CREATE TABLE `S` (
  `sno` int unsigned NOT NULL,
  `sname` varchar(255) DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int unsigned DEFAULT NULL,
  `sdept` varchar(255) DEFAULT NULL,
  `logn` varchar(255) DEFAULT NULL,
  `pswd` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of S
-- ----------------------------
BEGIN;
INSERT INTO `S` VALUES (1101, '李明', '男', 22, '计算机学院', 'lm', '1101');
INSERT INTO `S` VALUES (1102, '刘晓明', '男', 22, '计算机学院', 'lxm', '1102');
INSERT INTO `S` VALUES (1103, '张颖', '女', 22, '计算机学院', 'zy', '1103');
INSERT INTO `S` VALUES (1104, '刘晶晶', '女', 22, '计算机学院', 'ljj', '1104');
INSERT INTO `S` VALUES (1105, '刘成刚', '男', 22, '计算机学院', 'lcg', '1105');
INSERT INTO `S` VALUES (1106, '李二丽', '女', 22, '材料学院', 'lel', '1106');
INSERT INTO `S` VALUES (1107, '张晓峰', '男', 22, '通讯学院', 'zxf', '1107');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

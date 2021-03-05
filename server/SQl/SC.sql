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

 Date: 05/03/2021 00:28:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for SC
-- ----------------------------
DROP TABLE IF EXISTS `SC`;
CREATE TABLE `SC` (
  `sno` int NOT NULL,
  `cno` int DEFAULT NULL,
  `grade` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of SC
-- ----------------------------
BEGIN;
INSERT INTO `SC` VALUES (1101, 8305001, 60);
INSERT INTO `SC` VALUES (1102, 8305001, 87);
INSERT INTO `SC` VALUES (1102, 8305002, 82);
INSERT INTO `SC` VALUES (1102, 8305004, NULL);
INSERT INTO `SC` VALUES (1103, 8305001, 66);
INSERT INTO `SC` VALUES (1103, 8305002, 75);
INSERT INTO `SC` VALUES (1103, 8305003, 84);
INSERT INTO `SC` VALUES (1103, 8305004, NULL);
INSERT INTO `SC` VALUES (1104, 8305001, 74);
INSERT INTO `SC` VALUES (1104, 8302001, NULL);
INSERT INTO `SC` VALUES (1106, 8305001, 85);
INSERT INTO `SC` VALUES (1106, 8305002, 66);
INSERT INTO `SC` VALUES (1107, 8305001, 90);
INSERT INTO `SC` VALUES (1107, 8305003, 79);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

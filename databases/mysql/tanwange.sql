/*
 Navicat Premium Data Transfer

 Source Server         : 意时代
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : 47.102.156.105:3306
 Source Schema         : tanwange

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 03/06/2020 11:16:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for twg_admin
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin`;
CREATE TABLE `twg_admin`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(11) UNSIGNED NOT NULL COMMENT '用户权限id',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '个人简介',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像地址',
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '联系电话',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '联系手机',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：禁用，1：正常)',
  `last_login_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后登录时间',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '注册时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_log`;
CREATE TABLE `twg_admin_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `type` smallint(6) NOT NULL DEFAULT 0 COMMENT '操作类型',
  `request_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '请求数据',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'ip地址',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_op_type`(`type`) USING BTREE COMMENT '操作类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 108934 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_admin_notify
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_notify`;
CREATE TABLE `twg_admin_notify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `notify_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '通知类型',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `notify_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `notify_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `is_read` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否已读',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `delete_time` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_is_read`(`is_read`) USING BTREE COMMENT '是否已读二级索引',
  INDEX `normal_delete_time`(`delete_time`) USING BTREE COMMENT '删除时间二级索引',
  INDEX `normal_admin_id`(`admin_id`) USING BTREE COMMENT '管理员标识二级索引',
  INDEX `normal_notify_type`(`notify_type`) USING BTREE COMMENT '通知类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_admin_permission
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_permission`;
CREATE TABLE `twg_admin_permission`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '权限标题',
  `uri` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '权限uri',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '该记录是否有效1：有效、0：无效',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级权限ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_role`;
CREATE TABLE `twg_admin_role`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '角色名',
  `desc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1:超级管理员 2:管理者 3:普通客服 4:工单客服',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态(-1：禁用，1：正常)',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_admin_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_role_permission`;
CREATE TABLE `twg_admin_role_permission`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '角色id',
  `permission_list` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '权限id列表，用\',\'隔开',
  `create_time` int(10) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_id`(`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_admin_withdraw
-- ----------------------------
DROP TABLE IF EXISTS `twg_admin_withdraw`;
CREATE TABLE `twg_admin_withdraw`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `bank_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行名称',
  `bank_province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行省',
  `bank_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行市',
  `bank_area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行区',
  `bank_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行账户',
  `bank_account_holder` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户人姓名',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现金额',
  `service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现手续费',
  `actual_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现实际金额',
  `transfer_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '转账请求id',
  `transfer_result` int(11) NOT NULL DEFAULT 2 COMMENT '转账结果:1成功；2等待',
  `withdraw_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现请求id',
  `withdraw_result` int(11) NOT NULL DEFAULT 2 COMMENT '提现结果:1成功；2等待',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1，未通过，1：审核中，2：已通过，3：已提现)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '提现状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_balance_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_balance_log`;
CREATE TABLE `twg_balance_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '类型（1：收入，2：支出）',
  `specific_types` tinyint(4) NOT NULL DEFAULT 1 COMMENT '具体类型（1：充值收入，2：商品交易收入，3：押金转入收入，4：提现收入，5：商品交易支出，6：提现支出，7：装备商品卖家责任赔付收入，8：装备商品买家责任退还收入，9：账号商品平台责任赔付收入，10：账号商品卖家责任赔付收入，11：账号商品卖家责任赔付支出，12：账号商品买家责任赔付收入，13：账号商品买家责任赔付支出，14：商品退款收入）',
  `relevant_id` int(11) NOT NULL DEFAULT 0 COMMENT '关联标识',
  `relevant_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '关联编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `origin_balance` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '原来余额',
  `alter_balance` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '变动余额',
  `final_balance` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '最终余额',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3516 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_bank
-- ----------------------------
DROP TABLE IF EXISTS `twg_bank`;
CREATE TABLE `twg_bank`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行名',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员id',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：禁用，1：正常)',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 211 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_bankcard_audit
-- ----------------------------
DROP TABLE IF EXISTS `twg_bankcard_audit`;
CREATE TABLE `twg_bankcard_audit`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `bank_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行',
  `bank_abridge` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行缩写',
  `bank_abridge_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行名称',
  `bank_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行卡账号',
  `bank_account_holder` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户人姓名',
  `bank_account_phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行预留手机号',
  `bank_province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行省',
  `bank_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行市',
  `bank_area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行区',
  `bank_binding_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '现在支付绑定银行卡请求id',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-2：已解绑，-1：未通过，1：审核中，2：已通过)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '审核状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 2512 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_banner
-- ----------------------------
DROP TABLE IF EXISTS `twg_banner`;
CREATE TABLE `twg_banner`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '图片地址',
  `sort` tinyint(4) NOT NULL DEFAULT 0 COMMENT '排序号',
  `is_stop` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否禁用',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_certification
-- ----------------------------
DROP TABLE IF EXISTS `twg_certification`;
CREATE TABLE `twg_certification`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(4) NOT NULL DEFAULT 2 COMMENT '认证类型（1：买家认证，2：卖家认证）',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `idcard_name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `idcard_num` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证号',
  `idcard_startdate` date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限(开始)',
  `idcard_enddate` date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限(结束)',
  `idcard_front_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证正面图片',
  `idcard_front_img_pid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `idcard_front_img_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `idcard_back_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证反面图片',
  `idcard_back_img_pid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `idcard_back_img_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `idcard_reg_account_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1，未通过，1：审核中，2：已通过)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '审核状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 5475 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_collection
-- ----------------------------
DROP TABLE IF EXISTS `twg_collection`;
CREATE TABLE `twg_collection`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `commodity_type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '商品类型',
  `commodity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `commodity_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品单价',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity`;
CREATE TABLE `twg_commodity`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '类型(1：账号，2：装备，3：金币)',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `platform` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '平台名称',
  `game_id` int(11) NOT NULL DEFAULT 0 COMMENT '游戏id',
  `game_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏名称',
  `game_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏类型',
  `district_id` int(11) NOT NULL DEFAULT 0 COMMENT '大区id',
  `district_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '大区名称',
  `server_id` int(11) NOT NULL DEFAULT 0 COMMENT '服务器id',
  `server_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '服务器名称',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `price` decimal(11, 2) NOT NULL DEFAULT 0.00 COMMENT '商品单价',
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品描述',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '角色名',
  `vip` int(11) NOT NULL DEFAULT 0 COMMENT 'vip等级',
  `click_times` int(11) NOT NULL DEFAULT 0 COMMENT '点击量',
  `collect_times` int(11) NOT NULL DEFAULT 0 COMMENT '收藏量',
  `end_date` date NOT NULL COMMENT '结束日期',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-2：已失效，-1：未通过，1：审核中，2：已上架，3：已下架，4：出售中，5：已出售，6：已过期，7：已审核)',
  `unseal` tinyint(4) NOT NULL DEFAULT -1 COMMENT '解封状态(-1：未解封，1：已解封)',
  `update_lock` tinyint(4) NOT NULL DEFAULT -1 COMMENT '修改锁状态(-1：正常，1：锁定)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `handle_admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '最新处理管理员标识',
  `handle_admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最新处理管理员账号',
  `handle_admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最新处理管理员昵称',
  `handle_admin_opinion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '最新处理管理员意见',
  `sold_time` int(11) NOT NULL DEFAULT 0 COMMENT '出售时间',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_type`(`type`) USING BTREE COMMENT '商品类型二级索引',
  INDEX `normal_game_id`(`game_id`) USING BTREE COMMENT '游戏标识二级索引',
  INDEX `normal_district_id`(`district_id`) USING BTREE COMMENT '大区标识二级索引',
  INDEX `normal_server_id`(`server_id`) USING BTREE COMMENT '服务器标识二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '商品状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 6287 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity_account
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_account`;
CREATE TABLE `twg_commodity_account`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品表主键',
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏账号名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏密码',
  `new_password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '新游戏密码',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '角色名',
  `level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '角色等级',
  `ablity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '战斗力',
  `vip` int(11) NOT NULL DEFAULT 0 COMMENT 'vip等级',
  `second_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '二级密码',
  `warehouse_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '仓库密码',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 6166 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity_account_change
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_account_change`;
CREATE TABLE `twg_commodity_account_change`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单标识',
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单号',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品标识',
  `seller_uid` int(11) NOT NULL COMMENT '卖家标识',
  `seller_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '卖家账号',
  `purchaser_uid` int(11) NOT NULL DEFAULT 0 COMMENT '买家标识',
  `purchaser_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '买家账号',
  `origin_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '原账号名',
  `origin_account_uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '原账号uid',
  `new_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '新账号名',
  `new_account_uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '新账号uid',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_purchaser_username`(`purchaser_username`) USING BTREE COMMENT '买家用户名二级索引',
  INDEX `normal_seller_username`(`seller_username`) USING BTREE COMMENT '卖家用户名二级索引',
  INDEX `normal_order_num`(`order_num`) USING BTREE COMMENT '订单号二级索引',
  INDEX `normal_origin_account`(`origin_account`) USING BTREE COMMENT '原账号二级索引',
  INDEX `normal_origin_account_uid`(`origin_account_uid`) USING BTREE COMMENT '原账号uid二级索引',
  INDEX `normal_new_account`(`new_account`) USING BTREE COMMENT '新账号二级索引',
  INDEX `normal_new_account_uid`(`new_account_uid`) USING BTREE COMMENT '新账号uid二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1444 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_commodity_audit_opinion
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_audit_opinion`;
CREATE TABLE `twg_commodity_audit_opinion`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品标识',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `opinion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '处理意见',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引',
  INDEX `normal_nickname`(`admin_nickname`) USING BTREE COMMENT '管理员昵称二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 17023 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_commodity_coin
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_coin`;
CREATE TABLE `twg_commodity_coin`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品表主键',
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏账号',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '角色名',
  `single_qty` int(11) NOT NULL DEFAULT 0 COMMENT '单件数量',
  `single_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '单件售价',
  `coin_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '游戏币单价',
  `stock` int(11) NOT NULL DEFAULT 1 COMMENT '库存',
  `deliver_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '发货地点',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity_equip
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_equip`;
CREATE TABLE `twg_commodity_equip`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品表主键',
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏账号',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '装备名称',
  `job` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '使用职业',
  `qty` int(11) NOT NULL DEFAULT 0 COMMENT '数量',
  `deliver_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '发货地点',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 83 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity_image
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_image`;
CREATE TABLE `twg_commodity_image`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品图片地址',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `delete_time` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_commodity_id`(`commodity_id`) USING BTREE COMMENT '商品标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 70926 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_commodity_modify_audit
-- ----------------------------
DROP TABLE IF EXISTS `twg_commodity_modify_audit`;
CREATE TABLE `twg_commodity_modify_audit`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `op_type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '操作类型(1：上架，2：下架，3：修改价格)',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品标识',
  `commodity_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '商品类型(1：账号，2：装备，3：金币)',
  `commodity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `relevant_data` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '相关数据',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：不通过，1：审核中，2：已通过)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3870 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_deposit
-- ----------------------------
DROP TABLE IF EXISTS `twg_deposit`;
CREATE TABLE `twg_deposit`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品标识',
  `commodity_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '商品类型(1：账号，2：装备，3：金币)',
  `commodity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '金额',
  `refund_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '实际退回金额',
  `channel_service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '渠道手续费',
  `device_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '设备类型',
  `pay_channel_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户所选渠道类型',
  `prepay_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '第三方支付标识',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(1：未缴纳，2：已缴纳，3：已退回，4：已封存)',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '支付时间',
  `refund_time` int(11) NOT NULL DEFAULT 0 COMMENT '退回时间',
  `forzen_time` int(11) NOT NULL DEFAULT 0 COMMENT '封存时间',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '提现状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 110 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_deposit_transfer
-- ----------------------------
DROP TABLE IF EXISTS `twg_deposit_transfer`;
CREATE TABLE `twg_deposit_transfer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '金额',
  `deposit_before_transfer` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '转入余额前的押金',
  `deposit_after_transfer` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '转入余额后的押金',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_district
-- ----------------------------
DROP TABLE IF EXISTS `twg_district`;
CREATE TABLE `twg_district`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `game_id` int(11) NOT NULL DEFAULT 0 COMMENT '游戏id',
  `district_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏大区名称',
  `is_stop` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否禁用',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_game_id`(`game_id`) USING BTREE COMMENT '游戏标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_feedback
-- ----------------------------
DROP TABLE IF EXISTS `twg_feedback`;
CREATE TABLE `twg_feedback`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '反馈标题',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '反馈内容',
  `reply` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '回复',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_frozen_funds
-- ----------------------------
DROP TABLE IF EXISTS `twg_frozen_funds`;
CREATE TABLE `twg_frozen_funds`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `amount` decimal(11, 2) NOT NULL DEFAULT 0.00 COMMENT '金额',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：封存，1：冻结中，2：已解冻，3：锁定)',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_order_num`(`order_num`) USING BTREE COMMENT '订单编号二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '冻结资金状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1686 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_game
-- ----------------------------
DROP TABLE IF EXISTS `twg_game`;
CREATE TABLE `twg_game`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `platform` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '平台名称',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏名称',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏类型',
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏描述',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：禁用，1：正常)',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_message
-- ----------------------------
DROP TABLE IF EXISTS `twg_message`;
CREATE TABLE `twg_message`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '消息类型',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '消息内容',
  `is_read` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否已读',
  `from_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '来源类型(1：系统，2：用户，3：管理员)',
  `from_uid` int(11) NOT NULL DEFAULT 0 COMMENT '来源用户标识',
  `from_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '来源用户名',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `delete_time` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_is_read`(`is_read`) USING BTREE COMMENT '是否已读二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 62819 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_message_template
-- ----------------------------
DROP TABLE IF EXISTS `twg_message_template`;
CREATE TABLE `twg_message_template`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '类型',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `has_params` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否带有参数',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_type`(`type`) USING BTREE COMMENT '站内信模板类型二级索引'
) ENGINE = MyISAM AUTO_INCREMENT = 48 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_notify
-- ----------------------------
DROP TABLE IF EXISTS `twg_notify`;
CREATE TABLE `twg_notify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '通知类型',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_type`(`type`) USING BTREE COMMENT '通知类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_notify_subscribe
-- ----------------------------
DROP TABLE IF EXISTS `twg_notify_subscribe`;
CREATE TABLE `twg_notify_subscribe`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `notify_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '通知类型',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_order
-- ----------------------------
DROP TABLE IF EXISTS `twg_order`;
CREATE TABLE `twg_order`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `purchaser_uid` int(11) NOT NULL DEFAULT 0 COMMENT '买家用户标识',
  `purchaser_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '买家用户名',
  `purchaser_order_message_count` tinyint(4) NOT NULL DEFAULT 10 COMMENT '买家剩余订单消息数',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `commodity_type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '商品类型(1：账号，2：装备，3：金币)',
  `commodity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `commodity_qty` int(11) NOT NULL DEFAULT 1 COMMENT '商品数量',
  `game_id` int(11) NOT NULL DEFAULT 0 COMMENT '游戏标识',
  `game_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '游戏名称',
  `seller_uid` int(11) NOT NULL DEFAULT 0 COMMENT '卖家用户标识',
  `seller_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '卖家用户名',
  `seller_order_message_count` tinyint(4) NOT NULL DEFAULT 10 COMMENT '卖家剩余订单消息数',
  `total_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单总价',
  `commodity_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品总价',
  `service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '手续费',
  `channel_service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '渠道手续费',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-2：已取消，-1：已超时，1：待付款，2：待发货，3：已发货，4：已收货，5：交易成功)',
  `pay_type` tinyint(4) NOT NULL DEFAULT 2 COMMENT '支付类型(1：支付宝，2：微信支付，3：银联，4：余额)',
  `device_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '设备类型',
  `pay_channel_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户所选渠道类型',
  `prepay_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '第三方支付标识',
  `refund_type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '退款类型(1：卖家责任：长期不发货，2：卖家责任：商品属性不一致，3：买家责任：无理由取消，4：平台责任：账号信息不一致，5：卖家责任：卖出后反悔)',
  `cancel_time` int(11) NOT NULL DEFAULT 0 COMMENT '取消时间',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '支付时间',
  `deliver_time` int(11) NOT NULL DEFAULT 0 COMMENT '发货时间',
  `confirm_time` int(11) NOT NULL DEFAULT 0 COMMENT '确认时间',
  `finish_time` int(11) NOT NULL DEFAULT 0 COMMENT '完成时间',
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货账号',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货角色名',
  `level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货角色等级',
  `server_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '服务器名称',
  `district_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '大区名称',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `qq` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'qq号',
  `handle_admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '最新处理管理员标识',
  `handle_admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最新处理管理员账号',
  `handle_admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最新处理管理员昵称',
  `handle_admin_opinion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '最新处理管理员意见',
  `s_year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '年(用于统计)',
  `s_month` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '月(用于统计)',
  `s_day` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '日(用于统计)',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_order_num`(`order_num`) USING BTREE COMMENT '订单编号唯一索引',
  INDEX `normal_purchaser_uid`(`purchaser_uid`) USING BTREE COMMENT '买家用户标识二级索引',
  INDEX `normal_seller_uid`(`seller_uid`) USING BTREE COMMENT '卖家用户标识二级索引',
  INDEX `normal_commodity_type`(`commodity_type`) USING BTREE COMMENT '商品类型二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '订单状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 2267 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '订单表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_order_handle_opinion
-- ----------------------------
DROP TABLE IF EXISTS `twg_order_handle_opinion`;
CREATE TABLE `twg_order_handle_opinion`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单标识',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `opinion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '处理意见',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_nickname`(`admin_nickname`) USING BTREE COMMENT '管理员昵称二级索引',
  INDEX `normal_order_id`(`order_id`) USING BTREE COMMENT '订单标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 3052 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_order_message
-- ----------------------------
DROP TABLE IF EXISTS `twg_order_message`;
CREATE TABLE `twg_order_message`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单标识',
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `from_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '来源类型(1：买家，2：卖家)',
  `purchaser_uid` int(11) NOT NULL DEFAULT 0 COMMENT '买家用户标识',
  `purchaser_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '买家用户名',
  `seller_uid` int(11) NOT NULL DEFAULT 0 COMMENT '卖家用户标识',
  `seller_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '卖家用户名',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '消息内容',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 114 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_order_prepayid_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_order_prepayid_log`;
CREATE TABLE `twg_order_prepayid_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单标识',
  `device_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '设备类型',
  `pay_channel_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户所选渠道类型',
  `prepay_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '支付标识',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_order_id`(`order_id`) USING BTREE COMMENT '订单标识二级索引',
  INDEX `normal_prepay_id`(`prepay_id`) USING BTREE COMMENT '支付标识二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 2485 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_order_refund
-- ----------------------------
DROP TABLE IF EXISTS `twg_order_refund`;
CREATE TABLE `twg_order_refund`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单标识',
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `commodity_id` int(11) NOT NULL DEFAULT 0 COMMENT '商品标识',
  `commodity_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '商品类型',
  `commodity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品标题',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `refund_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '退款类型(1：卖家责任，长期不发货、2：卖家责任，商品属性不一致、3：买家责任，无理由取消、4：平台责任)',
  `total_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单总价',
  `refund_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_order_id`(`order_id`) USING BTREE COMMENT '订单标识二级索引',
  INDEX `normal_order_num`(`order_num`) USING BTREE COMMENT '订单编号二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户账号二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_order_service_settlement
-- ----------------------------
DROP TABLE IF EXISTS `twg_order_service_settlement`;
CREATE TABLE `twg_order_service_settlement`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现金额',
  `transfer_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '转账请求id',
  `transfer_result` int(11) NOT NULL DEFAULT 2 COMMENT '转账结果:1成功；2等待',
  `withdraw_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现请求id',
  `withdraw_result` int(11) NOT NULL DEFAULT 2 COMMENT '提现结果:1成功；2等待',
  `month_start_day` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份开始日',
  `month_end_day` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份结束日',
  `month_amount_before_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现月份提现前余额',
  `month_amount_after_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现月份提现后余额',
  `year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现年份',
  `month` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(1：等待中，2：已转账，3：已提现)',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_month`(`month`) USING BTREE COMMENT '月份二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_paynow_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_paynow_log`;
CREATE TABLE `twg_paynow_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `req_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '请求id',
  `error_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '错误码',
  `error_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '错误信息',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员id',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_type`(`type`) USING BTREE COMMENT '类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1508 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_recharge
-- ----------------------------
DROP TABLE IF EXISTS `twg_recharge`;
CREATE TABLE `twg_recharge`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '充值订单编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `recharge_uid` int(11) NOT NULL DEFAULT 0 COMMENT '充值账号的用户标识',
  `recharge_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '充值账号',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '金额',
  `actual_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '实际金额',
  `channel_service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '渠道手续费',
  `device_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '设备类型',
  `pay_channel_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户所选渠道类型',
  `prepay_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '第三方支付标识',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：已超时，1：待付款，2：已付款)',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '支付时间',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_num`(`num`) USING BTREE COMMENT '充值订单号二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 836 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_sms_record
-- ----------------------------
DROP TABLE IF EXISTS `twg_sms_record`;
CREATE TABLE `twg_sms_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '短信模板类型',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '短信内容',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：失败，1：成功，2：重发成功)',
  `repeat_time` int(11) NOT NULL DEFAULT 0 COMMENT '重发时间',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `remark` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '短信备注，暂时用于财务出纳短信记录',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_phone`(`phone`) USING BTREE COMMENT '手机号二级索引',
  INDEX `normal_admin_username`(`admin_username`) USING BTREE COMMENT '管理员账号二级索引',
  INDEX `normal_admin_nickname`(`admin_nickname`) USING BTREE COMMENT '管理员昵称二级索引',
  INDEX `normal_remark`(`remark`) USING BTREE COMMENT 'remark的索引'
) ENGINE = InnoDB AUTO_INCREMENT = 16008 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_sms_template
-- ----------------------------
DROP TABLE IF EXISTS `twg_sms_template`;
CREATE TABLE `twg_sms_template`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '类型',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `has_params` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否带有参数',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_type`(`type`) USING BTREE COMMENT '短信模板类型二级索引'
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_system_config
-- ----------------------------
DROP TABLE IF EXISTS `twg_system_config`;
CREATE TABLE `twg_system_config`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '键',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '值',
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型',
  `desc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '描述',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_third_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_third_log`;
CREATE TABLE `twg_third_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作类型',
  `request_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '请求数据',
  `response_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '响应数据',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ip地址',
  `remark` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_op_type`(`type`) USING BTREE COMMENT '操作类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_user
-- ----------------------------
DROP TABLE IF EXISTS `twg_user`;
CREATE TABLE `twg_user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `register_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '注册类型(1：手机号，2：微信，3：qq)',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `withdraw_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现密码',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `open_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '公众号openid',
  `nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `app_open_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '小程序openid',
  `union_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开放平台unionid',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像地址',
  `idcard_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `idcard_num` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证号',
  `idcard_startdate` date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限(开始)',
  `idcard_enddate` date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限(结束)',
  `idcard_front_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证图片(正面)',
  `idcard_front_img_pid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证图片正面pid(用于现在支付)',
  `idcard_back_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证图片(反面)',
  `idcard_back_img_pid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证图片反面pid(用于现在支付)',
  `seller_certification` tinyint(4) NOT NULL DEFAULT -1 COMMENT '卖家认证（-1：未认证，1：已认证）',
  `purchaser_certification` tinyint(4) NOT NULL DEFAULT -1 COMMENT '买家认证（-1：未认证，1：已认证）',
  `bank_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行',
  `bank_province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行省',
  `bank_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行市',
  `bank_area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行区',
  `bank_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行账户',
  `bank_account_holder` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户人姓名',
  `bank_account_phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行预留手机号',
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '聚合账户的id',
  `bank_virtual_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '现在支付虚拟银行账户',
  `is_binding_bank` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '虚拟银行是否已经绑定实体银行;1:已绑定;0:没绑定',
  `purchase_count` int(11) NOT NULL DEFAULT 0 COMMENT '买家成交数',
  `sell_count` int(11) NOT NULL DEFAULT 0 COMMENT '卖家成交数',
  `balance` decimal(11, 2) NOT NULL DEFAULT 0.00 COMMENT '余额',
  `frozen_funds` decimal(11, 2) NOT NULL DEFAULT 0.00 COMMENT '冻结资金',
  `deposit` decimal(11, 2) NOT NULL DEFAULT 0.00 COMMENT '押金',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1：禁用，1：正常)',
  `last_login_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后登录时间',
  `reg_time` int(11) NOT NULL DEFAULT 0 COMMENT '注册时间',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_register_type`(`register_type`) USING BTREE COMMENT '注册类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 111423 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_user_log
-- ----------------------------
DROP TABLE IF EXISTS `twg_user_log`;
CREATE TABLE `twg_user_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `type` smallint(6) NOT NULL DEFAULT 0 COMMENT '操作类型',
  `request_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '请求数据',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'ip地址',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_op_type`(`type`) USING BTREE COMMENT '操作类型二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 70634 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_wallet
-- ----------------------------
DROP TABLE IF EXISTS `twg_wallet`;
CREATE TABLE `twg_wallet`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `cumulative_recharge` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '充值累计',
  `cumulative_income` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收入累计',
  `cumulative_expenditure` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支出累计',
  `cumulative_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现累计',
  `cumulative_deposit` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '押金累计',
  `current_balance` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '当前余额',
  `current_deposit` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '当前押金',
  `current_frozen` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '当前冻结资金',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11423 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for twg_withdraw
-- ----------------------------
DROP TABLE IF EXISTS `twg_withdraw`;
CREATE TABLE `twg_withdraw`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '编号',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `bank_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行名称',
  `bank_province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行省',
  `bank_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行市',
  `bank_area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户银行区',
  `bank_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '银行账户',
  `bank_account_holder` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开户人姓名',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现金额',
  `service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现手续费',
  `platform_service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '平台提现手续费',
  `paynow_service_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '现在支付提现手续费',
  `actual_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现实际金额',
  `cumulative_order_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计订单成交金额',
  `cumulative_deposit_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计押金成交金额',
  `cumulative_recharge_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计充值成交金额',
  `cumulative_withdraw_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计提现成功金额',
  `balance_before_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现前的余额',
  `balance_after_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现后的余额',
  `transfer_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '转账请求id',
  `transfer_result` int(11) NOT NULL DEFAULT 2 COMMENT '转账结果:1成功；2等待',
  `withdraw_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现请求id',
  `withdraw_result` int(11) NOT NULL DEFAULT 2 COMMENT '提现结果:1成功；2等待',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1，未通过，1：审核中，2：已通过，3：已提现)',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_uid`(`uid`) USING BTREE COMMENT '用户标识二级索引',
  INDEX `normal_username`(`username`) USING BTREE COMMENT '用户名二级索引',
  INDEX `normal_status`(`status`) USING BTREE COMMENT '提现状态二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1516 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for twg_withdraw_service_settlement
-- ----------------------------
DROP TABLE IF EXISTS `twg_withdraw_service_settlement`;
CREATE TABLE `twg_withdraw_service_settlement`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现金额',
  `transfer_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '转账请求id',
  `transfer_result` int(11) NOT NULL DEFAULT 2 COMMENT '转账结果:1成功；2等待',
  `withdraw_req_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现请求id',
  `withdraw_result` int(11) NOT NULL DEFAULT 2 COMMENT '提现结果:1成功；2等待',
  `month_start_day` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份开始日',
  `month_end_day` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份结束日',
  `month_amount_before_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现月份提现前余额',
  `month_amount_after_withdraw` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现月份提现后余额',
  `year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现年份',
  `month` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '提现月份',
  `admin_id` int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
  `admin_username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(1：等待中，2：已转账，3：已提现)',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `normal_month`(`month`) USING BTREE COMMENT '月份二级索引'
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;

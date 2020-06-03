// 用户
exports.user = `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    pass VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(100) NOT NULL COMMENT '头像',
    moment VARCHAR(100) NOT NULL COMMENT '注册时间',
    PRIMARY KEY ( id )
   );`

// 实名认证
exports.certification = `create table if not exists certification(
      id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
      type tinyint(4) NOT NULL DEFAULT 2 COMMENT '认证类型（1：买家认证；2：卖家认证）',
      uid int(11) NOT NULL DEFAULT 0 COMMENT '用户标识',
      username varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
      idcard_name varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '姓名',
      idcard_code varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证号',
      idcard_startdate date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限（开始）',
      idcard_enddate date NOT NULL DEFAULT '1970-01-01' COMMENT '有效期限(结束)',
      idcard_front_img varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证正面图片',
      idcard_front_img_pid varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      idcard_front_img_req_id varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      idcard_back_img varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证反面图片',
      idcard_back_img_pid varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      idcard_back_img_req_id varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      idcard_reg_account_req_id varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      status tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态(-1，未通过，1：审核中，2：已通过)',
      admin_id int(11) NOT NULL DEFAULT 0 COMMENT '管理员标识',
      admin_username varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
      admin_nickname varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '管理员昵称',
      remark text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
      create_time int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
      update_time int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
      PRIMARY KEY (id) USING BTREE,
      INDEX normal_uid(uid) USING BTREE COMMENT '用户标识二级索引',
      INDEX normal_username(username) USING BTREE COMMENT '用户名二级索引',
      INDEX normal_status(status) USING BTREE COMMENT '审核状态二级索引'
    );`

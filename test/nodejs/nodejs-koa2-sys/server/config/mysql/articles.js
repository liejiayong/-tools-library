/**
 * 文章
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test11', 'test11 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test12', 'test12 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (2,'test13', 'test13 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (2,'test14', 'test14 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (3,'test15', 'test15 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (3,'test16', 'test16 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test17', 'test17 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test18', 'test18 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test19', 'test19 content', 1, 0,0,0,0);
insert into `jy_blog_articles`(`user_id`,`title`, `content`, `stat`, `views`, `comment_count`, `like_count`, `collect_count`) values (1,'test20', 'test20 content', 1, 0,0,0,0);

 */
exports.articles = `CREATE TABLE IF NOT EXISTS \`jy_blog_articles\`(
    \`id\` bigint(255) NOT NULL AUTO_INCREMENT COMMENT '博文ID',
    \`user_id\` int(11) UNSIGNED NOT NULL COMMENT '发表用户ID',
    \`title\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文标题',
    \`content\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文内容',
    \`views\` bigint(20) NOT NULL DEFAULT 0 COMMENT '浏览量',
    \`comment_count\` bigint(20) NOT NULL DEFAULT 0 COMMENT '评论总数',
    \`like_count\` bigint(20) NOT NULL DEFAULT 0 COMMENT '点赞数',
    \`collect_count\` bigint(20) NOT NULL DEFAULT 0 COMMENT '收藏数',
    \`tags\` varchar(255) NOT NULL DEFAULT '' COMMENT '标签',
    \`category\` varchar(255) NOT NULL DEFAULT '' COMMENT '分类',
    \`stat\` int(2) NOT NULL DEFAULT 1 COMMENT '文章状态。0：删除；1：发布状态；2：审核状态',
    \`create_date\` DATETIME NULL DEFAULT NULL COMMENT '发表时间',
    \`update_date\` DATETIME NULL DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (\`id\`) USING BTREE,
    INDEX \`user_id\`(\`user_id\`) USING BTREE,
    CONSTRAINT \`fk_user_id_articles\` FOREIGN KEY (\`user_id\`) REFERENCES \`jy_blog_users\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
);`

/**
 * @description: 文章草稿
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 15:10:51
 */
exports.articlesDraft = `CREATE TABLE IF NOT EXISTS \`jy_blog_articles_draft\`(
    \`id\` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章草稿ID',
    \`postId\` int(11) DEFAULT NULL,
    \`title\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文标题',
    \`content\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文内容',
    \`poster\` varchar(200) NOT NULL COMMENT '发表用户ID',
    \`categoryId\` int(11) DEFAULT NULL,
    \`tags\` varchar(200) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

/**
 * 评论
 
    下面写法会报错，原因待查究： 809206619@qq.com 20200801 10：00
    // CONSTRAINT \`fk_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`jy_blog_users\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    // CONSTRAINT \`fk_article_id\` FOREIGN KEY (\`article_id\`) REFERENCES \`jy_blog_articles\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
    解析： fk_user_id 存在于users表，外键符号不能重复。
    
 */
exports.comment = `CREATE TABLE IF NOT EXISTS \`jy_blog_comments\`(
    \`id\` bigint(255) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
    \`user_id\` int(11) UNSIGNED NOT NULL COMMENT '评论用户ID',
    \`article_id\` bigint(255) NOT NULL COMMENT '评论博文ID',
    \`avatar\` VARCHAR(100) NOT NULL COMMENT '评论用户头像',
    \`like_count\` bigint(20) NOT NULL COMMENT '点赞数',
    \`collect_count\` bigint(20) NOT NULL COMMENT '收藏数',
    \`stat\` int(2) NOT NULL COMMENT '文章状态。0：删除；1：正常默认',
    \`is_edit\` int(2) NOT NULL COMMENT '文章是否可编辑。0：不可编辑；1：可编辑',
    \`date\` DATETIME NULL DEFAULT NULL COMMENT '评论日期',
    \`content\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
    \`parent_id\` bigint(20) NOT NULL COMMENT '父评论ID',
    PRIMARY KEY (\`id\`) USING BTREE,
    INDEX \`article_id\`(\`article_id\`) USING BTREE,
    INDEX \`date\`(\`date\`) USING BTREE,
    INDEX \`parent_id\`(\`parent_id\`) USING BTREE,
    CONSTRAINT \`fk_user_id_comment\` FOREIGN KEY (\`user_id\`) REFERENCES \`jy_blog_users\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT \`fk_article_id_comment\` FOREIGN KEY (\`article_id\`) REFERENCES \`jy_blog_articles\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
);`

/**
 * @description: 标签
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 14:48:19
    insert  into `jy_blog_tag`(`id`,`name`) values (1,'Vue.js');
    insert  into `jy_blog_tag`(`id`,`name`) values (2,'Vuex');
    insert  into `jy_blog_tag`(`id`,`name`) values (3,'webapp');
    insert  into `jy_blog_tag`(`id`,`name`) values (4,'模态框');
    insert  into `jy_blog_tag`(`id`,`name`) values (5,'promise');
    insert  into `jy_blog_tag`(`id`,`name`) values (6,'Node.js');
    insert  into `jy_blog_tag`(`id`,`name`) values (7,'Canvas');
    insert  into `jy_blog_tag`(`id`,`name`) values (8,'Socket.IO');
    insert  into `jy_blog_tag`(`id`,`name`) values (9,'网页爬虫');
    insert  into `jy_blog_tag`(`id`,`name`) values (10,'GitHub');
    insert  into `jy_blog_tag`(`id`,`name`) values (11,'nginx');
    insert  into `jy_blog_tag`(`id`,`name`) values (12,'域名');
    insert  into `jy_blog_tag`(`id`,`name`) values (13,'微信小程序');
    insert  into `jy_blog_tag`(`id`,`name`) values (25,'路由');
    insert  into `jy_blog_tag`(`id`,`name`) values (26,'组件化');
    insert  into `jy_blog_tag`(`id`,`name`) values (27,'UI');
    insert  into `jy_blog_tag`(`id`,`name`) values (28,'Koa.js');
    insert  into `jy_blog_tag`(`id`,`name`) values (29,'JWT');
    insert  into `jy_blog_tag`(`id`,`name`) values (30,'博客');
    insert  into `jy_blog_tag`(`id`,`name`) values (31,'Nuxt.js');
    insert  into `jy_blog_tag`(`id`,`name`) values (32,'WebSocket');
    insert  into `jy_blog_tag`(`id`,`name`) values (33,'Redis');
    insert  into `jy_blog_tag`(`id`,`name`) values (34,'MySQL');
    insert  into `jy_blog_tag`(`id`,`name`) values (35,'实时保存');
 */
exports.tag = `CREATE TABLE IF NOT EXISTS \`jy_blog_tag\`(
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`name\` varchar(100) DEFAULT NULL COMMENT '标签名称',
    PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COMMENT='标签表';`

/**
 * @description: 文章-标签对应表
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 14:50:56
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (11,7,13);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (23,15,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (24,15,26);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (25,15,27);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (26,16,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (27,16,28);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (28,16,29);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (29,16,30);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (30,14,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (31,14,13);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (32,14,25);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (36,2,4);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (37,2,5);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (38,2,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (39,3,8);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (40,3,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (41,3,7);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (42,6,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (43,6,11);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (44,6,12);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (49,4,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (50,4,9);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (56,17,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (57,17,31);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (58,17,28);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (59,17,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (60,17,30);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (74,1,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (75,1,2);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (76,1,3);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (77,5,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (78,5,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (79,5,10);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (80,5,9);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (81,19,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (82,20,2);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (83,21,2);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (84,21,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (85,22,2);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (86,22,6);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (87,23,2);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (88,24,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (89,25,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (90,18,1);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (91,18,32);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (92,18,33);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (93,18,34);
    insert  into `jy_blog_post_tag`(`id`,`postId`,`tagId`) values (94,18,35);

 */
exports.postTag = `CREATE TABLE IF NOT EXISTS \`jy_blog_post_tag\`(
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`postId\` int(11) NOT NULL COMMENT '文章表主键',
    \`tagId\` int(11) NOT NULL COMMENT '标签表主键',
    PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COMMENT='文章-标签对应表';`

/**
 * @description: 文章分类表
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 15:02:04
insert  into `jy_blog_category`(`id`,`name`) values (1,'项目实战');
insert  into `jy_blog_category`(`id`,`name`) values (2,'经验分享');
insert  into `jy_blog_category`(`id`,`name`) values (10,'测试');
 */
exports.postTag = `CREATE TABLE IF NOT EXISTS \`jy_blog_category\`(
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`name\` varchar(100) DEFAULT NULL COMMENT '文章分类名称',
    PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='文章分类表';`

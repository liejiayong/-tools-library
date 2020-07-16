/**
 * 文章
 */
exports.articles = `CREATE TABLE IF NOT EXISTS \`jy_blog_articles\`(
    \`id\` bigint(255) NOT NULL AUTO_INCREMENT COMMENT '博文ID',
    \`user_id\` INT NOT NULL COMMENT '发表用户ID',
    \`title\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文标题',
    \`content\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博文内容',
    \`views\` bigint(20) NOT NULL COMMENT '浏览量',
    \`comment_count\` bigint(20) NOT NULL COMMENT '评论总数',
    \`like_count\` bigint(20) NOT NULL COMMENT '点赞数',
    \`collect_count\` bigint(20) NOT NULL COMMENT '收藏数',
    \`stat\` int(2) NOT NULL COMMENT '文章状态。0：删除；1：正常默认',
    \`create_date\` int(11) NULL DEFAULT NULL COMMENT '发表时间',
    \`update_date\` int(11) NULL DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (\`id\`) USING BTREE,
    INDEX \`user_id\`(\`user_id\`) USING BTREE,
    CONSTRAINT \`fk_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`jy_blog_users\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
    );`

/**
 * 评论
 */
exports.comment = `CREATE TABLE IF NOT EXISTS \`jy_blog_comments\`(
    \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
    \`user_id\` INT NOT NULL COMMENT '评论用户ID',
    \`article_id\` bigint(20) NOT NULL COMMENT '评论博文ID',
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
    INDEX \`parent_id\`(\`parent_id\`) USING BTREE
  );`

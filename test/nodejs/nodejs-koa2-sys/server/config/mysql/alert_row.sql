// 更新jy_blog_articles字段与定义
AlTER TABLE `jy_blog_articles` MODIFY `views` bigint(20) NOT NULL  DEFAULT 0  COMMENT '文章浏览量'
,MODIFY `comment_count`  bigint(20) NOT NULL DEFAULT 0 COMMENT '评论总数'
,MODIFY `like_count` bigint(20) NOT NULL DEFAULT 0 COMMENT '点赞数'
,MODIFY `collect_count` bigint(20) NOT NULL DEFAULT 0 COMMENT '收藏数'
,MODIFY `stat` int(2) NOT NULL DEFAULT 1 COMMENT '文章状态。0：删除；1：发布状态；2：审核状态';
AlTER TABLE `jy_blog_articles` ADD `tags` varchar(255) NOT NULL DEFAULT '' COMMENT '标签'
,ADD `category` varchar(255) NOT NULL DEFAULT '' COMMENT '分类';

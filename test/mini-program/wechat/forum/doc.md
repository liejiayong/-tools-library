## 贪玩资讯小程序需求

### 逻辑说明

#### 圈子模块

##### 圈子发表评论

+ title
+ content
+ 圈子id 、圈子name
+ uploadImage

##### 圈子评论
+ rolename
+ rolenameid
+ reply_nickname
+ reply_id
+ content

其中，一级评论可以传图，一级一下评论只能发表文字

### 项目结构v3.0.0
简称：p-page，c-component

    <!-- 项目分支结构 -->
    贪玩游戏资讯模块
    |--登录模块
      |--pages/login/login --- 登录授权页-p
    |--游戏资讯模块
      |--pages/new-post/new-post --- 游戏资讯首页-p
        |--pages/game-post-classify/game-post-classify --- 游戏资讯游戏分类资讯页-p
        |--pages/game-detail/game-detail --- 游戏资讯详情页-p
        |--pages/video-classify/video-classify --- 视频热门标签页-p
        |--pages/video-detail/video-detail --- 视频详情页-p
    |--论坛模块
      |--pages/community-post/community-post --- 论坛首页-p
      |--pages/community-post-classify/community-post-classify --- 论坛圈子分类资讯页-p
      |--pages/community-tab-classify/community-tab-classify --- 论坛圈子菜单页-p
      |--pages/community-detail/community-detail --- 论坛详情页-p
      |--pages/community-post-msg/community-post-msg --- 论坛发帖页-p
      |--pages/community-detail/input-reply-comment/input-reply-comment --- 论坛回复帖子页-p
      |--pages/community-detail/community-comment-info/community-comment-info --- 论坛查看更多帖子页-p
    |--用户中心
      |--pages/account-center/account-center --- 用户中心首页-p
      |--pages/account-center/user-home/user-home --- 用户个人中心页-p
      |--pages/account-center/user-comment/user-comment --- 用户评论页-p
      |--pages/account-center/user-get-praise/user-get-praise --- 用户获赞页-p
      |--pages/account-center/user-focus/user-focus --- 用户关注页-p
      |--pages/account-center/user-fans/user-fans --- 用户粉丝页-p
      |--pages/account-center/user-post/user-post --- 用户我的帖子页-p
      |--pages/account-center/user-collection/user-collection --- 用户我的收藏页-p
      |--pages/account-center/user-medal/user-medal --- 用户我的勋章页-p
    |--关于贪玩
      |--pages/about-tw/about-tw --- 关于贪玩-p

## version

### v3.1.0

- 更新基础版本库为v2.9.4，新增丝滑滚动
- 更新视频插件为v3.3.7，播放更流畅了
- 优化下拉刷新体验
- 更新上传图片接口
- 增加ios流畅体验

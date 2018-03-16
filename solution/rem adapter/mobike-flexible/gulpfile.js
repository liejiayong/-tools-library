const gulp = require('gulp'); //获取gulp
const sass = require('gulp-sass');  //获取gulp
const browsersync = require('browser-sync').create(); //获取browsersync
const cssnano = require('gulp-cssnano'); //css压缩插件

//操作css文件
gulp.task('style', function() {
    gulp.src('./common/index.scss')  //需要编译scss的文件
    .pipe(sass({outputStyle: 'compressed'})   //压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
    .on('error', sass.logError))
    .pipe(cssnano())                 //css压缩
    .pipe(gulp.dest('./common/css'))    //输出路径
    .pipe(browsersync.stream());    //文件有更新自动执行
});

//监听scss文件
gulp.task('serve',function() {
    gulp.start('style');
    gulp.watch('./common/index.scss', ['style']);
});

//编译scss文件：gulp default
gulp.task('default',['serve']);
const gulp = require('gulp'); //获取gulp
const sass = require('gulp-sass');  //获取gulp
const browsersync = require('browser-sync').create(); //获取browsersync
const cssnano = require('gulp-cssnano'); //css压缩插件
const merge = require('merge-stream');

//操作css文件
/**
 *  如果是一个任务处理多文件夹的话，
 *  只要声明不同的变量，
 *  然后return merge(xx, xx)合并返回即可
 *  如下 style 任务
 */
gulp.task('style', function() {
    const scssIndex = gulp.src('./common/scss/*.scss')  //需要编译scss的文件
    .pipe(sass({outputStyle: 'compressed'})   //压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
    .on('error', sass.logError))
    .pipe(cssnano())                 //css压缩
    .pipe(gulp.dest('./common/css'))    //输出路径
    .pipe(browsersync.stream());    //文件有更新自动执行

    const scssComponents = gulp.src('./common/components-scss/*.scss')  //需要编译scss的文件
    .pipe(sass({outputStyle: 'compressed'})   //压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
    .on('error', sass.logError))
    .pipe(cssnano())                 //css压缩
    .pipe(gulp.dest('./common/components-css'))    //输出路径
    .pipe(browsersync.stream());    //文件有更新自动执行
    return merge(scssIndex, scssComponents);
});

//监听scss文件
gulp.task('serve',function() {
    gulp.start('style');
    gulp.watch('./common/scss/*.scss', ['style']);
    gulp.watch('./common/components-scss/*.scss', ['style']);
});

//编译scss文件：gulp default
gulp.task('default',['serve']);
const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('imagemin'); // 图片压缩
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

// 操作css文件
/**
 *  如果是一个任务处理多文件夹的话，
 *  只要声明不同的变量，
 *  然后return merge(xx, xx)合并返回即可
 *  如下 style 任务
 */
gulp.task('style', function() {
  const scssIndex = gulp
    .src('scss/*.scss') // 需要编译scss的文件
    .pipe(
      sass({ outputStyle: 'compact' }) // 压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
        .on('error', sass.logError)
    )
    .pipe(cssnano()) // css压缩
    .pipe(gulp.dest('src/css')) // 输出路径
    .pipe(browsersync.stream()); // 文件有更新自动执行

  const scssComponents = gulp
    .src('scss/scss-components/*.scss') // 需要编译scss的文件
    .pipe(
      sass({ outputStyle: 'compact' }) // 压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
        .on('error', sass.logError)
    )
    .pipe(cssnano()) // css压缩
    .pipe(gulp.dest('src/css/css-components')) // 输出路径
    .pipe(browsersync.stream()); // 文件有更新自动执行
  return merge(scssIndex, scssComponents);
});

//监听scss文件
gulp.task('serve', function() {
  gulp.start('style');
  gulp.watch('scss/*.scss', ['style']);
});

// gulp雪碧图插件：根据图片导出图路径
const baseUrl = '';
const imgUrl = `${baseUrl}`;
const IMG_TYPE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'tif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF'];
function setImgType(src = '', typeList = []) {
  if (!src.length) return;
  let type = '';
  typeList.forEach(t => {
    if (src.lastIndexOf(t) > -1) {
      type = t;
    }
  });
  return `.${type}`;
}

gulp.task('spritejs', function() {
  gulp
    .src('src/img/*')
    .pipe(
      spritesmith({
        imgName: 'sprite.png',
        imgPath: 'sp.png',
        cssName: 'imgList.js',
        cssTemplate: data => {
          const imgList = [];
          data.sprites.forEach(function(sprite) {
            const source = sprite.source_image;
            const name = sprite.name;
            const ext = setImgType(source, IMG_TYPE);
            imgList.push(imgUrl + name + ext);
            // console.log(sprite, '---->', imgList)
          });

          const IMG_LIST = 'var IMGLIST =' + JSON.stringify(imgList) + ';';
          return IMG_LIST;
        }
      })
    )
    .pipe(gulp.dest('js'));
});
gulp.task('spritecss', function() {
  gulp
    .src('src/img/*')
    .pipe(
      spritesmith({
        imgName: 'skill-sprite.png', //保存合并后图片的地址
        cssName: 'skill-sprite.css', //保存合并后对于css样式的地址
        padding: 5, //合并时两个图片的间距
        algorithm: 'binary-tree', //注释1
        cssTemplate: function(data) {
          var arr = [];
          data.sprites.forEach(function(sprite) {
            arr.push('.' + sprite.name + '{' + "background-image: url('../img/" + sprite.escaped_image + "');" + 'background-position: ' + sprite.px.offset_x + ' ' + sprite.px.offset_y + ';' + 'width:' + sprite.px.width + ';' + 'height:' + sprite.px.height + ';' + '}\n');
          });
          return arr.join('');
        }
      })
    )
    .pipe(gulp.dest('js'));
});

//编译scss文件：gulp default
gulp.task('default', ['spritejs', 'spritecss', 'serve']);

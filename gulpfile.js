var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    gutil = require('gutils'),
    concat = require('gulp-concat');


//static server
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    notify:false,
    server:{
      baseDir:'./'
    }
  })
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

//sass
gulp.task('sass', function(){
  return gulp.src("./src/sass/**/*.scss")
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
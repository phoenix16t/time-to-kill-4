var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');

var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/dist/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('./public/js/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./public/dist/'))
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('js', ['scripts', 'reload']);

gulp.task('start-client', function() {
    browserSync.init({
        server: "./public"
    });
});

gulp.task('start-server', function() {
  nodemon({script: './server.js'})
    .on('restart', function() {
      console.log('nodemon restarted');
    });
});

gulp.task('watch', function() {
  watch('./public/js/**/*.js', function() {
    gulp.start('js');
  });

  watch('./public/scss/*.scss', function() {
    gulp.start('sass');
  });

  watch('./public/*.html', function() {
    gulp.start('reload');
  });
});

gulp.task('default', ['start-server', 'scripts', 'sass', 'start-client', 'watch']);

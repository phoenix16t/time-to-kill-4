var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('./client/scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./client/dist/'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src('./client/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src('./client/js/script.js', { read: false })
    .pipe(browserify())
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./client/dist/'));
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('js', ['lint', 'scripts'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('start-client', ['sass', 'lint', 'scripts'], function() {
    browserSync.init({
        server: "./client"
    });
});

gulp.task('start-server', function() {
  nodemon({script: './server/'})
    .on('restart', function() {
      console.log('nodemon restarted');
    });
});

gulp.task('watch', function() {

  watch('./client/js/*.js', function() {
    gulp.start('js');
  });

  watch('./client/scss/*.scss', function() {
    gulp.start('sass');
  });

  watch('./client/*.html', function() {
    gulp.start('reload');
  });
});

gulp.task('default', ['start-client', 'start-server', 'watch']);
// gulp.task('build', ['sass', 'lint', 'scripts', 'watch']);

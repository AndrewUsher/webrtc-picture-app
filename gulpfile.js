const gulp = require('gulp');
const babel = require('gulp-babel');
const stylus = require('gulp-stylus');
var htmlmin = require('gulp-htmlmin');

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('docs'));
});

gulp.task('js', function () {
  return gulp.src('src/main.js')
    .pipe(babel({
      comments: false,
      minified: true
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('css', function () {
  return gulp.src('src/style.styl')
    .pipe(stylus({
      compress: true,
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.styl', ['css'])
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/*.js', ['js'])
});

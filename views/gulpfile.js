var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
// var less = require('gulp-less');
// var changed = require('gulp-changed');
// var watch = require('gulp-watch');
var htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css',['clean'], function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('jsUglify',['clean'], function() {
  return gulp.src('js/*.js')
    //.pipe(concat('vendor.js'))
    //.pipe(gulp.dest('dist'))
    .pipe(filesize())
    .pipe(uglify())
    //.pipe(rename('perfMatters.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(filesize())
    .on('error', gutil.log)
});


gulp.task('imagesMin', ['clean'], function() {
  return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
gulp.task('minify',['clean'], function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
gulp.task('default', ['clean', 'jsUglify','minify','imagesMin','minify-css'], function() {

});
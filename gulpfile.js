'use strict';

const cleanCSS = require('gulp-clean-css');
const flatten = require('gulp-flatten');
const gulp = require('gulp');
const mergeJSON = require('gulp-merge-json');
const mustache = require('gulp-mustache');
const sass = require('gulp-sass');

gulp.task('compile-mustache', function () {
  return gulp
    .src('build/*.mustache')
    .pipe(mustache(
      'build/index.json',
      { extension: '.html' },
      {}
    ))
    .pipe(gulp.dest('.'));
});

gulp.task('compile-sass', function () {
  return gulp
    .src('src/styles/index.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('.'));
});

gulp.task('serve-views', function () {
  return gulp
    .src(['src/views/*/*.mustache'])
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest('build'));
});

gulp.task('serve-json', function () {
  return gulp
    .src('src/**/*.json')
    .pipe(mergeJSON({
      fileName: 'index.json'
    }))
    .pipe(gulp.dest('build'));
});

const build = gulp.parallel('compile-mustache', 'compile-sass');
const serve = gulp.parallel('serve-views', 'serve-json');
const start = gulp.series(serve, build);

gulp.task('build', build);
gulp.task('serve', serve);
gulp.task('default', start);
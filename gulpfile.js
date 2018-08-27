'use strict';

const flatten = require('gulp-flatten');
const gulp = require('gulp');
const mergeJSON = require('gulp-merge-json');
const mustache = require('gulp-mustache');

gulp.task('compile-mustache', function () {
  return gulp
    .src('build/*.mustache')
    .pipe(mustache(
      'build/index.json',
      { extension: '.html' },
      {}
    ))
    .pipe(gulp.dest('public'))
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
    .pipe(gulp.dest('build'))
});

const build = gulp.parallel('compile-mustache');
const serve = gulp.parallel('serve-views', 'serve-json');
const start = gulp.series(serve, build);

gulp.task('build', build);
gulp.task('serve', serve);
gulp.task('default', start);
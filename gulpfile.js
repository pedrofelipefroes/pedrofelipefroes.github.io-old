'use strict';

const cleanDir = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const flatten = require('gulp-flatten');
const gulp = require('gulp');
const mergeJSON = require('gulp-merge-json');
const mustache = require('gulp-mustache');
const sass = require('gulp-sass');

gulp.task('clean', function () {
  return gulp
    .src(['build/', 'work/', '*.html', '*.css'], { allowEmpty: true, read: false })
    .pipe(cleanDir());
})

gulp.task('compile-mustache', function () {
  return gulp
    .src('build/**/*.mustache')
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

gulp.task('serve-index', function () {
  return gulp
    .src('src/index.mustache')
    .pipe(gulp.dest('build'));
})

gulp.task('serve-views', function () {
  return gulp
    .src(['src/views/*/*.mustache'])
    .pipe(flatten({ newPath: 'work/' }))
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

const clean = gulp.parallel('clean');
const build = gulp.parallel('compile-mustache', 'compile-sass');
const serve = gulp.parallel('serve-index', 'serve-views', 'serve-json');
const start = gulp.series(clean, serve, build);

gulp.task('default', start);
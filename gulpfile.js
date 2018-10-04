"use strict";

const cleanDir = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");
const flatten = require("gulp-flatten");
const gulp = require("gulp");
const livereload = require("gulp-livereload");
const mergeJSON = require("gulp-merge-json");
const mustache = require("gulp-mustache");
const sass = require("gulp-sass");

gulp.task("clean", function() {
	return gulp
		.src(["build/", "work/", "img/", "*.html", "*.css"], {
			allowEmpty: true,
			read: false
		})
		.pipe(cleanDir());
});

gulp.task("compile-mustache", function() {
	return gulp
		.src("build/**/*.mustache")
		.pipe(
			mustache(
				"build/index.json",
				{
					extension: ".html"
				},
				{}
			)
		)
		.pipe(gulp.dest("."))
		.pipe(livereload());
});

gulp.task("compile-sass", function() {
	return gulp
		.src("src/styles/index.scss")
		.pipe(
			sass({
				errLogToConsole: true
			})
		)
		.pipe(cleanCSS())
		.pipe(gulp.dest("."))
		.pipe(livereload());
});

gulp.task("serve-index", function() {
	return gulp.src("src/index.mustache").pipe(gulp.dest("build"));
});

gulp.task("serve-img", function() {
	return gulp
		.src(["src/img/**/*"])
		.pipe(
			flatten({
				includeParents: -1
			})
		)
		.pipe(gulp.dest("img"));
});

gulp.task("serve-views-img", function() {
	return gulp
		.src([
			"src/views/**/*.jpg",
			"src/views/**/*.png",
			"src/views/**/*.gif",
			"src/views/**/*.svg"
		])
		.pipe(
			flatten({
				subPath: [-2, -1]
			})
		)
		.pipe(gulp.dest("work"));
});

gulp.task("serve-views", function() {
	return gulp
		.src(["src/views/*/*.mustache"])
		.pipe(
			flatten({
				newPath: "work/",
				includeParents: -1
			})
		)
		.pipe(gulp.dest("build"));
});

gulp.task("serve-json", function() {
	return gulp
		.src("src/**/*.json")
		.pipe(
			mergeJSON({
				fileName: "index.json"
			})
		)
		.pipe(gulp.dest("build"));
});

gulp.task("watch-sass", function() {
	livereload.listen();
	gulp.watch("src/**/*.scss", gulp.series("compile-sass"));
});

gulp.task("watch-mustache", function() {
	livereload.listen();
	gulp.watch("src/**/*.mustache", gulp.series("compile-mustache"));
});

const clean = gulp.parallel("clean");
const build = gulp.parallel("compile-mustache", "compile-sass");
const serve = gulp.parallel(
	"serve-index",
	"serve-img",
	"serve-views-img",
	"serve-views",
	"serve-json"
);
const watch = gulp.parallel("watch-mustache", "watch-sass");
const start = gulp.series(clean, serve, build, watch);

gulp.task("default", start);

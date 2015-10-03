'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var inject = require('gulp-inject');
var useref = require('gulp-useref');

gulp.task('clean', function() {
	del(['public']);
});

gulp.task('copy:js', function() {
	return gulp.src('app/js/**/*')
	.pipe(gulp.dest('public/js'));
});

gulp.task('copy:html', function() {
	return gulp.src('app/partials/**/*')
	.pipe(gulp.dest('public/partials'));
});

gulp.task('copy', ['copy:js','copy:html']);

gulp.task('js', function () {
  var target = gulp.src('index.html',{cwd:'app'});
  var sources = gulp.src(['**/*.js'], {cwd:'app',read: false});
  var wiredep = require('wiredep').stream;
  var assets = useref.assets();
 
  return target.pipe(inject(sources))
    .pipe(wiredep())
 	.pipe(assets)
 	.pipe(assets.restore())
 	.pipe(useref())
    .pipe(gulp.dest('public'));
});

gulp.task('serve', ['js','copy'], function() {
	connect.server({
		root: 'public',
		fallback: 'public/index.html'
	});
});
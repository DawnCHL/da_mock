var gulp = require('gulp');
var shell = require('gulp-shell');
var _ = require('underscore');
var FLOW = 'flow'

gulp.task('flow', shell.task(_.template(FLOW)()))
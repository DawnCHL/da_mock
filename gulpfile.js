const gulp = require('gulp');
const babel = require('gulp-babel');
const sequence = require('run-sequence');

require('./task/clean.js');
require('./task/babel.js');

gulp.task('dev', function () {
  return sequence('clean', 'babel1', 'babel2');
});

gulp.task('default', ['dev']);
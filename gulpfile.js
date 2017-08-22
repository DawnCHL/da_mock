const gulp = require('gulp');
const babel = require('gulp-babel');
const sequence = require('run-sequence');

require('./task/clean.js');
require('./task/copy.js');
require('./task/babel.js');
require('./task/webpack.js');
require('./task/flow.js');

gulp.task('dev', function () {
  return sequence('clean','copy', 'babel1', 'babel2','flow','webpack-dev');
});

gulp.task('prod', function () {
  return sequence('clean','copy', 'babel1', 'babel2','webpack');
});

gulp.task('default', ['prod']);
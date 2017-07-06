var gulp = require('gulp');
// var gulpWebpack = require('gulp-webpack');
var webpackStream = require("webpack-stream")
var defaultsDeep = require('merge-defaults');
var webpack = require('webpack');
var webpack_dev_Config = require('./webpack-dev.config');
var webpack_prod_Config = require('./webpack-prod.config');

var PUBLIC_PATH = '/public/';

gulp.task("webpack-dev", function() {
  return gulp.src('./src/static/app/js/main.js')
    .pipe(webpackStream( webpack_dev_Config ))
    .pipe(gulp.dest('dist/src/static/app'));
});

gulp.task("webpack", function() {
  return gulp.src('./src/static/app/js/main.js')
    .pipe(webpackStream( webpack_prod_Config ))
    .pipe(gulp.dest('dist/src/static/app'));
});
var gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src([
      './src/static/pure/**/*',
      './src/view/*'
    ], {
      base: './src'
    })
    .pipe(gulp.dest('./dist/src'));
});
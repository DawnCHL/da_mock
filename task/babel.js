const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('babel', () => {
	return gulp.src(['*.js','src/**/*.js'])
		.pipe(babel({
			plugins: ['transform-async-to-generator']
		}))
		.pipe(gulp.dest('dist'));
});
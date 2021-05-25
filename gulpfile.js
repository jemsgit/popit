var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('gulp-uglify', async function(){
  gulp.src('src/scripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
});
const gulp = require('gulp');

// gulp.task('default', ['css', 'html']);

gulp.task('css', function () {
  const postcss = require('gulp-postcss')
  return gulp.src('./src/**/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('build/'))
})

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
      .pipe(gulp.dest('build/'))
});

const gulp = require('gulp');

gulp.task('css', function () {
  const postcss = require('gulp-postcss')

  return gulp.src('src/styles.css')
    // ...
    .pipe(postcss([
      // ...
      require('tailwindcss'),
      require('autoprefixer'),
      // ...
    ]))
    // ...
    .pipe(gulp.dest('build/'))
})

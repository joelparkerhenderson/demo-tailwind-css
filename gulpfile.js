const gulp = require('gulp');
const logger = require('pino')()
logger.info('Gulp and pino are working...');

/// Gulp tasks that each do one thing

function css(cb) {
  const postcss = require('gulp-postcss')
  gulp
    .src('./src/**/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography')
    ]))
    .pipe(gulp.dest('dist/'));
  cb();
}

function html(cb) {
  gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('dist/'));
  cb();
}

function jpg(cb) {
  gulp
    .src('./src/**/*.jpg')
    .pipe(gulp.dest('dist/'));
  cb();
}

function js(cb) {
  gulp
    .src('./src/**/*.js')
    .pipe(gulp.dest('dist/'));
    cb();
}

/// Gulp tasks that each combine other tasks

function watch(cb) {
  gulp.watch('./src/**/*.css', gulp.series('css'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
  gulp.watch('./src/**/*.jpg', gulp.series('jpg'));
  gulp.watch('./src/**/*.js', gulp.series('js'));
  cb();
}

/// Gulp task names

gulp.task('css', css);
gulp.task('html', html);
gulp.task('jpg', html);
gulp.task('js', html);
gulp.task('watch', watch);

// Gulp tasks defined by exports

exports.build = gulp.parallel(css, html, jpg, js);
exports.default = gulp.parallel(css, html, jpg, js, watch);

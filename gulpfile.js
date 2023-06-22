const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

function range(start, end) {
    const result = [];
    for (let i = end; i >= start; i--) {
      result.push(i);
    }
    return result;
}

// Compile Pug files
function compilePug() {
  return gulp
    .src('templates/*.pug') // Path to your Pug files
    .pipe(pug({ locals: { range: range } })) // Compile template.pug, using your data
    .pipe(pug())
    .pipe(gulp.dest('dist')) // Destination folder
    .pipe(browserSync.stream());
}

// Watch files for changes and reload
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist', // Serve files from the 'dist' folder
    },
  });

  gulp.watch('templates/*.pug', compilePug);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
}

// Default task
gulp.task('default', gulp.series(compilePug, watch));
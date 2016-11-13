const gulp = require('gulp');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tsconfig = require('tsconfig-glob');
const reload = browserSync.reload;

gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('compile', function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app'));
});

gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['buildAndReload']);
});

gulp.task('build', ['tslint', 'compile']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
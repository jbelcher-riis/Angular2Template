const gulp = require('gulp');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tsconfig = require('tsconfig-glob');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');

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

gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sass()) 
    .pipe(concat('styles.css'))
    .pipe(minify())
    .pipe(gulp.dest(''))
});

gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch(['app/**/*.ts', 'index.html', 'styles.css','*/*.scss'], ['buildAndReload']);
});

gulp.task('build', ['tslint', 'sass', 'compile']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
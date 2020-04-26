'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify-es").default;
var del = require("del");

var server = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css/'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
    ]))
    .pipe(gulp.dest('source/opt-img/'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/opt-img/'));
});

gulp.task('svgOpt', function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(
      imagemin([
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("source/opt-svg/"));
});

gulp.task('sprite', function () {
  return gulp.src('source/opt-svg/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/opt-img/'));
});

gulp.task('minJS', function () {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('pug', function () {
  return gulp.src('source/pug/pages/*.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest(`build/`))
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    "source/libs/**",
  ], {
    base: 'source'
  }).pipe(gulp.dest('build'));
});

gulp.task('copyImages', function () {
  return gulp.src('source/opt-img/**/*')
    .pipe(gulp.dest('build/img/'));
});

gulp.task('copyIcons', function () {
  return gulp.src('source/icons/**/*')
    .pipe(gulp.dest('build/img/icons/'))
});

gulp.task('server', function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch('source/js/**/*.js', gulp.series('minJS', 'refresh'));
  gulp.watch('source/pug/**/*.{pug,html}', gulp.series('pug', 'refresh'));
});

gulp.task('clean', function () {
  return del("build");
});

gulp.task('build', gulp.series('clean', 'copy', 'copyImages', 'copyIcons', 'minJS', 'css', 'pug'));
gulp.task('start', gulp.series('build', 'server'));
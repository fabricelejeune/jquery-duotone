var gulp = require('gulp')
  gulpif = require('gulp-if'),
  coffee = require('gulp-coffee'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  rimraf = require('gulp-rimraf'),
  header = require('gulp-header'),
  runSequence = require('run-sequence');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %> - <%= new Date().getFullYear() %>-<%= new Date().getMonth() + 1 %>-<%= new Date().getDate() %>',
  ' * <%= pkg.description %>',
  ' * ',
  ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author.name %>; <%= pkg.license %> Licensed',
  ' */',
  ''].join('\n');

var errorHandler = function (err) {
  console.log(err);
};

// Clean
gulp.task('clean', function() {
  return gulp.src([
    'jquery.duotone.js',
    'jquery.duotone.min.js'
  ], {read: false}).pipe(rimraf());
});

// Hint
gulp.task('hint', function() {
  return gulp.src('jquery.duotone.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Compile
gulp.task('build', ['clean'], function() {
  return gulp.src([
      'src/vendor/csscolorparser.js',
      'src/jquery.duotone.coffee'
    ])
    .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', errorHandler)))
    .pipe(concat('jquery.duotone.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: '.min', extname: '.js'}))
    .pipe(gulp.dest('.'));
});

gulp.task('default', function() {
  runSequence('build', 'hint');
});

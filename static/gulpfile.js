var gulp = require('gulp'),
    rimraf = require('rimraf'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    usemin = require('gulp-usemin');

gulp.task('clean', function (cb) {
    rimraf.sync('./build');
    cb(null);
});

gulp.task('complieTemplates', function() {
  return gulp.src('./app/template/**/*.html')
    .pipe(templateCache({
      module: 'app',
      root: 'template'
    }))
    .pipe(gulp.dest('./app/tmp'));
});

gulp.task('build', ['complieTemplates'], function() {
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/tmp/templates.js', {
      read: false
    }), {
      ignorePath: '/app',
      starttag: "<!-- inject:template:js -->",
      endtag: "<!-- endinject -->"
    }))
    .pipe(usemin({
      js: [uglify()],
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({
        empty: true
      })]
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['build'], function () {
  rimraf.sync('./app/tmp');
});

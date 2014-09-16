var gulp = require('gulp'),
  inject = require('gulp-inject'),
  uglify = require('gulp-uglify'),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  usemin = require('gulp-usemin');

gulp.task('complieTemplates', function() {
  return gulp.src('./app/template/**/*.html')
    .pipe(templateCache({
      module: 'app',
      root: 'template'
    }))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('injectTemplateJS', ["complieTemplates"], function() {
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/js/templates.js', {
      read: false
    }), {
      ignorePath: '/app',
      starttag: "<!-- inject:template:js -->",
      endtag: "<!-- endinject -->"
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ["complieTemplates"], function() {
  gulp.src('./app/index.html')
  .pipe(inject(gulp.src('./app/js/templates.js', {
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

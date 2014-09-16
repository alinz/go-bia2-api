var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    usemin = require('gulp-usemin');

gulp.task('default', function(){
  gulp.src('./app/index.html')
    .pipe(usemin({
      js: [uglify()],
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})]
    }))
    .pipe(gulp.dest('.'));
});

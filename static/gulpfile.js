var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin');

gulp.task('default', function(){
  gulp.src('./app/index.html')
    .pipe(usemin({
      js: [uglify()]
      // in this case css will be only concatenated (like css: ['concat']).
    }))
    .pipe(gulp.dest('.'));
});

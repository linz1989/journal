var gulp = require('gulp'),
    connect = require('gulp-connect');

//启动server
gulp.task('connect', function () {
    connect.server({
        port: 8089
    });
});

gulp.task('default', function () {
  gulp.run(['connect']);
});

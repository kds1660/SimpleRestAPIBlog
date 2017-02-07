var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyJs = require('gulp-uglify');

gulp.task('angular-app-js', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('blog-app.min.js'))
    //    .pipe(ngAnnotate())
    //    .pipe(minifyJs())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('clean', function () {
    return gulp.src(['public/js/'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    var tasks = ['angular-app-js'];
    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', function () {
    var js = gulp.watch('src/**/*.js', ['angular-app-js']);
});



var gulp = require('gulp')
    , useref = require('gulp-useref')
    , rev = require('gulp-rev')
    , revReplace = require('gulp-rev-replace')
    , gulpif = require('gulp-if')
    , runSequence = require('run-sequence')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , minifyCss = require('gulp-minify-css')
    , del = require('del')
    , livereload = require('gulp-livereload');




gulp.task('js', function () {
    return gulp.src('./assets/js/angular/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./assets/js/build'));
});


gulp.task('move:js', function () {
    return gulp.src(['./public/views/js/*'])
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});


gulp.task('clean:js', function (cb) {
    del(['./public/views/css/**', './public/views/js/**'], cb);
});

gulp.task('html', function () {
    var assets = useref.assets({
        searchPath: ['./assets', './public']
    });

    return gulp.src('./assets/html/index.html')
        .pipe(assets)
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.js', concat('/js/app.min.js')))
        .pipe(rev())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('./public/views'))

});


gulp.task('angular', function (callback) {
    runSequence('js', 'html', 'move:js', 'clean:js', callback);
});

gulp.task('reload', function () {
    return livereload.changed('./config')
});


gulp.task('watch', function () {

    livereload.listen();

    gulp.watch('./assets/js/angular/**/*.js', ['angular']);
    gulp.watch('./assets/html/**/*.html', ['angular']);
    gulp.watch('./public/views/**/*.html', ['reload']);

});

gulp.task('default', function (callback) {
    runSequence('angular', callback);
});
gulp.task('heroku', function (callback) {
    runSequence('angular', callback);
});
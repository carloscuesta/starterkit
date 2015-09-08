var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');

/* routes: object that contains the paths as properties */

var routes = {
    scss: 'assets/css/*.scss',
    css: 'assets/css/',
    jade: 'assets/jade/*.jade',
    _jade: 'assets/jade/_includes/*.jade',
    html: './'
};

/* Compiling Tasks */

// SCSS

gulp.task('scss', function() {
    return gulp.src(routes.scss)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled & Minified',
            message: 'scss task completed.',
        }));
});

// Jade

gulp.task('jade', function() {
    gulp.src([routes.jade, '!'+routes._jade])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(jade())
        .pipe(gulp.dest(routes.html))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'Jade Compiled',
            message: 'jade task completed.',
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', ['scss'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch(routes.scss, ['scss']);
    gulp.watch(routes.jade, ['jade']);
    gulp.watch(routes._jade, ['jade']);
    gulp.watch(routes.jade).on('change', browserSync.reload);
    gulp.watch(routes._jade).on('change', browserSync.reload);

});


gulp.task('default', ['jade', 'scss', 'serve']);

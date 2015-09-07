var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');

/* routes: object that contains the paths as properties */

var routes = {
	scss:'assets/css/*.scss',
	css:'assets/css/',
    jade:'assets/jade/*.jade',
    _jade:'!assets/jade/_includes/*.jade',
    html:'./'
};

/* Compiling Tasks */

// SCSS

gulp.task('scss', function() {
    gulp.src(routes.scss)
        .pipe(plumber({
        	errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.css))
        .pipe(notify({
        	title: 'SCSS Compiled & Minified',
        	message:'scss task completed.',
        }));
});

// Jade

gulp.task('jade', function() {
    gulp.src([routes.jade, routes._jade])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(jade())
        .pipe(gulp.dest(routes.html))
        .pipe(notify({
            title: 'Jade Compiled',
            message:'jade task completed.',
        }));
});
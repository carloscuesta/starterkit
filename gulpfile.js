var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

/* routes: object that contains the paths as properties */

var routes = {
	scss:'assets/css/*.scss',
	css:'assets/css/',
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
        .pipe(gulp.dest(routes.css))
        .pipe(notify({
        	title: 'SCSS Compiled & Minified',
        	message:'scss task completed.',
        }));
});

// Jade
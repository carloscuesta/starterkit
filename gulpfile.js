var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

/* routes: object that contains the paths as properties */

var routes = {
    scss: 'src/scss/*.scss',
    css: 'dist/assets/css/',
    jade: 'src/jade/*.jade',
    _jade: 'src/jade/_includes/*.jade',
    js: 'src/js/*.js',
    jsmin: 'dist/assets/js/',
    html: 'dist/',
    images: 'src/img/*',
    imgmin: 'dist/assets/files/img/'
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
        .pipe(autoprefixer('last 2 versions'))
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
    gulp.src([routes.jade, '!' + routes._jade])
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

gulp.task('scripts', function() {
    return gulp.src(routes.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(routes.jsmin))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'JavaScript Minified and Concatenated',
            message: 'your js files has been minified and concatenated.',
        }));
});

/* Image compressing task */

gulp.task('image', function() {
    gulp.src(routes.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.imgmin))
        .pipe(notify({
            title: 'Images optimized',
            message: 'your images has been compressed.',
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', ['scss'], function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch(routes.scss, ['scss']);
    gulp.watch(routes.jade, ['jade']);
    gulp.watch(routes._jade, ['jade']);
    gulp.watch(routes.js, ['scripts']);

});

gulp.task('default', ['jade', 'scss', 'scripts', 'image', 'serve']);

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
    uglify = require('gulp-uglify'),
    ftp = require('vinyl-ftp'),
    babel = require('gulp-babel'),
    cssimport = require('gulp-cssimport');

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: 'src/scss/*.scss',
        _scss: 'src/scss/_includes/*.scss',
        css: 'dist/assets/css/'
    },

    templates: {
        jade: 'src/jade/*.jade',
        _jade: 'src/jade/_includes/*.jade'
    },

    scripts: {
        js: 'src/js/*.js',
        jsmin: 'dist/assets/js/'
    },

    files: {
        html: 'dist/',
        images: 'src/img/*',
        imgmin: 'dist/assets/files/img/'
    },

    deployDirs: {
        baseDir: 'dist/',
        baseDirFiles: 'dist/**',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
}

/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
    host: 'HOST', 
    user: 'USER', 
    password: 'PASSWORD' 
}

/* Compiling Tasks */

// SCSS

gulp.task('scss', function() {
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(cssimport({}))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.',
        }));
});

// Jade

gulp.task('jade', function() {
    gulp.src([routes.templates.jade, '!' + routes.templates._jade])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling Jade.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(jade())
        .pipe(gulp.dest(routes.files.html))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'Jade Compiled succesfully!',
            message: 'Jade task completed.',
        }));
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function() {
    return gulp.src(routes.scripts.js)
        .pipe(concat('script.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(routes.scripts.jsmin))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'JavaScript Minified and Concatenated!',
            message: 'your js files has been minified and concatenated.',
        }));
});

/* Image compressing task */

gulp.task('image', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin))
        .pipe(notify({
            title: 'Images optimized!',
            message: 'your images has been compressed.',
        }));
});

/* Deploy, deploy dist/ files to an ftp server */

gulp.task('deploy', function() {
    var connection = ftp.create({
        host: ftpCredentials.host,
        user: ftpCredentials.user,
        password: ftpCredentials.password
    });

    return gulp.src(routes.deployDirs.baseDirFiles, {
        base: routes.deployDirs.baseDir,
        buffer: false
    })
    .pipe(plumber({
        errorHandler: notify.onError({
            title: "Error: Deploy failed.",
            message:"<%= error.message %>"
        })
    }))
    .pipe(connection.newer(routes.deployDirs.ftpUploadDir))
    .pipe(connection.dest(routes.deployDirs.ftpUploadDir))
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch(routes.styles.scss, ['scss']);
    gulp.watch(routes.styles._scss, ['scss']);
    gulp.watch(routes.templates.jade, ['jade']);
    gulp.watch(routes.templates._jade, ['jade']);
    gulp.watch(routes.scripts.js, ['scripts']);

});

gulp.task('build', ['jade', 'scss', 'scripts', 'image', 'browser-sync']);

gulp.task('default', function() {
    gulp.start('build');
});

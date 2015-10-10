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
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify');

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: 'src/styles/*.scss',
        _scss: 'src/styles/_includes/*.scss',
        css: 'dist/assets/css/'
    },

    templates: {
        jade: 'src/templates/*.jade',
        _jade: 'src/templates/_includes/*.jade'
    },

    scripts: {
        base:'src/scripts/',
        js: 'src/scripts/*.js',
        jsmin: 'dist/assets/js/'
    },

    files: {
        html: 'dist/',
        images: 'src/images/*',
        imgmin: 'dist/assets/files/img/'
    },

    deployDirs: {
        baseDir: 'dist/',
        baseDirFiles: 'dist/**',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};

/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
    host: 'HOST',
    user: 'USER',
    password: 'PASSWORD'
};

/* Compiling Tasks */

// SCSS

gulp.task('styles', function() {
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cssimport({}))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.',
        }));
});

// Jade

gulp.task('templates', function() {
    return gulp.src([routes.templates.jade, '!' + routes.templates._jade])
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
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Babel and Concat failed.",
                message:"<%= error.message %>"
            })
        }))
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

gulp.task('images', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin));
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
        .pipe(connection.dest(routes.deployDirs.ftpUploadDir))
        .pipe(notify({
            title: 'Deploy succesful!',
            message: 'Your deploy has been done!.',
        }));
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function() {
    return gulp.src(routes.scripts.js)
        .pipe(beautify({indentSize: 4}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Beautify failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(routes.scripts.base))
        .pipe(notify({
            title: 'JS Beautified!',
            message: 'beautify task completed.',
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);
    gulp.watch([routes.templates.jade, routes.templates._jade], ['templates']);
    gulp.watch(routes.scripts.js, ['scripts', 'beautify']);
});

gulp.task('build', ['templates', 'styles', 'scripts', 'images', 'browser-sync']);

gulp.task('default', function() {
    gulp.start('build');
});

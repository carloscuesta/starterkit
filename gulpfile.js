'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ftp = require('vinyl-ftp');
var surge = require('gulp-surge');
var babel = require('gulp-babel');
var cssimport = require('gulp-cssimport');
var beautify = require('gulp-beautify');
var uncss = require('gulp-uncss');
var cssmin = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var critical = require('critical').stream;

/* baseDirs: baseDirs for the project */

var baseDirs = {
	dist: 'dist/',
	src: 'src/',
	assets: 'dist/assets/'
};

/* routes: object that contains the paths */

var routes = {
	styles: {
		scss: baseDirs.src + 'styles/*.scss',
		_scss: baseDirs.src + 'styles/_includes/*.scss',
		css: baseDirs.assets + 'css/'
	},

	templates: {
		pug: baseDirs.src + 'templates/*.pug',
		_pug: baseDirs.src + 'templates/_includes/*.pug'
	},

	scripts: {
		base: baseDirs.src + 'scripts/',
		js: baseDirs.src + 'scripts/*.js',
		jsmin: baseDirs.assets + 'js/'
	},

	files: {
		html: 'dist/',
		images: baseDirs.src + 'images/*',
		imgmin: baseDirs.assets + 'files/img/',
		cssFiles: baseDirs.assets + 'css/*.css',
		htmlFiles: baseDirs.dist + '*.html',
		styleCss: baseDirs.assets + 'css/style.css'
	},

	deployDirs: {
		baseDir: baseDirs.dist,
		baseDirFiles: baseDirs.dist + '**',
		ftpUploadDir: 'FTP-DIRECTORY'
	}
};

/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
	host: 'HOST',
	user: 'USER',
	password: 'PASSWORD'
};

var surgeInfo = {
	domain: 'YOURDOMAIN.surge.sh'
};

/* Compiling Tasks */

// pug

gulp.task('templates', function () {
	return gulp.src([routes.templates.pug, '!' + routes.templates._pug])
		.pipe(plumber({
			errorHandler: notify.onError({
				title: 'Error: Compiling pug.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(pug())
		.pipe(gulp.dest(routes.files.html))
		.pipe(browserSync.stream())
		.pipe(notify({
			title: 'Pug Compiled succesfully!',
			message: 'Pug task completed.'
		}));
});

// SCSS

gulp.task('styles', function () {
	return gulp.src(routes.styles.scss)
		.pipe(plumber({
			errorHandler: notify.onError({
				title: 'Error: Compiling SCSS.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(sourcemaps.write())
		.pipe(cssimport({}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest(routes.styles.css))
		.pipe(browserSync.stream())
		.pipe(notify({
			title: 'SCSS Compiled and Minified succesfully!',
			message: 'scss task completed.'
		}));
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function () {
	return gulp.src(routes.scripts.js)
		.pipe(plumber({
			errorHandler: notify.onError({
				title: 'Error: Babel and Concat failed.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(routes.scripts.jsmin))
		.pipe(browserSync.stream())
		.pipe(notify({
			title: 'JavaScript Minified and Concatenated!',
			message: 'your js files has been minified and concatenated.'
		}));
});

/* Image compressing task */

gulp.task('images', function () {
	gulp.src(routes.files.images)
		.pipe(imagemin())
		.pipe(gulp.dest(routes.files.imgmin));
});

/* Deploy, deploy dist/ files to an ftp server */

gulp.task('ftp', function () {
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
				title: 'Error: Deploy failed.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(connection.dest(routes.deployDirs.ftpUploadDir))
		.pipe(notify({
			title: 'Deploy succesful!',
			message: 'Your deploy has been done!.'
		}));
});

gulp.task('surge', function () {
	return surge({
		project: routes.deployDirs.baseDir,
		domain: surgeInfo.domain
	});
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function () {
	return gulp.src(routes.scripts.js)
		.pipe(beautify({indentSize: 4}))
		.pipe(plumber({
			errorHandler: notify.onError({
				title: 'Error: Beautify failed.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(gulp.dest(routes.scripts.base))
	.pipe(notify({
		title: 'JS Beautified!',
		message: 'beautify task completed.'
	}));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function () {
	browserSync.init({
		server: './dist/'
	});

	gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);
	gulp.watch([routes.templates.pug, routes.templates._pug], ['templates']);
	gulp.watch(routes.scripts.js, ['scripts', 'beautify']);
});

/* Remove unusued css */

gulp.task('uncss', function () {
	return gulp.src(routes.files.cssFiles)
		.pipe(uncss({
			html: [routes.files.htmlFiles],
			ignore: ['*:*']
		}))
		.pipe(plumber({
			errorHandler: notify.onError({
				title: 'Error: UnCSS failed.',
				message: '<%= error.message %>'
			})
		}))
		.pipe(cssmin())
		.pipe(gulp.dest(routes.styles.css))
		.pipe(notify({
			title: 'Removed unusued CSS',
			message: 'UnCSS completed!'
		}));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
	return gulp.src(routes.files.htmlFiles)
		.pipe(critical({
			base: baseDirs.dist,
			inline: true,
			minify: true,
			html: routes.files.htmlFiles,
			css: routes.files.styleCss,
			ignore: ['@font-face', /url\(/],
			width: 1300,
			height: 900
		}))
			.pipe(plumber({
				errorHandler: notify.onError({
					title: 'Error: Critical failed.',
					message: '<%= error.message %>'
				})
			}))
			.pipe(gulp.dest(baseDirs.dist))
			.pipe(notify({
				title: 'Critical Path completed!',
				message: 'css critical path done!'
			}));
});

gulp.task('dev', ['templates', 'styles', 'scripts', 'images', 'serve']);

gulp.task('build', ['templates', 'styles', 'scripts', 'images']);

gulp.task('optimize', ['uncss', 'critical', 'images']);

gulp.task('deploy', ['optimize', 'surge']);

gulp.task('default', function () {
	gulp.start('dev');
});

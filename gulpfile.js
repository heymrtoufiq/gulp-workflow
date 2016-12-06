// including gulp modules in varible

var gulp 		=	require('gulp'),
	sass 		= 	require('gulp-sass'),
	cleanCSS 	= 	require('gulp-clean-css'),
	rename 		= 	require('gulp-rename'),
	uglify 		= 	require('gulp-uglify'),
	browserSync = 	require('browser-sync').create();

// Style task for compile scss to css 
gulp.task('style', function() {

	gulp.src('scss/*.scss')
    	.pipe(sass())
    	.pipe(gulp.dest('css'));
})

// Server 
gulp.task('server', function() {

    browserSync.init({
        server: "./"
    });

});

// Watch Task
gulp.task('watch', function () {
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('js/*.js').on('change', browserSync.reload);
	gulp.watch('css/*.css').on('change', browserSync.reload);
	gulp.watch('scss/*.scss', ['style']);
});

////////////////////////////////////////
//             Build Task             //
////////////////////////////////////////

// Build Server 
gulp.task('build-server', function() {

    browserSync.init({
        server: "./dist"
    });

});

// HTML
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(gulp.dest('dist/'));
});

// CSS
gulp.task('css', function() {
	gulp.src('css/*.css')
		.pipe(gulp.dest('dist/css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/css'));
});

// Script
gulp.task('js', function() {
	gulp.src('js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/js'));
});

// Images
gulp.task('img', function() {
	gulp.src(['image/**/*'])
		.pipe(gulp.dest('dist/image'));
});

// Font
gulp.task('font', function() {
	gulp.src(['fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));
});

// Run Default Task 
gulp.task('default', ['server', 'style', 'watch']);


// Run Build Task 
gulp.task('build', ['build-server', 'html', 'css', 'js', 'img', 'font']);
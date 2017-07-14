import gulp from 'gulp';
import webserver from 'gulp-webserver';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

var paths = {
    main_js: ['js/init.js'],
    js: ['js/*.js']
};

gulp.task('default', ['browserify', 'webserver']);

gulp.task('browserify', function() {
  browserify(paths.main_js)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/scripts'));
});


gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('watch', () => {
    gulp.watch(paths.js, ['browserify']);
});

var gulp = require('gulp'),
    del = require('del'),
    batch = require('gulp-batch'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    customMedia = require('postcss-custom-media'),
    atImport = require('postcss-import'),
    eslint = require('gulp-eslint'),
    watch = require('gulp-watch');

gulp.task('clean:build', function() {
    return del('./build/**/*');
});

gulp.task('copy:js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy:markup', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('postcss', function() {

    var processors = [
        atImport(),
        cssnext({ browsers: ['> 5%'] }),
        customMedia(),
    ];

    return gulp.src('./src/**/compass.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./build'));

});

gulp.task('lint', () => {
    return gulp.src('./src/**/main.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', [
    'clean:build',
    'copy:js',
    'copy:markup',
    'postcss',
]);

gulp.task('watch', function() {
    watch('src/**/*', batch(function(events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('dev', [
    'watch'
]);

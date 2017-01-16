var gulp = require('gulp'),
    del = require('del'),
    batch = require('gulp-batch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    csslint = require('gulp-csslint'),
    exec = require('child_process').exec,
    watch = require('gulp-watch');

gulp.task('clean:build', function() {
    return del('./build/**/*');
});


gulp.task('copy:css', function() {
    return gulp.src('./src/**/main.css')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy:js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy:markup', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('css:lint', function() {
    return gulp.src('./src/styles/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter());
});

gulp.task('postcss', function() {
    var processors = [
        autoprefixer({ browsers: ['> 5%'] })
    ];
    return gulp.src('./src/**/compass.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', [
    'clean:build',
    'copy:css',
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

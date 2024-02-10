const gulp = require('gulp');


const fileInclude  = require('gulp-file-include');
gulp.task('html', function(){
    return gulp.src('./src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'))
});


const sass = require('gulp-sass')(require('sass'));
gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
});


gulp.task('images', function(){
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images/'))
});


gulp.task('fonts', function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/'));
})


const clean = require('gulp-clean');
const fs = require('fs');
gulp.task('clean', function(done){
    
    if(fs.existsSync('./dist/')){
        return gulp.src('./dist/', {read: false}).pipe(clean());
    }

    done();
});


gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/images/**/*', gulp.parallel('images'));
});

const server = require('gulp-server-livereload');
gulp.task('server', function(){
    return gulp.src('./dist').pipe(server({
        livereload: true,
        open: true
    }))
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'images'),
    gulp.parallel('server', 'watch')
));





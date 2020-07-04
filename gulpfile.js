const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const browsersync = require('browser-sync').create()

gulp.task('sass', () => {
    return gulp.src('dev/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browsersync.stream())
})

gulp.task('pug', () => {
    return gulp.src('dev/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('babel', () => {
    return gulp.src('dev/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browsersync.stream())
})

gulp.task('default', () => {
    gulp.watch('dev/**/*.pug', gulp.series('pug'))
    gulp.watch('dev/scss/**/*.scss',gulp.series('scss'))
    gulp.watch('dev/js/*.js', gulp.series('babel'))
    gulp.watch('dist/**/*.html').on('change',browsersync.reload)
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    })
})
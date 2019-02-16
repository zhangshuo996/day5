var gulp = require("gulp");
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var concat = require('gulp-concat')
var server = require("gulp-webserver");
var htmlmin = require("gulp-htmlmin")

gulp.task("browserSync",function(){
    return gulp.src("./app")
        .pipe(server({
            port: 9090,
            host: "169.254.254.107",
            livereload: true,
            middleware: function (req,res,next) {
                
                next()
            }
        }))
})
//编译scss

gulp.task("scss", function () {
    return gulp.src("./app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./app/scss"))
})

//编译并压缩js文件

gulp.task("js", function () {
    return gulp.src("./app/js/**/*.js")
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./app/newjs'))
})
//压缩css
gulp.task("zipCSS", function () {
    return gulp.src("./app/scss/**/*.css")
        .pipe(mincss())
        .pipe(rename(function (path) {
            path.basename+=".min"
        }))
    .pipe(gulp.dest("./dist/css"))
})

//压缩js
gulp.task("zipJS", function () {
    return gulp.src("./app/js/**/*.js")
        .pipe(babel({
            presets:["@babel/env"]
        }))
        .pipe(rename(function (path) {
            path.basename+=".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})

//压缩html
gulp.task("zipHTML", function () {
    return gulp.src("./app/**/*.html")
        .pipe(htmlmin(htmlmin({ collapseWhitespace: true })))
        .pipe(rename(function (path) {
            path.basename+=".min"
        }))
        .pipe(gulp.dest("./dist"))
})

gulp.task("watch", function () {
    return gulp.watch(["./app/scss/**/*.scss","./app/js/**/*.js"], gulp.series("scss","js"))
})

gulp.task("default",gulp.series("js","scss","browserSync","watch"))
gulp.task("build",gulp.series("zipCSS","zipJS","zipHTML"))
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass',function(){
    return gulp.src('scss/*.scss') // scss 파일 경로
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // outputStyle : nested, expanded, compact, compressed
    .pipe(sourcemaps.write('.',{includeContent: true}))
    .pipe(gulp.dest('css/')); // 컴파일된 css 생성 위치
});

gulp.task('sass:watch',function(){
    gulp.watch('scss/*.scss',['sass']); // scss 파일 경로
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('sprite_img/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            padding: 3,
            imgPath: '../img/sprite.png'
        }));
    var imgStream = new Promise(function(resolve) {
        spriteData.img
            .pipe(gulp.dest('img/'))
            .on('end',resolve);
    });
        
    var cssStream = new Promise(function(resolve) {
        spriteData.css
            .pipe(gulp.dest('sprite_scss/'))
            .on('end',resolve);
    });

    return Promise.all([imgStream, cssStream]);
});

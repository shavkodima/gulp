const {src, dest, series} = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const include = require('gulp-file-include')
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const sync = require('browser-sync');



function html(){
    return src('src/**.html')
    .pipe(include({
        prefix:'@@'
    }))
    .pipe(dest('distr'))
}


function sassGeneration(){
    return src('src/sass/**.scss')
    .pipe(sass())
    .pipe(autoPrefixer({
        overrideBrowserslist: ['last 2 versions'],
    }))
    .pipe(concat('index.css'))
    .pipe(dest('distr'))
    .on('end', sync.reload)
}

function clear(){
    return del('dist')
}

exports.build = series(clear, html, sassGeneration)
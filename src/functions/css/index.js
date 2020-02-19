exports.concatCSS = concatCSS;
exports.minifyCSS = minifyCSS;


const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

/**
 * Compiles and concats style files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object?} opt_sassConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function concatCSS(srcPath, destPath, opt_fileName, opt_sassConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'styles';
    const compilerConfig = Object.assign({}, {}, opt_sassConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(concat(outputFile + '.css'))
        .pipe(sass(compilerConfig).on('error', sass.logError))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * Minifies style files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object?} opt_cssminConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function minifyCSS(srcPath, destPath, opt_fileName, opt_cssminConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'styles.min';
    const minifierConfig = Object.assign({}, { compatibility: 'ie8' }, opt_cssminConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(cssmin(minifierConfig))
        .pipe(rename(outputFile + '.css'))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

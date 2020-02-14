exports.concatHTML = concatHTML;
exports.minifyHTML = minifyHTML;


const configs = require('../../configs.json');
const gulp = require('gulp');
const flatten = require('gulp-flatten');
const htmlmin = require('gulp-htmlmin');

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function concatHTML(srcPath, destPath, opt_srcOptions, opt_destOptions) {
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(flatten())
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_htmlminConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function minifyHTML(srcPath, destPath, opt_htmlminConfig, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, configs.htmlMinifierConfig, opt_htmlminConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(htmlmin(minifierConfig))
        .pipe(flatten())
        .pipe(gulp.dest(destPath, opt_destOptions));
}

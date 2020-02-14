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

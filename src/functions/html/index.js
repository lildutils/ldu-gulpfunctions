exports.minifyHTML = minifyHTML;


const gulp = require('gulp');
const flatten = require('gulp-flatten');
const htmlmin = require('gulp-htmlmin');

/**
 * Minifies HTML files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_htmlminConfig
 * @param {boolean?} opt_isFlatten
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function minifyHTML(srcPath, destPath, opt_htmlminConfig, opt_isFlatten, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, { collapseWhitespace: true }, opt_htmlminConfig || {});
    if (opt_isFlatten) {
        return gulp.src(srcPath, opt_srcOptions)
            .pipe(htmlmin(minifierConfig))
            .pipe(flatten())
            .pipe(gulp.dest(destPath, opt_destOptions));
    }
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(htmlmin(minifierConfig))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

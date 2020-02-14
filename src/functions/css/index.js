exports.concatCSS = concatCSS;
exports.minifyCSS = minifyCSS;


const configs = require('../../configs.json');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object?} opt_sassConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function concatCSS(srcPath, destPath, opt_fileName, opt_sassConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || configs.styleFileName;
    const compilerConfig = Object.assign({}, configs.sassCompilerConfig, opt_sassConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(concat(outputFile + configs.styleFileExtension))
        .pipe(sass(compilerConfig).on('error', sass.logError))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

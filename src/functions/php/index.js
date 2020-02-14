exports.concatPHP = concatPHP;
exports.minifyPHP = minifyPHP;


const configs = require('../../configs.json');
const buildUtils = require('ldu-gulputils').buildUtils;
const phpmin = require('@cedx/gulp-php-minify');
const gulp = require('gulp');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const rename = require('gulp-rename');

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function concatPHP(srcPath, destPath, opt_fileName, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || configs.phpFileName;
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(concat(outputFile + configs.phpFileExtension))
        .pipe(insert.transform(buildUtils.processPHPContent))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_phpMinifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyPHP(srcPath, destPath, opt_fileName, opt_phpMinifyConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || (configs.phpFileName + configs.minifiedSuffix);
    const minifierConfig = Object.assign({}, configs.phpMinifierConfig || {}, opt_phpMinifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(phpmin.phpMinify(minifierConfig))
        .pipe(rename(outputFile + configs.phpFileExtension))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

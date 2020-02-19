exports.concatPHP = concatPHP;
exports.minifyPHP = minifyPHP;


const buildUtils = require('ldu-gulputils').buildUtils;
const phpmin = require('@cedx/gulp-php-minify');
const gulp = require('gulp');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const rename = require('gulp-rename');

/**
 * Compiles and concats PHP files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function concatPHP(srcPath, destPath, opt_fileName, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'includes';
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(concat(outputFile + '.php'))
        .pipe(insert.transform(buildUtils.processPHPContent))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * Minifies PHP files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_phpMinifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyPHP(srcPath, destPath, opt_fileName, opt_phpMinifyConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'includes.min';
    const minifierConfig = Object.assign({}, { silent: true }, opt_phpMinifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(phpmin.phpMinify(minifierConfig))
        .pipe(rename(outputFile + '.php'))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

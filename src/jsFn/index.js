const gulp = require('gulp');
const concat = require('gulp-concat');
const jsminify = require('gulp-js-minify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');

/**
 * Compiles and concats script files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_tsConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function concatJS(srcPath, destPath, opt_fileName, opt_tsConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'scripts';
    const compilerConfig = Object.assign({}, {
        module: 'none',
        noImplicitAny: true,
        removeComments: true,
        preserveConstEnums: true,
        strictNullChecks: true,
        sourceMap: false
    }, opt_tsConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(ts(compilerConfig))
        .pipe(concat(outputFile + '.js'))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

exports.concatJS = concatJS;

/**
 * Minifies script files and copies they to given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_jsminifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyJS(srcPath, destPath, opt_fileName, opt_jsminifyConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || 'scripts.min';
    const minifierConfig = Object.assign({}, {}, opt_jsminifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(jsminify(minifierConfig))
        .pipe(rename(outputFile + '.js'))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

exports.minifyJS = minifyJS;

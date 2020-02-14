exports.concatJS = concatJS;
exports.minifyJS = minifyJS;


const configs = require('../../configs.json');
const gulp = require('gulp');
const concat = require('gulp-concat');
const jsminify = require('gulp-js-minify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_tsConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 */
function concatJS(srcPath, destPath, opt_fileName, opt_tsConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || configs.scriptFileName;
    const compilerConfig = Object.assign({}, configs.tsCompilerConfig || {}, opt_tsConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(ts(compilerConfig))
        .pipe(concat(outputFile + configs.scriptFileExtension))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string=} opt_fileName
 * @param {Object=} opt_jsminifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyJS(srcPath, destPath, opt_fileName, opt_jsminifyConfig, opt_srcOptions, opt_destOptions) {
    const outputFile = opt_fileName || (configs.scriptFileName + configs.minifiedSuffix);
    const minifierConfig = Object.assign({}, configs.jsMinifierConfig, opt_jsminifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(jsminify(minifierConfig))
        .pipe(rename(outputFile + configs.scriptFileExtension))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

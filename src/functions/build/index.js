exports.cleanFolder = cleanFolder;
exports.concatFiles = concatFiles;
exports.copyFiles = copyFiles;
exports.createFile = createFile;
exports.minifyImages = minifyImages;
exports.minifyJSON = minifyJSON;
exports.zipping = zipping;


const configs = require('../../configs.json');
const buildUtils = require('ldu-gulputils').buildUtils;
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');
const jsonminify = require('gulp-jsonminify');
const fs = require('fs');
const zip = require('gulp-zip');

/**
 * @param {string} path
 * @param {string=} opt_pathPrefix
 * @param {string=} opt_pathSuffix
 * @returns {any} the Gulp.src stream
 */
function cleanFolder(path, opt_pathPrefix, opt_pathSuffix) {
    const folderPathPrefix = opt_pathPrefix || configs.patterns.EMPTY;
    const folderPath = path;
    const folderPathSuffix = opt_pathSuffix || configs.patterns.ALL_FOLDER;
    return del([folderPathPrefix + folderPath + folderPathSuffix]);
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {string} outputFile
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function concatFiles(srcPath, destPath, outputFile, opt_srcOptions, opt_destOptions) {
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(concat(outputFile))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {strng|Array<string>} srcPath
 * @param {strng} destPath
 * @param {boolean=} opt_isFlatten
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function copyFiles(srcPath, destPath, opt_isFlatten, opt_srcOptions, opt_destOptions) {
    if (!!opt_isFlatten) {
        return gulp.src(srcPath, opt_srcOptions)
            .pipe(flatten())
            .pipe(gulp.dest(destPath, opt_destOptions));
    }
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string} destPath
 * @param {string} fileName
 * @param {string} fileExtension
 * @param {string} fileContent
 * @param {Function} cb
 */
function createFile(destPath, fileName, fileExtension, fileContent, cb) {
    fs.writeFile(destPath + fileName + fileExtension, fileContent, function (result) {
        cb(result);
    });
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_imageminConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyImages(srcPath, destPath, opt_imageminConfig, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, configs.imageMinifierConfig, opt_imageminConfig || {});
    const imageminOptions = [
        imagemin.gifsicle({
            interlaced: true
        }),
        imagemin.jpegtran({
            progressive: true
        }),
        imagemin.optipng({
            optimizationLevel: 5
        }),
        imagemin.svgo({
            plugins: [
                { removeViewBox: true },
                { cleanupIDs: false }
            ]
        })
    ];
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(imagemin(imageminOptions, minifierConfig))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_jsonminifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyJSON(srcPath, destPath, opt_jsonminifyConfig, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, configs.jsonMinifierConfig, opt_jsonminifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(jsonminify(minifierConfig))
        .pipe(flatten())
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * @param {string|Array<string>} srcPath
 * @param {string} projectName
 * @param {string} projectVersion
 * @param {string} destPath
 * @param {Object=} opt_zipConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function zipping(srcPath, projectName, projectVersion, destPath, opt_zipConfig, opt_srcOptions, opt_destOptions) {
    const zipConfig = Object.assign({}, configs.zippingConfig, opt_zipConfig || {});
    const outputFile = buildUtils.getBuildName(projectName, projectVersion);
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(zip(outputFile, zipConfig))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

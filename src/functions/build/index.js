exports.cleanFolder = cleanFolder;
exports.concatFiles = concatFiles;
exports.copyFiles = copyFiles;
exports.createFile = createFile;
exports.minifyImages = minifyImages;
exports.minifyJSON = minifyJSON;
exports.zipping = zipping;


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
 * Cleans the folder content (files and subfolders recursively) under given path
 * 
 * @param {string} path
 * @param {string=} opt_pathPrefix
 * @param {string=} opt_pathSuffix
 * @returns {any} the Gulp.src stream
 */
function cleanFolder(path, opt_pathPrefix, opt_pathSuffix) {
    const folderPathPrefix = opt_pathPrefix || '';
    const folderPath = path;
    const folderPathSuffix = opt_pathSuffix || '/**/*';
    return del([folderPathPrefix + folderPath + folderPathSuffix]);
}

/**
 * Concats the given source files to one given file and copy it to the given destination path
 * 
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
 * Copies the given source files to the given destination path
 * 
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
 * Creates a file with the given content and informations
 * 
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
 * Minifies the given source images and copies they to the given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_imageminConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyImages(srcPath, destPath, opt_imageminConfig, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, { verbose: false }, opt_imageminConfig || {});
    const imageminOptions = [
        imagemin.gifsicle({
            interlaced: true
        }),
        imagemin.mozjpeg({
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
 * Minifies the given source JSON Objects and copies they to the given destination path
 * 
 * @param {string|Array<string>} srcPath
 * @param {string} destPath
 * @param {Object=} opt_jsonminifyConfig
 * @param {Object?} opt_srcOptions
 * @param {Object?} opt_destOptions
 * @returns {any} the Gulp.src stream
 */
function minifyJSON(srcPath, destPath, opt_jsonminifyConfig, opt_srcOptions, opt_destOptions) {
    const minifierConfig = Object.assign({}, { silent: true }, opt_jsonminifyConfig || {});
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(jsonminify(minifierConfig))
        .pipe(flatten())
        .pipe(gulp.dest(destPath, opt_destOptions));
}

/**
 * Zip the given source path content into the given destination path with the given project informations
 * 
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
    const zipConfig = Object.assign({}, {}, opt_zipConfig || {});
    const outputFile = buildUtils.getBuildName(projectName, projectVersion);
    return gulp.src(srcPath, opt_srcOptions)
        .pipe(zip(outputFile, zipConfig))
        .pipe(gulp.dest(destPath, opt_destOptions));
}

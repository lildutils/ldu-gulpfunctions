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

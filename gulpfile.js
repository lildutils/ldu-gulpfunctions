const packageJson = require('./package.json');
const configs = require('./gulpconfig.json');
const buildUtils = require('ldu-gulputils').buildUtils;
const gulp = require('gulp');
const jeditor = require('gulp-json-editor');
const del = require('del');
const fs = require('fs');
const exec = require('child_process').exec;
const merge = require('merge-stream');

function cleanDist() {
    return del([configs.dist + '/**/*']);
}
cleanDist.displayName = 'clean:dist';
gulp.task('clean', cleanDist);

function copyFiles() {
    return merge(
        copySource(),
        copyPackageJson(),
        copyOthers()
    );
}
copyFiles.displayName = 'copy:files';
gulp.task('copy', copyFiles);

function copySource() {
    return gulp.src([configs.base + '/**/*'])
        .pipe(gulp.dest(configs.dist + '/'));
}
copySource.displayName = 'copy:src';
gulp.task('copySource', copySource);

function copyPackageJson() {
    return gulp.src(['package.json'])
        .pipe(jeditor(buildUtils.processPackageFile))
        .pipe(gulp.dest(configs.dist + '/'));
}
copyPackageJson.displayName = 'copy:package-json';
gulp.task('copyPackageJson', copyPackageJson);

function copyOthers() {
    return gulp.src(configs.others)
        .pipe(gulp.dest(configs.dist + '/'));
}
copyOthers.displayName = 'copy:others';
gulp.task('copyOthers', copyOthers);

function createMeta(cb) {
    const readme = configs.README.content.replace('{HOMEPAGE}', packageJson.homepage);
    fs.writeFile(configs.dist + '/' + configs.README.fileName, readme, function (result) {
        cb(result);
    });
}
createMeta.displayName = 'create:meta';
gulp.task('createMeta', createMeta);

function watchFiles() {
    gulp.watch([configs.base + '/**/*'], configs.watching, copySource);
}
watchFiles.displayName = 'watch:files';
gulp.task('watch', watchFiles);

function createZip(cb) {
    exec('cd ' + configs.dist + ' && npm pack', function (result) {
        cb(result);
    });
};
createZip.displayName = 'create:zip';
gulp.task('createZip', createZip);

function copyZip() {
    return gulp.src([configs.dist + '/*.tgz'])
        .pipe(gulp.dest(configs.build + '/'));
}
copyZip.displayName = 'copy:zip';
gulp.task('copyZip', copyZip);

function cleanZip() {
    return del([configs.dist + '/' + packageJson.name + '*.tgz']);
}
cleanZip.displayName = 'clean:zip';
gulp.task('cleanZip', cleanZip);

const serveProject = gulp.series(
    cleanDist,
    copyFiles,
    createMeta,
    watchFiles
);
gulp.task('serve', serveProject);

const buildProject = gulp.series(
    cleanDist,
    copyFiles,
    createMeta,
    createZip,
    copyZip,
    cleanZip
);
gulp.task('build', buildProject);

gulp.task('default', buildProject);

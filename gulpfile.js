const packageJson = require('./package.json');
const configs = require('./gulpconfig.json');
const gulp = require('gulp');
const del = require('del');
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

const buildProject = gulp.series(
    cleanDist,
    copyFiles,
    createZip,
    copyZip,
    cleanZip
);
gulp.task('build', buildProject);

gulp.task('default', buildProject);

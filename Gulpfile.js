const packageJson = require('./package.json');
const gulp = require('gulp');
const insert = require('gulp-insert');

const configs = {
    base: "src",
    build: "build",
    dist: "dist",
    tmp: "tmp",
    zip: "build",
    lib: "lib",
    watching: {
        events: "all",
        delay: 500
    },
    others: [
        "README.md",
        "LICENSE"
    ]
};

function copySource() {
    return gulp.src([configs.base + '/**/*'])
        .pipe(gulp.dest(configs.dist + '/'));
}
copySource.displayName = 'copy:src';
gulp.task('copySource', copySource);

function copyPackageJson() {
    return gulp.src(['package.json'])
        .pipe(insert.transform(function () {
            return '{"name":"' + packageJson.name + '","version":"' + packageJson.version + '"}';
        }))
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

const buildProject = gulp.series(
    copySource,
    copyPackageJson,
    copyOthers
);
gulp.task('build', buildProject);

gulp.task('default', buildProject);

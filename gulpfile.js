var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var Q = require('q');


var config = {
    allSCSSFiles: 'tasks/scss/*.scss',
    allJSFiles: 'tasks/js/**/*.js',
    production: !!plugins.util.env.production,
    sourceMaps: !plugins.util.env.production
};

var app = {};

//Generate CSS files
app.addStyle = function (paths, filename) {
    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.sass())
		.pipe(config.production ? plugins.concat('assets/css/' + filename + '.min.css') : plugins.concat('assets/css/' + filename + '.css'))
        //util noop does nothing absolutely nothing
        .pipe(config.production ? plugins.minifyCss({keepSpecialComments: 0, rebase: false}) : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('.'))
};

//Generate JS files
app.addScript = function (paths, filename) {
    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(config.production ? plugins.concat('assets/js/' + filename + '.min.js') : plugins.concat('assets/js/' + filename + '.js'))
        .pipe(config.production ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('.'));
};

//Copy files from bundles to web
app.copy = function (srcFiles, outputDir) {
    return gulp.src(srcFiles)
        .pipe(gulp.dest(outputDir));
};


//Call CSS files
gulp.task('styles', function () {
    var pipeline = new Pipeline();

    pipeline.add([
        config.allSCSSFiles
    ], 'hover-effects');

    return pipeline.run(app.addStyle);
});


//Call JS files
gulp.task('scripts', ['styles'], function () {
    var pipeline = new Pipeline();

    pipeline.add([
		'tasks/libraries/jquery/jquery.js',
        config.allJSFiles
    ], 'hover-effects');

    return pipeline.run(app.addScript);

});

//Set watchers for all needed directories and files
gulp.task('watch', ['scripts'], function () {
    gulp.watch(config.allSCSSFiles, ['styles']);
    gulp.watch(config.allJSFiles, ['scripts']);
});


//Default task. Other tasks are attached to it
if (config.production) {
    gulp.task('default', ['styles', 'scripts']);
} else {
    gulp.task('default', ['styles', 'scripts', 'watch']);
}

var Pipeline = function () {
    this.entries = [];
};
Pipeline.prototype.add = function () {
    this.entries.push(arguments);
};

Pipeline.prototype.run = function (callable) {
    var deferred = Q.defer();
    var i = 0;
    var entries = this.entries;

    var runNextEntry = function () {
        if (typeof entries[i] === 'undefined') {
            deferred.resolve();
            return;
        }
        callable.apply(app, entries[i]).on('end', function () {
            i++;
            runNextEntry();
        });
    };
    runNextEntry();

    return deferred.promise;
};
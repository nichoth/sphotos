var browserify = require('browserify');
var browser = require('browser-run');

browserify(__dirname + '/example-app.js', {
    debug: true,
    plugin: [
        [ require('esmify'), { /* ... options ... */ } ]
    ]
}).bundle()
    .pipe(browser())
    .pipe(process.stdout)

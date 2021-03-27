var tapeRun = require('tape-run')
var browserify = require('browserify')
var browserRun = require('browser-run');



var browser = browserRun()
var brStream = browserify(__dirname + '/example-app.js', {
    plugin: [
        [ require('esmify'), { /* ... options ... */ } ]
    ]
})
    .bundle()
    .on('close', () => {
        console.log('browser closed')
    })
    .pipe(browser)




brStream 
    .once('data', function (ev) {
        // the first browser has started, now do the tests in `index.js`
        browserify(__dirname + '/index.js')
            .bundle()
            .pipe(tapeRun())
            .on('close', function (signal) {
                console.log('tape-run close')
                // browser.end('console.log(location); window.close()')
                // brStream.end('console.log(location); window.close()')
                // brStream.destroy()
                // browser.destroy()
            })
            // .on('results', console.log)
            .pipe(process.stdout)
    })
.pipe(process.stdout)
 
// browser.end('console.log(location); window.close()');

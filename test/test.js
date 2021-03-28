var tapeRun = require('tape-run')
var browserify = require('browserify')
var browserRun = require('browser-run')
var envify = require('envify/custom')
var through = require('through2')

var browser = browserRun()
    .on('close', () => console.log('browser up here closed'))

var browserifyStream = browserify(__dirname + '/example-app.js', {
    transform: [
        envify({ NODE_ENV: 'test' })
    ],
    plugin: [
        [ require('esmify'), { /* ... options ... */ } ]
    ]
})
    .bundle()
    .on('close', () => {
        console.log('browser closed')
    })
    .pipe(browser)
    .pipe(through(function (chunk, _, cb) {
        // console.log('chunk/', chunk.toString(), '/end chunk')
        var list = chunk.toString().split('\n')
        list.forEach(function (listItem) {
            try {
                var parsed = JSON.parse(listItem)
                console.log('parsed', parsed)
            } catch (err) {
                // noop
            }
        })

        cb(null, chunk)
    }))


browserifyStream 
    .once('data', function (ev) {
        // the first browser has started, now do the tests in `index.js`
        browserify(__dirname + '/index.js')
            .bundle()
            .pipe(tapeRun())
            .on('close', function (signal) {
                console.log('tape-run close')
                browser.end('console.log(location); window.close()')
                // browserifyStream.end('console.log(location); window.close()')
                // browserifyStream.destroy()
                // browser.destroy()
            })
            // .on('results', console.log)
            .pipe(process.stdout)
    })
.pipe(process.stdout)
 
// browser.end('console.log(location); window.close()');

var tapeRun = require('tape-run')
var browserify = require('browserify')
var browserRun = require('browser-run')
var envify = require('envify/custom')
var through = require('through2')
const { EventEmitter } = require('events')

const bus = new EventEmitter()

var browser = browserRun()
    .on('close', () => console.log('browser up here closed'))

// the app
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
        console.log('chunk/', chunk.toString(), '/end chunk')
        var list = chunk.toString().split('\n')
        list.forEach(function (listItem) {
            try {
                var parsed = JSON.parse(listItem)
                console.log('***********parsed', parsed)
                bus.emit('publicKey', parsed)
            } catch (err) {
                // noop
            }
        })

        cb(null, chunk)
    }))


// the tests
bus.once('publicKey', function ({ pubKey }) {

    browserifyStream
        .once('data', function () {
            console.log('data')
            // the first browser has started, now do the tests in `index.js`
            browserify(__dirname + '/index.js', {
                transform: [ envify({ PUB_KEY: pubKey }) ]
            })
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
})

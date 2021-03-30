var test = require('tape')
var getSSB = require('../src/start')

test('a test', function (t) {
    t.ok(true, 'example')
    console.log('**in test**', process.env.PUB_KEY)
    t.end()
})

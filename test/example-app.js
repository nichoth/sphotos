var getSSB = require('../src/start')

console.log('env', process.env.NODE_ENV)

getSSB(function (err, SSB) {
    if (err) return console.log('errrr', err)

    if (process.env.NODE_ENV == 'test') {
        // console.log('ok')
        // console.log(JSON.stringify({ pubKey: '123' }))
        console.log('**pub key', JSON.stringify({ pubKey: SSB.net.keys.public }))
        console.log(JSON.stringify({ pubKey: SSB.net.keys.public }))
        console.log('**who am i?', SSB.net.id, SSB.net.keys)
    }

    console.log('ssb ok')
})

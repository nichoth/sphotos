require('./ssb-singleton-setup')
const ssbSingleton = require('ssb-browser-core/ssb-singleton')

var [err, SSB] = ssbSingleton.getSSB()

SSB.whoami(function (err, info) {
    console.log('in here', err, info)
})

if (err) console.log('errrrrrr', err)

ssbSingleton.onError(function (err) {
    console.log('errrrr', err)
})
ssbSingleton.onSuccess(function () {
    console.log('success')
})


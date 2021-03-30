require('./ssb-singleton-setup')
const ssbSingleton = require('ssb-browser-core/ssb-singleton')

module.exports = function getSSB (cb) {
    // (isRelevantCB, resultCB)
    ssbSingleton.getSimpleSSBEventually(() => true, function (err, SSB) {
        if (err) return cb(err)
        cb(null, SSB)
    })
}

ssbSingleton.onError(function (err) {
    console.log('**errrrr', err)
})
ssbSingleton.onSuccess(function () {
    console.log('**success', arguments)
})
require('./ssb-singleton-setup')
const ssbSingleton = require('ssb-browser-core/ssb-singleton')

// (isRelevantCB, resultCB)
ssbSingleton.getSimpleSSBEventually(() => true, function (err, SSB) {
    console.log('aaaaaa', err, SSB)
    console.log('who am i?', SSB.net.id, SSB.net.keys)
    SSB.net.address((err, res) => {
        console.log('**addr**', err, res)
    })

    console.log('**addr2*', SSB.net.address())
})

ssbSingleton.onError(function (err) {
    console.log('errrrr', err)
})
ssbSingleton.onSuccess(function () {
    console.log('success', arguments)
})

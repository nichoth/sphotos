require('./ssb-singleton-setup')
const ssbSingleton = require('ssb-browser-core/ssb-singleton')

ssbSingleton.getSSBEventually((err, SSB) => {
    console.log('aaaaaaa', err, SSB)

    SSB.whoami(function (err, info) {
        console.log('in here', err, info)
    })
})


// console.log('in herererer', err, SSB)


ssbSingleton.onError(function (err) {
    console.log('errrrr', err)
})
ssbSingleton.onSuccess(function () {
    console.log('success', arguments)
})


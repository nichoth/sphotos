require('./ssb-singleton-setup')
const ssbSingleton = require('ssb-browser-core/ssb-singleton')
var photos = require('@nichoth/photos')
import { render } from 'preact'
var evs = require('@nichoth/photos/EVENTS')

// (isRelevantCB, resultCB)
ssbSingleton.getSimpleSSBEventually(() => true, function (err, SSB) {
    // console.log('aaaaaa', err, SSB)
    console.log('who am i?', SSB.net.id, SSB.net.keys)

    var { bus, setRoute, html, state } = photos()

    // # The photos UI
    // can listen for its events and call fns on SSB

    bus.on('*', (evName, data) => {
        console.log('***event', evName, data)
    })

    bus.on(evs.route.change, function (route) {
        state.route.set(route)
    })

    // I think we want `.net.connectAndRemember(addr, data)` for pubs

    render(html, document.getElementById('content'))
})

ssbSingleton.onError(function (err) {
    console.log('**errrrr', err)
})
ssbSingleton.onSuccess(function () {
    console.log('**success', arguments)
})

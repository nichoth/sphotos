var photos = require('@nichoth/photos')
import { render } from 'preact'
var evs = require('@nichoth/photos/EVENTS')
var getSSB = require('./start')


getSSB(function (err, SSB) {
    console.log('who am i?', SSB.net.id, SSB.net.keys)

    if (err) return console.log('errrr', err)
    var { bus, setRoute, html, state } = photos()

    bus.on('*', (evName, data) => {
        console.log('***event', evName, data)
    })

    bus.on(evs.route.change, function (route) {
        state.route.set(route)
    })

    render(html, document.getElementById('content'))
})

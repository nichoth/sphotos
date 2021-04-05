var photos = require('@nichoth/photos')
import { render } from 'preact'
var evs = require('@nichoth/photos/EVENTS')
var getSSB = require('./start')
import { html } from 'htm/preact'

var path = require('path')
console.log('***path***', path)

getSSB(function (err, SSB) {
    console.log('who am i?', SSB.net.id, SSB.net.keys)

    if (err) return console.log('errrr', err)
    var app = photos()
    var { bus, setRoute, state } = app
    var el = app.html

    subscribe(bus, SSB, state)

    // @TODO -- this should be in an event listener
    var addr = 'wss:between-two-worlds.dk:9999~shs:7R5/crt8/icLJNpGwP2D7Oqz2WUd7ObCIinFKVR6kNY='
    SSB.net.connect(addr, function (err, rpc) {
        console.log('connect', err, rpc)
    })

    // SSB.net.connectAndRemember(addr, {})

    render(el, document.getElementById('content'))

    function submit (ev) {
        ev.preventDefault()
        console.log('submit', ev.target.elements.follow.value)
        var userId = ev.target.elements.follow.value

        // in here, publish a follow msg
        // @TODO -- should be in an event listener

        SSB.db.publish({
            type: 'contact',
            contact: userId,
            following: true 
        }, function (err, res) {
            // @TODO -- should have an error view
            console.log('publish done', err, res)
        })
    }

    render(html`<form onSubmit=${submit}>
        <label for="follow">follow</label>
        <input type="text" id="follow" name="follow" />
        <button type="submit">submit</button>
    </form>`, document.getElementById('test'))
})

function subscribe (bus, SSB, state) {
    bus.on('*', (evName, data) => {
        console.log('***event', evName, data)
    })

    bus.on(evs.route.change, function (route) {
        state.route.set(route)
    })
}

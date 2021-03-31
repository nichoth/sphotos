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

    bus.on('*', (evName, data) => {
        console.log('***event', evName, data)
    })

    bus.on(evs.route.change, function (route) {
        state.route.set(route)
    })
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

        SSB.db.publish({
            type: 'contact',
            contact: userId,
            following: true 
        }, function (err, res) {
            console.log('publish done', err, res)
        })
    }

    render(html`<div>
        <form onSubmit=${submit}>
            <label for="follow">follow</label>
            <input type="text" id="follow" name="follow" />
            <button type="submit">submit</button>
        </form>
    </div>`, document.getElementById('test'))

})

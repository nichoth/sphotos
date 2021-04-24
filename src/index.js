var photos = require('@nichoth/photos')
import { render } from 'preact'
var evs = require('@nichoth/photos/EVENTS')
var getSSB = require('./start')
import { html } from 'htm/preact'
var S = require('pull-stream')

getSSB(function (err, SSB) {
    console.log('who am i?', SSB.net.id, SSB.net.keys)

    if (err) return console.log('errrr', err)
    window.SSB = SSB
    var { bus, setRoute, state, photosComponent } = photos()
    // var el = app.html

    subscribe(bus, SSB, state)



    // need to do some routing in here
    // onRoute(route => state.route.set(route))
    // onRoute(route => {
        // var m = router.match(route)
        // m.action(state)
    // })

    // `photos` could be just state & event-emitter


   // could match `state.route` against a router
   // call match.action(state)
   // in `action`, get the peer connections and set state


   // change route name to `/peers`
   // show pubs, rooms, and peers
   // peers has both `connected` and `following`






    // for tests -------------------------
    // need to maintain a state of which rooms we are connected to
    // b/c it's not visible via plugins
    var addr = 'wss:between-two-worlds.dk:9999~shs:7R5/crt8/icLJNpGwP2D7Oqz2WUd7ObCIinFKVR6kNY='
    SSB.net.connect(addr, function (err, rpc) {
        console.log('--connected to room--', err, rpc.id, rpc)
    })
    // -------------------------------------------




    console.log('conn', SSB.net.conn)

    console.log('peers start')

    var connectedPeersStream = S(
        SSB.net.conn.peers(),
        S.map(entries =>
          entries.filter(([addr, data]) => data.state === 'connected')
        )
    )

    S(
        connectedPeersStream,
        S.drain(connectedPeers => {
          console.log('connected peers', connectedPeers)
          // [
          //   ['net:192.168.1...', {key: '@Ql...', ...}],
          //   ['net:192.168.2...', {key: '@ye...', ...}]
          // ]
        })
    )




    // SSB.net.connectAndRemember(addr, {})


    function testEl () {
        return html`<form onSubmit=${submit}>
            <label for="follow">follow</label>
            <input type="text" id="follow" name="follow" />
            <button type="submit">submit</button>
        </form>`
    }

    render(html`<${photosComponent}>
        <p>woooooo</p>
        <${testEl} />
    </{photosComponent}>`, document.getElementById('content'))

    function submit (ev) {
        ev.preventDefault()
        console.log('submit', ev.target.elements.follow.value)
        var userId = ev.target.elements.follow.value

        // in here, publish a follow msg

        // this should be on the app bus
        SSB.db.publish({
            type: 'contact',
            contact: userId,
            following: true 
        }, function (err, res) {
            // @TODO -- should have an error view
            console.log('publish done', err, res)
        })
    }

})

function subscribe (bus, SSB, state) {
    bus.on('*', (evName, data) => {
        console.log('*** event', evName, data)
    })

    bus.on(evs.route.change, function (route) {
        state.route.set(route)
    })
}

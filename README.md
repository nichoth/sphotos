# sphotos
a photo sharing application built with [ssb browser](https://github.com/arj03/ssb-browser-core)

## build
```
npm run build
```

## start a local dev server
```
npm start
```

* https://github.com/arj03/ssb-browser-core
* https://github.com/arj03/ssb-browser-demo


## testing
https://github.com/arj03/ssb-browser-core/issues/43#issuecomment-806189796

[ipc example](https://gist.github.com/ndelangen/3b2b981a4795e51ef4f8cf583764eb8a)

this isn't relevant here b/c the code being browserified doesn't run in a node process, so can't do ipc

Need to have 2 browser processes (2 identities). Then you publish a 'follow' msg for the other, and connect to the same 'room'. Would this work with `tape-run`? Need to start a separate process, and send the pub key via IPC msg.

```
npm test
```

## TODO
### test replication
* have them both connect to the same room
* get the public key via `console.log`
* can pass the pub key via env vars

The test file should 'follow' the example-app file

-------------------------------------------

[the hypercore data video](https://hypercore-protocol.org/protocol/)

Only the root of the merkle tree mutates as you append data to the tree.

-------------------------------------
https://github.com/arj03/ssb-browser-core/issues/43


> The way I have been testing this in browser demo is to have 2 browsers, could be 2 incognito modes or a chrome and a firefox. Then you basically create a follow messages on one of the browsers for the other identity. Do the same with the other browser. After that if you connect to the same room. You can use the one in browser demo, then the two browsers should start exchanging messages.

> So a room is basically a server that multiple peers can connect to. The room will faciliate e2e encrypted tunnels between the peers. This means that it won't have any trouble with hole punching and all of that stuff. This is an address to a room that works in the browser: https://github.com/arj03/ssb-browser-demo/blob/e935636feaddd6d13868a104a2ea0fdb3c176bff/defaultprefs.json#L12

```js
    {
        "name": "Between Two Worlds Room",
        "type": "room",
        "address": "wss:between-two-worlds.dk:9999~shs:7R5/crt8/icLJNpGwP2D7Oqz2WUd7ObCIinFKVR6kNY=",
        "default": false
    }
```

```js
    SSB.net.dhtInvite.start((err, success) => {
    })
```

> So you basically connect both clients to that using something like: https://github.com/arj03/ssb-browser-demo/blob/master/ui/connections.js



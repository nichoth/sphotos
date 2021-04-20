# sphotos
Trying [ssb browser](https://github.com/arj03/ssb-browser-core)

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

* [the hypercore data video](https://hypercore-protocol.org/protocol/)

Only the root of the merkle tree mutates as you append data to the tree.









# ssb browser demo
Trying [ssb browser](https://github.com/arj03/ssb-browser-core)

## build
```
npm run build
```

## start a local sercer
```
npm start
```


* https://github.com/arj03/ssb-browser-core
* https://github.com/arj03/ssb-browser-demo


## testing
https://github.com/arj03/ssb-browser-core/issues/43#issuecomment-806189796

Need to have 2 browser processes (2 identities). Then you publish a 'follow' msg for the other, and connect to the same 'room'. Would this work with `tape-run`? Need to start a separate process, and send the pub key via IPC msg.


## TODO
* test replication

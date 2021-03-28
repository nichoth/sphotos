// console.log('woooooo')

console.log('env', process.env.NODE_ENV)

if (process.env.NODE_ENV == 'test') {
    // console.log('ok')
    console.log(JSON.stringify({ pubKey: '123' }))
}

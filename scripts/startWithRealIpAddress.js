// Figure out the IP address associated with my WiFi adapter because
// otherwise the packager will pick my Docker NAT adapter's address.
const os = require('os')
const filter = require('lodash/filter')
const child_process = require('child_process')

const getWiFiAdapterAddress = () => {
    const wifi = filter(os.networkInterfaces()['Wi-Fi'],
        (net) => net.family === 'IPv4')
    return wifi[0].address
}

const options = { env: process.env }
options.env['REACT_NATIVE_PACKAGER_HOSTNAME'] = getWiFiAdapterAddress()

const p = child_process.spawn('npm.cmd', ['start'], options)

p.stdout.on('data', (data) => {
    console.log(data.toString())
})
p.stderr.on('data', (data) => {
    console.log(data.toString())
})
p.on('exit', (code) => {
    console.log('Child process exited with code ' + code.toString())
})

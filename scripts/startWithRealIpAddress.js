const os = require('os')
const filter = require('lodash/filter')
const child_process = require('child_process')

const wifi = filter(os.networkInterfaces()['Wi-Fi'],
    (net) => net.family === 'IPv4')
const address = wifi[0].address
const options = { env: process.env }
options.env['REACT_NATIVE_PACKAGER_HOSTNAME'] = address

// TODO link up stdout/stderr
child_process.execFileSync('npm.cmd', ['start'], options)

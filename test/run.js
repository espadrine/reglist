var Reglist = require('../api.js')
var reglist = new Reglist()
reglist.add([
  /[^\-]*-([^\-])/,
  /data:([a-z\/]+)(?:;base64|;binary),.+/,
])
var matched = reglist.match("data:text/plain;base64,aDfwkTPmx98==")
console.log(matched)

# Reglist, a Regular Expression List Compiler.

Take a list of regexes and make a single regex. Gives you which regex matched
and its matching groups.

```js
var Reglist = require('reglist')
var reglist = new Reglist()
reglist.add([
  /[^\-]*-([^\-])/,
  /data:([a-z\/]+)(?:;base64|;binary),.+/,
])
var matched = reglist.match("data:text/plain;base64,aDfwkTPmx98==")
// { index: 1,
//   match: [ 'data:text/plain;base64,aDfwkTPmx98==', 'text/plain' ] }
```

## Speed

This is meant to be faster than executing the whole list of regexes in a loop.
I have no idea whether it is actually faster. Science has yet to come.

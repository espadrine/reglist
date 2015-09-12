var assert = require('assert')

var Reglist = require('../api.js')
var reglist = new Reglist()
var dataRegex = /\(data:([a-z\/]+)(?:;base64|;binary),.+\)/
reglist.add([/[^\-]* ([^\-])/])
reglist.push(dataRegex)

// Test that it matches the first regex
var matched = reglist.match("Ann Frank")
assert.equal(matched.index, 0, 'The name regex should be matched')
assert.equal(matched.match[0], 'Ann F',
  'The name regex should match the whole name')
assert.equal(matched.match[1], 'F',
  'The name regex should match the last initial')

// Test that it matches just like a normal string
var dataString = "(data:text/plain;base64,aDfwkTPmx98==)"
var matched = reglist.match(dataString)
assert.equal(matched.index, 1, 'The data: URL should match the data: regex')
var normalMatch = dataString.match(dataRegex)
assert.equal(matched.match[0], normalMatch[0],
  'The data: regex matches the whole thing')
assert.equal(matched.match[1], normalMatch[1],
  'The data: regex matches the MIME type')

// Test that it doesn't match something that doesn't match
var isMatch = reglist.test("whatever")
assert(!isMatch, 'whatever does not match')

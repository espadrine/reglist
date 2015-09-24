// Reglist interface.

var countMatchers = function(source) {
  // Non-matching: \(\) and (?:).
  var backslash = false
  var count = 0
  for (var i = 0; i < source.length; i++) {
    var c = source.charCodeAt(i)
    if (c === 40) {  // parenthesis
      if (!backslash) {
        // We still must be sure that it is not (?:).
        if (source.charCodeAt(i+1) !== 63 ||
            source.charCodeAt(i+2) !== 58) {
          count += 1
        }
      }
    }
    if (c === 92) {  // backslash
      backslash = true
    } else {
      backslash = false
    }
  }
  return count
}

var Regdata = function(regex) {
  this.regex = regex
  this.ngroups = countMatchers(regex.source)
}

var Reglist = function() {
  // List of Regdata.
  this.regexes = []
  // Generic regex
  this.full = null
}

Reglist.prototype = {
  mkfull: function() {
    var regex = ''
    for (var i = 0; i < this.regexes.length; i++) {
      if (i !== 0) {
        regex += '|'
      }
      regex += '(' + this.regexes[i].regex.source + ')'
    }
    this.full = new RegExp(regex)
  },
  add: function(regexes) {
    for (var i = 0; i < regexes.length; i++) {
      this.regexes.push(new Regdata(regexes[i]))
    }
    this.mkfull()
  },
  push: function(regex) {
    this.regexes.push(new Regdata(regex))
    this.mkfull()
  },
  groupIndex: function(i) {
    var index = 1  // The first group is the whole `full` match.
    for (var j = 0; j < i; j++) {
      index += this.regexes[j].ngroups + 1
    }
    return index
  },
  match: function(string) {
    var matched = this.full.exec(string)
    if (matched === null) { return null; }
    // Which regex are we matching?
    for (var i = 0; i < this.regexes.length; i++) {
      var groupIndex = this.groupIndex(i)
      if (matched[groupIndex]) {
        var index = i
        var match = matched.slice(groupIndex,
            groupIndex + this.regexes[i].ngroups + 1)
        break;
      }
    }

    return {
      index: index,
      match: match,
    }
  },
  test: function(string) {
    return this.full.test(string);
  },
}

module.exports = Reglist

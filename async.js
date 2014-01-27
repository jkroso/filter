
var when = require('result').when
var map = require('map/async')

module.exports = filter

function filter(arr, fn, ctx){
  return when(map(arr, fn, ctx), function(oks){
    var res = []
    for (var i = 0, len = oks.length; i < len; i++) {
      if (oks[i]) res.push(arr[i])
    }
    return res
  })
}

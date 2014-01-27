
var map = require('map/async')
var Result = require('result')
var unbox = Result.unbox
var when = Result.when

module.exports = filter

function filter(arr, fn, ctx){
  return when(map(arr, fn, ctx), function(oks){
    arr = unbox(arr)
    var res = []
    for (var i = 0, len = oks.length; i < len; i++) {
      if (oks[i]) res.push(arr[i])
    }
    return res
  })
}


module.exports = filter

/**
 * select the items from `array` which are truthy values of `fn`
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Any} ctx
 * @return {Array}
 */

function filter(arr, fn, ctx){
  var res = []
  for (var k = 0, len = arr.length; k < len; k++) {
    if (fn.call(ctx, arr[k], k)) res.push(arr[k])
  }
  return res
}

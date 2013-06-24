
/**
 * select items from `obj` which pass `pred`
 * 
 * @param {Object|Array} obj
 * @param {Function} pred
 * @param {Any} ctx
 * @return {Object|Array}
 */

module.exports = function(obj, pred, ctx){
	if (typeof obj.length == 'number') {
		var res = []
		for (var k = 0, len = obj.length; k < len; k++) {
			if (pred.call(ctx, obj[k], k)) res.push(obj[k])
		}
	} else {
		var res = {}
		for (var k in obj) {
			if (pred.call(ctx, obj[k], k)) res[k] = obj[k]
		}
	}
	return res
}
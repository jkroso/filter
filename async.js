
var decorate = require('when/decorate')
  , ResultType = require('result-type')
  , map = require('map/async')
  , Result = require('result')

module.exports = decorate(parallelFilter)
module.exports.plain = parallelFilter

function parallelFilter(obj, pred, ctx){
	if (typeof obj.length == 'number') {
		return map(obj, pred, ctx).then(function(oks){
			var res = []
			for (var i = 0, len = oks.length; i < len; i++) {
				if (oks[i]) res.push(obj[i])
			}
			return res
		})
	}
	return objectFilter(obj, pred, ctx)
}

function objectFilter(obj, pred, ctx){
	var res = {}
	var pending = 0
	var done = false
	var result = new Result
	var fail = function(e){
		result.error(e)
	}
	var adder = function(key){
		return function(ok){
			if (ok) res[key] = obj[key]
			if (--pending === 0 && done) result.write(res)
		}
	}

	for (var key in obj) {
		try { var ok = pred.call(ctx, obj[key], key) }
		catch (e) { return result.error(e) }
		if (ok instanceof ResultType) {
			pending++
			ok.read(adder(key), fail)
		} else if (ok) {
			res[key] = obj[key]
		}
	}

	if (pending === 0) result.write(res)
	else done = true

	return result
}
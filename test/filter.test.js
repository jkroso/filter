
var async = require('../async')
var chai = require('./chai')
var filter = require('..')

function notTwo(n){
	return n !== 2
}

describe('filter', function(){
	it('should work on arrays', function(){
		filter([1,2,3], notTwo).should.eql([1,3])
	})
	it('should work on object', function(){
		filter({a:1,b:2,c:3}, notTwo).should.eql({a:1,c:3})
	})
})

describe('async', function(){
	function isEven(n, i){
		return delay(n % 2 === 0)
	}
	it('should maintain order in arrays', function(done){
		async([1,2,3,4,5,6,7,8,9], isEven).then(function(arr){
			arr.should.eql([2,4,6,8])
		}).node(done)
	})

	it('should work on objects', function(done){
		async({a:1,b:2,c:3,d:4}, isEven).then(function(obj){
			obj.should.eql({b:2,d:4})
		}).node(done)
	})

	describe('error handling', function(){
		var test = 1
		var error
		beforeEach(function(){
			error = new Error(test++)
		})
		describe('sync errors', function(){
			function thro(){
				throw error
			}
			it('arrays', function(done){
				async([1,2,3], thro).then(null, function(e){
					e.should.equal(error)
					done()
				})
			})

			it('objects', function(done){
				async({a:1,b:2,c:3}, thro).then(null, function(e){
					e.should.equal(error)
					done()
				})
			})
		})

		describe('async errors', function(){
			function thro(){
				return delay(error)
			}
			it('arrays', function(done){
				async([1,2,3], thro).then(null, function(e){
					e.should.equal(error)
					done()
				})
			})

			it('objects', function(done){
				async({a:1,b:2,c:3}, thro).then(null, function(e){
					e.should.equal(error)
					done()
				})
			})
		})
	})
})
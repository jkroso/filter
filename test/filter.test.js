
var filter = require('..')

it('should remove falsy mappings', function(){
  filter([1,2,3], notTwo).should.eql([1,3])
})

it('should call `fn` in the context of `ctx`', function(){
  var ctx = {}
  filter([1,2,3], function(n){
    this.should.equal(ctx)
  }, ctx)
})

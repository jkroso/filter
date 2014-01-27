
var filter = require('../async')

it('should maintain order', function(done){
  filter([1,2,3,4,5,6,7,8,9], isEven).then(function(arr){
    arr.should.eql([2,4,6,8])
  }).node(done)
})

it('delayed input', function(done){
  filter(delay([1,2,3]), isEven).then(function(arr){
    arr.should.eql([2])
  }).node(done)
})

describe('error handling', function(){
  it('sync errors', function(done){
    filter([1,2,3], function(){
      throw new Error('boom')
    }).then(null, function(e){
      e.should.be.an.instanceOf(Error)
      e.should.have.property('message', 'boom')
      done()
    })
  })

  it('async errors', function(){
    filter([1,2,3], function(){
      return delay(new Error('boom'))
    }).then(null, function(e){
      e.should.be.an.instanceOf(Error)
      e.should.have.property('message', 'boom')
      done()
    })
  })
})

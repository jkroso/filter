
var Result = require('result')

/**
 * Hydro configuration
 *
 * @param {Hydro} hydro
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'filter',
    timeout: 500,
    plugins: [
      require('hydro-clean-stacks'),
      require('hydro-chai'),
      require('hydro-bdd'),
    ],
    chai: {
      chai: require('chai'),
      styles: ['should', 'expect', 'assert'],
      stack: true
    },
    globals: {
      delay: function(value){
        var result = new Result
        setTimeout(function(){
          if (value instanceof Error) result.error(value)
          else result.write(value)
        }, 0)
        return result
      },
      notTwo: function(n){ return n !== 2 },
      isEven: function(n, i){ return delay(n % 2 === 0) }
    }
  })
}

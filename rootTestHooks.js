/**
 * these are root hooks
 */
exports.mochaHooks  = {
    beforeEach: [
      function(done) {
        //   console.log("before ------ root Each called");
          done();
        // do something before every test,
        // then run the next hook in this array
      },
    ],
    afterEach:function() {
      // Restore the default sandbox here
      // const sinon = require("sinon") 
      // sinon.restore();
    },
  };
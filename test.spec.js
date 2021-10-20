  // --reporter tap --reporter-option tapVersion=13

const assert = require('assert');

//for using async await you can use chai as promise. else you can use done() in 'it' function args.
const chaiAsPromised= require("chai-as-promised");
chai.use(chaiAsPromised);

// use to club all the test suits.
// by default mocha is bdd. Use g docs to refer bdd / tdd / acceptance test
describe("test suite started",function(){
    global.app = "global app variable;";

    // sets the global timeout for every tests and overall test
    this.timeout(5000);

    // the below console will be called first since it consoles before starting of the test so fixture wont be run firsts.
    console.log(process.env.NODE_ENV + " -> process.env.NODE_ENV")

    // before("run the before hook",()=>{
    //     console.log("beofore hook called top level but not root level. \n");
    // })
    // beforeEach("run the beforeEach hook",()=>{
    //     console.log("beforeEach hook called top level but not root level. \n");
    // })

    // after("run the after hook",()=>{
    //     console.log("after hook called top level but not root level. \n");
    // })

    // afterEach("run the afterEach hook",()=>{
    //     console.log("afterEach hook called  top level but not root level.\n");
    // })

    // use to test a scenario/function
    context("context 1 called",function(){


        /**
         * beforeEach once defined is then set for every context/describe and its child if any
         * So every context can have its own hooks or it will inherit from parents.
         */
         beforeEach("run the beforeEach hook for context 1",function(){
            // this timeout doesn't set timeout for tests. Sets Only for this hook
            this.timeout(1000)
            console.log("beforeEach hook called 1 \n");
        })


        /* to test each tests.
            you can use done callback received  as args and pass error to it. eg done(err) or done() 
            also avoid using arrow function since it losts the reference to mocha Context
        */
        it("test",function(done){
            this.timeout(700)
            setTimeout(function(){
                assert.strictEqual(1, 2)
                done()
            },500)
           console.log("it 1 called");
            // done("failll")
        })

        // it.skip to skip the test case or this.skip would do.
        it.skip("only description. Pending tests will be included in the test results, and marked as pending. \n  A pending test is not considered a failed test.")
    })

    /**
     * this.retries()
     * This feature does re-run a failed test and its corresponding beforeEach/afterEach hooks, but not before/after hooks. this.retries() has no effect on failing hooks.
     */
    



    context("context 2 called",()=>{
        // to test each tests.
        beforeEach("run the beforeEach hook for context 2",()=>{
            console.log("beforeEach hook called 2 \n");
        })
        it("test",function(){
         
            console.log("it 1-1 called");
        }
        )
        it("test",function(){

            console.log(this.timeout())
            console.log("it 1-2 called");
        })
    })
})








/***
 * 
 * for mocha to run in tdd.
 * Either create a .mocharc file and put module.exports = { ui: "tdd"}
 * 
 * or 
 * 
 * const {suite,test} = require("mocha")
 * 
 * 
 * 
   suite("test suite started",()=>{
    test("",()=>{
        //run your tests.
    })
})
 */
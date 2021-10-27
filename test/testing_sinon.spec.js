const sinon = require("sinon");
const assert = require("chai").assert;

describe("Fake-Test INIT:", function () {
  /**
   * FAKE STUB SINON ARE ALMOST THE SAME ITS JUST THE IMPLEMENTATION DIFFERENCE.
   */

  it("should be able to be used instead of spies", function () {
    const foo = {
      bar: () => {
        return "baz";
      },
    };
    // wrap existing method without changing its behaviour
    const fake = sinon.replace(foo, "bar", sinon.fake(foo.bar));

    assert.equal(fake(), "baz"); // behaviour is the same
    assert.equal(fake.callCount, 1); // calling information is saved
  });

  it("should have working callback", function () {
    const f = sinon.fake();
    const cb1 = function () {};
    const cb2 = function () {};

    /**
     * Only the last argument is considered as callback
     */
    f(1, 2, 3, cb1, cb2);
    assert.isTrue(f.callback === cb2);
    // spy call methods:
    assert.isTrue(f.getCall(0).callback === cb2);
    assert.isTrue(f.lastCall.callback === cb2);
  });

  /***
   * 
   * NOW STUBS...
   * stub.reset();
      Resets both behaviour and history of the stub.
      This is equivalent to calling both stub.resetBehavior() and stub.resetHistory()
   */

  it("STUB LIb: should have working callback", function () {
    const callback = sinon.stub();
    const myObj = {
      prop: function () {
        console.log("prop called");
        return "aa";
      },
    };
    callback.withArgs(42).returns(1);
    callback.withArgs(1).throws("name");
    // in this it doesn't affect anything since nothing is specified.
    callback.resetBehavior();
    callback.onCall(0).returns(1);
    callback.onCall(1).returns(2);
    callback.returns(3);

    sinon.stub(myObj, "prop").callsFake(function fakeFn() {
      console.log("callsfake function");
      return "bar";
    });
    assert.equal(myObj.prop(), "bar");
  });
  it("should call through with new operator", function () {
    const obj = {};
    obj.Sum = function MyConstructor(a, b) {
      this.result = a + b;
    };
    sinon
      .stub(obj, "Sum")
      .callThroughWithNew()
      .withArgs(1, 2)
      .returns({ result: 9000 });

    assert.equal(new obj.Sum(2, 2).result, 4);
    assert.equal(new obj.Sum(1, 2).result, 9000);
  });
});




describe("SPIES: Wrap all object methods", function () {
  const myExternalLibrary = {
    getJSON(url) {
        return this._doNetworkCall({ url: url, dataType: "json" });
    },
    _doNetworkCall(httpParams) {
        // console.log("Simulating fetching stuff from the network: ", httpParams);
        return { result: 42 };
    },
};

  const sandbox = sinon.createSandbox();

  beforeEach(function () {
      sandbox.spy(myExternalLibrary);
  });

  afterEach(function () {
      sandbox.restore();
  });

  it("should inspect the external lib's usage of its internal methods", function () {
      const url = "https://jsonplaceholder.typicode.com/todos/1";
      myExternalLibrary.getJSON(url);

      assert(myExternalLibrary.getJSON.calledOnce);
      assert(myExternalLibrary._doNetworkCall.calledOnce);
      assert.equal(
          url,
          myExternalLibrary._doNetworkCall.getCall(0).args[0].url
      );
      assert.equal(
          "json",
          myExternalLibrary._doNetworkCall.getCall(0).args[0].dataType
      );
  });
});

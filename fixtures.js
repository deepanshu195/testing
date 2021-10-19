// can be async or not
exports.mochaGlobalSetup = async function() {
    this.port = "xyz"
    console.log(`server running on port `+this.port);
  };
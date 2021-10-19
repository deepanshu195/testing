/*
    global fixture share the same context.
    the function name is to be written like that only.
    so both fixture file share the same context
*/
exports.mochaGlobalTeardown = async function() {
    console.log('server stopped! '+ this.port);
  };
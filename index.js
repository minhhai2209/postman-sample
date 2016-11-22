var newman = require('newman'); // require newman in your project

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

global.qasymphony = {
  environment: {
    'req1': 'mot',
    'req2': 'hai'
  },
  globals: {
    'req1': 'mot',
    'req2': 'hai'
  }
};

var stopped = false;

// call newman.run to pass `options` object and wait for callback
newman.run({
  collection: require('./sample-collection.json'),
  reporters: 'cli'
}, function (err) {
  if (err) { throw err; }
  console.log('collection run complete!');
}).on('beforeTest', function() {
  if (!stopped) {
    // global.qasymphony.globals.req3 = 'ba';
    global.qasymphony.nextRequest = 'ba';
    stopped = true;
  }
});
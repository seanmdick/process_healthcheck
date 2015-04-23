var http = require('http'),
  assert = require('assert'),
  child_process = require('child_process'),
  args = require('minimist')(process.argv.slice(2)),
  blackList = /[`;&|\\'"!$]/,
  processPath;

if (args.h || args.help) {
  console.info('Options: \
    \n\t--port: \tport for the server to run on. **required** \
    \n\t--watch:\tservice name to watch via "/etc/init.d/<specified> status" **required** \
    \n\t-h --help:\tdisplay this message.');
  return;
}

assert.ok(args.port, 'Port must be specified.');
assert.ok(args.watch, 'Watched process name must be specified.');
assert.doesNotThrow(nonMaliciousWatchArgument, "Specified watch command is invalid");

processPath = '/etc/init.d/'+args.watch;

http.createServer(function (req, res) {
  var check = checkHealth();

  if (check) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("PONG")
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.end("");
  }
}).listen(args.port, function() {
  console.info('Process healthcheck running for ' + args.watch + ' on port ' + args.port);
});

function checkHealth () {
  child_process.execFile(processPath, ['status'], function(err, stdout, stderr) {
    if (err || stderr.length > 0 || parseInt(stdout, 10) > 0) {
      return false;
    } else {
      return true;
    }
  });
}

function nonMaliciousWatchArgument () {
  if (blackList.test(args.watch)) {
    throw new Error('Bad characters');
  }
}
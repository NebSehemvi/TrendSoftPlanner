var http = require('http');
var url = require('url');
var qs = require('querystring');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
 if (req.method == 'GET') {
  file.serve(req, res);
  }
}).listen(8080);

console.log('Server running on port 8080');

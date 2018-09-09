var express = require('express')
var app = express()
var util = require('util')
var os = require('os')

const PORT = process.env.PORT || 3000
const HOSTNAME = os.hostname()

app.get('/', function (req, res) {
  res.send(util.format('Welcome to %s the current time is %d.', HOSTNAME, new Date())) 
})

var server = app.listen(PORT, function() {
  console.log('Webserver started on host: ', HOSTNAME)
  console.log('Webserver started on port: ', PORT)
});

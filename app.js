var express = require('express')
var app = express()
var util = require('util')
var os = require('os')
var AwsS3 = require ('aws-sdk/clients/s3')

const PORT = process.env.PORT || 3000
const HOSTNAME = os.hostname()

app.get('/', function (req, res) {
  res.send(util.format('Welcome to %s the current time is %d.', HOSTNAME, new Date()))
})

app.get('/bucket', function (req, res) {
  var bucketname = process.env.BUCKET_NAME || req.query.name
  var s3 = new AwsS3({apiVersion: '2006-03-01'})
  const s3params = {
    Bucket: bucketname,
    MaxKeys: 20,
    Delimiter: '/',
  }
  s3.listObjectsV2(s3params, function(err, data) {
   if (err) {
     // an error occurred
     console.log(err, err.stack)
     res.send("An error has occurred. Don't forget to specify bucket name: http://host/bucket?name=\'bucketname\'.")
   } else {
     // successful response
     console.log(data)
     res.send(data)
   }
 })
})


var server = app.listen(PORT, function() {
  console.log('Webserver started on host: ', HOSTNAME)
  console.log('Webserver started on port: ', PORT)
});

var mongoose = require('mongoose')
var express = require('express')
var app = express()
var util = require('util')
var os = require('os')

var Todo = require('./model/Todo');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/tododb'
const PORT = process.env.PORT || 3000
const HOSTNAME = os.hostname()

app.get('/', function (req, res) {
  res.send(util.format('Welcome to %s the current time is %d.', HOSTNAME, new Date()))

})

// Use the body parser for reteiving the form data.
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/todos', function (req, res) {
  var where = {}
  var fields = { name: true, _id: false }
  Todo.find(where, fields, function (err, todos) {
    if (err) {
      console.error(err);
      res.status(500).json({error: "true", message: "Cannot find todos"});
    }
    // Hacky inline html for a form and a list.
    var form = '<form action="/todos" method="POST"><input type="text" name="todo"><input type="submit" value="Submit"></form>'
    var content = '<ol>'
    for (var i = 0; i < todos.length; i++) {
      content += '<li>'
      content += todos[i].name
      content += '</li>'
    }
    content += '</ol>'
    res.send('<html><head></head><body>' + form + content + '</body></html>')
  })
})

app.post('/todos', function (req, res) {
  console.log(req.body.todo)
  var todo = new Todo({ name: req.body.todo });
  todo.save(function (err) {
    if (err) return console.error(err);
  });
  res.send('Ok')
})

// Connect to the database
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('* Connected to database.');
});

var server = app.listen(PORT, function() {
  console.log('Webserver started on host: ', HOSTNAME)
  console.log('Webserver started on port: ', PORT)
});

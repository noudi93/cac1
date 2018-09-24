const pg = require('pg');
var express = require('express')
var app = express()
var util = require('util')
var os = require('os')

const DB_URL = process.env.DB_URL || 'postgres://postgres@localhost:5432/tododb'
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
  const client = new pg.Client(DB_URL)
  client.connect((err) => {
    if (err) {
      console.error('Postgres status: Connection error', err.stack)
      return res.send('Error connecting')
    } else {
      console.log('Postgres status: Connected')
      client.query('SELECT * FROM items ORDER BY id ASC;',
      (err, resp) => {
        if (err) throw err
        console.log(resp)
        // Hacky inline html for a form and a list.
        var form = '<form action="/todos" method="POST"><input type="text" name="todo"><input type="submit" value="Submit"></form>'
        var content = '<ol>'
        for (var i = 0; i < resp.rows.length; i++) {
          console.log(i + ' ' + resp.rows[i].text)
          content += '<li>'
          content += resp.rows[i].text
          content += '</li>'
        }
        content += '</ol>'
        res.send('<html><head></head><body><p>Postgres demo:</p>' + form + content + '</body></html>')
        client.end()
      })
    }
  })
})

app.post('/todos', function (req, res) {
  console.log(req.body.todo)
  const client = new pg.Client(DB_URL)
  client.connect((err) => {
    if (err) {
      console.error('Postgres status: Connection error', err.stack)
      return res.send('Error connecting')
    } else {
      console.log('Postgres status: Connected')
      client.query('INSERT INTO items(text, complete) values($1, $2)',
      [req.body.todo, false],
      (err, resp) => {
        if (err) throw err
        console.log(resp)
        client.end()
        res.send('Ok')
      })
    }
  })
})

// Connect to the database
const client = new pg.Client(DB_URL);
client.connect((err) => {
  if (err) {
    console.error('Postgres status: Connection error', err.stack)
  } else {
    console.log('Postgres status: Connected')
  }
})

client.query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})

var server = app.listen(PORT, function() {
  console.log('Webserver started on host: ', HOSTNAME)
  console.log('Webserver started on port: ', PORT)
});

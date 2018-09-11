# Simple Web App
This is a simple web application implemented in ExpressJS that displays the
hostname of the server and the current time.

## Prerequisites
The server running the application should have NodeJS (8.x) installed.
Read [here](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) how to install NodeJS on Ubuntu.

## How to install
Clone this repository to the server:
```
 $ git clone https://github.com/TimothySealy/cac-simple-webapp.git
 $ cd cac-simple-webapp
```
Install dependencies (once) and then run the application:
```
 $ npm install
 $ npm run start
```

## Environment variables
The web application runs on port 3000 by default.
The port can be changed using the PORT environment variable.
For example:
```
 $ export PORT=80
```

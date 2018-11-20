const express = require('express');
const app = express();
const moment = require('moment');
const wiki = require('./wiki.js');
const square = require('./square');
const port = process.env.PORT || 8081;

const sq = square;

/*middleware section*/
const myLogger = function (req, res, next) {
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    next();
}

const requestTime = function (req, res, next) {
    req.requestTime = moment().format('YYYY/MM/D hh:mm:ss SSS');
    next();
}

const cb0 = function (req, res, next) {
  console.log('printing CB0');
  next()
}

const cb1 = function (req, res, next) {
  console.log('printing CB1');
  next()
}

app.use(myLogger);
app.use(requestTime);
app.use('/wiki', wiki);

app.get('/', function (req, res, next) {
    let responseText = '<h3>Main Page</h3>'
    responseText += '<small>The area of a square with a width of 4 is ' + sq.area(4) + '</small><br>';
    responseText += '<small>Requested at: ' + req.requestTime + '</small><br>'
    res.send(responseText);
    next()
})

app.get('/point/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function ( req, res) {
    res.send('You are at point D!')
})

app.listen(port, function() {
    console.log("listening on port", port);
})
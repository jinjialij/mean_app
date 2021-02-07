const { request } = require("http");

const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first middleware');
  //call next if you don't send response. Otherwise, it will run untill timeout
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express');//send back response to client
});

module.exports = app;

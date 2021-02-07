const { request } = require("http");

const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use('/api/posts',(req, res, next) => {
  const post = [
    { id:'0001', title: 'First server-side post', content:'Server-side post content 1'},
    { id:'0002', title: 'Second server-side post', content:'Server-side post content 2'}
  ];
  res.status(200).json({
    message: 'Post fetched successfully',
    posts: post
  });//send back response to client
});

module.exports = app;

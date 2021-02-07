const { request } = require("http");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//add a middleware for all requests
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'Post added successfully'
  });
});

app.get('/api/posts',(req, res, next) => {
  const post = [
    { id:'0001', title: 'First server-side post', content:'Server-side post content 1'},
    { id:'0002', title: 'Second server-side post', content:'Server-side post content 2'}
  ];

  //send back response to client
  res.status(200).json({
    message: 'Post fetched successfully',
    posts: post
  });
});

module.exports = app;

const { request } = require("http");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect("mongodb+srv://jin:IY9Pu4I3c2ofK2Ri@cluster0.ezdae.mongodb.net/SIMPLE-POST?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect to database successfully!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

//add a middleware for all requests
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    //send back response to client
    res.status(200).json({
      message: 'Post fetched successfully',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({ message: "Post delete!" });
  });

});

module.exports = app;

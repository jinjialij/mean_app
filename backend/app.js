const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const connectionString = `mongodb+srv://${process.env.MONGO_ALTAS_USERNAME}:${process.env.MONGO_ALTAS_PW}@cluster0.ezdae.mongodb.net/SIMPLE-POST?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect to database successfully!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


//add a middleware for all requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/", express.static(path.join(__dirname, "/simple-post")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "simple-post", "index.html"));
});

module.exports = app;

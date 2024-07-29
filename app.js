const mimi = require("mimi.js");
const path = require("path");
const express = require("express");
const { mongodbManager } = require("mimi.js");
const liveuri =
  "mongodb+srv://iamskthakur121:qwerty123456@cluster0.xdgfsqw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
const mongoDb = new mongodbManager(liveuri);
mongoDb
  .connect()
  .then((result) => {
    console.log("connecting");
  })
  .catch((err) => {
    console.log("error connecting");
  });
const app = mimi();

// Create a route to serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("sever running port 3200");
});

module.exports = app;

const express = require("express");
const server = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');


const EntryController = require('./controllers/entry')

server.use(express.json()); 

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.post("/entry", EntryController.Create);


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;



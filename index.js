const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// auth and api routes
app.use('/api', require('./api'))


app.listen(8080, function() {
  console.log("~~~~ Server listening on 8080 ~~~~");
});

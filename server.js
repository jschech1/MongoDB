var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// var axios = require("axios");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });


// var db = mongoose.connection;

// var MONGODB_URI = process.env.MONGODB_URI


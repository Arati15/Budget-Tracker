const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



var databaseUri = `mongodb://localhost/budget`;
  

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}else {
    mongoose.connect(databaseUri);
}
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose error:', err)
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
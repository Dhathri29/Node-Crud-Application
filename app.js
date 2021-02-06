const express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
//var session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//include routes
const product = require("./routes/product");

// Set view engine
app.set("view engine", "ejs");

// User Middleware
app.use("/", product);

// Start Server
app.listen(3000, () => {
    console.log("Server started");
});

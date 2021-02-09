const express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

const app = express();

var options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "userjs",
};

var sessionStore = new MySQLStore(options);

app.use(
    session({
        resave: false, //not to store the sessions if they r not modified
        saveUninitialized: false,
        secret: "secret key",
        store: sessionStore,
    })
);

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

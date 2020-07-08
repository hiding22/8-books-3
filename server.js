// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transRoute = require('./routes/trans.route');

const app = express();
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//------Books------------------------------------
app.use('/books', bookRoute);

//-------Users----------------------------------------

app.use('/users', userRoute);

//-----Transactions------------
app.use('/transactions', transRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

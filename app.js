var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var index = require('./routes/index');
var search = require('./routes/search');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use('/', index);
app.use('/search', search);
app.listen(1337);
console.log('Server running on port 1337');
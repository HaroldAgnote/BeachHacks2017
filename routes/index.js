var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

// var someAPIKey = fs.readFileSync(path.join(__dirname, '../APIKeyFile'), 'utf8').replace(/\r?\n|\r/g,'');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MyApp',
        // SomAPIKey: someAPIKey
    });
});

module.exports = router;
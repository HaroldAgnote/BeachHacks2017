var express = require('express');
var fs = require('fs');
var path = require('path');
var https = require('https');
var router = express.Router();
/*
https://www.googleapis.com/youtube/v3/search?key=<keyHereNoBrackets>&part=snippet&maxResults=50&q=<searchTermHereNoBrackets>
*/
var key = fs.readFileSync(path.join(__dirname, '../youtubeAPI_key'), 'utf8').replace(/\r?\n|\r/g,''); // Remove line endings.
router.get('/', function(req, res, next) {
    res.send('Nothing to see here!');
});

router.post('/', function(req, res, next) {
    var searchTerm = req.body.searchTerm;
    console.log(req.body.searchTerm + "#1");
    if (searchTerm === '') {
        return res.json({'error': 'No search term provided.'});
    }
    var getData = function(callback){
        var searchData = 
            '/youtube/v3/search?' 
                + 'key=' + key + 
                '&part=snippet' + 
                '&maxResults=50' + '&q=' + encodeURIComponent(searchTerm);
        var options = {
                hostname: 'www.googleapis.com',
                port: 443,
                path: searchData,
                method: 'GET'
        }
        console.log(searchData);
        https.request(options , function(res) {
            res.setEncoding('utf8');
            var json = [];
            res.on('data', function (chunk){
                   json.push(chunk);
            });
            res.on('end', function() {
               callback(json.join('')) 
            });
        }).end();
    };
    getData(function(json){
            res.json(JSON.parse(json));
    });
           
});
    /* 
    yelp.getToken(function (token) {
        var searchPath = '/v3/businesses/search?' +
                            'term=' + encodeURIComponent(searchTerm) +
                            '&latitude=' + latitude +
                            '&longitude=' + longitude +
                            '&limit=50';
        var getData = function(callback) {
            var options = {
                hostname: 'api.yelp.com',
                port: 443,
                path: searchPath,
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token}
            };
            https.request(options, function(res) {
                res.setEncoding('utf8');
                var json = [];
                res.on('data', function (chunk) {
                    json.push(chunk);
                });
                res.on('end', function() {
                    callback(json.join(''));
                });
            }).end();
        };
        getData(function(json) {
            res.json(JSON.parse(json));
        });
        // res.json({'a':'a'});
    });
});
*/

module.exports = router;
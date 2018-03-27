var request = require('request');
var file = require('./config');

functions = {
    search: function(req, res) {
        var Twitter = require('twitter-node-client').Twitter;
        var twitter = new Twitter(file.config);
        var error = function (err, response, body) {
            console.log('ERROR : ' + err);
        };
        var success = function (data) {
            res.json({success: true, data:JSON.parse(data)});
        };
        twitter.getHomeTimeline({ count: '10'}, error, success);
    }
}
module.exports = functions;
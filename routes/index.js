var express = require('express');
var router = express.Router();
const https = require('https');
require('dotenv').load();


/* GET home page. */
router.get('/', function(req, res, next) {
    function render() {
      res.render('index', { title: `${this.city}, ${this.state}`});
    }
    
	https.get({
        host: 'api.foursquare.com',
        path: `/v2/users/self/checkins?limit=1&oauth_token=${process.env.ACCESS_TOKEN}&v=20160228`
        }, (res) => {
	  console.log('statusCode: ', res.statusCode);
	  console.log('headers: ', res.headers);
      var body = '';
	  res.on('data', (d) => {
         body += d;
	  });
      
      res.on('end', (d)=>{
          var parsed = JSON.parse(body);
          this.city = parsed.response.checkins.items[0].venue.location.city;
          this.state = parsed.response.checkins.items[0].venue.location.state;
          render();
      });

	}).on('error', (e) => {
	  console.error(e);
	});

});

module.exports = router;

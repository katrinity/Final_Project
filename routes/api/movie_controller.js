var express = require("express");
var router = express.Router();
var Crypto = require('crypto-js');
var $ = require("jquery");
const https = require('https');
const axios = require("axios");


// Import the model (auth.js) to use its database functions.
var movie = require("../../models/movie.js");
const moviesController = require("../../controllers/moviesController");
const usersController = require("../../controllers/usersController");



// Create all our routes and set up logic within those routes where required.
router.get("/api/movies/:title", function(req, res) {
    //Get movie id from youtube for the given movie title
    axios({ method: "get", url: "https://www.youtube.com/results?search_query=" + req.params.title, responseType: "text"}).then(function(youtubeData){

      var index = youtubeData.data.indexOf("yt-lockup-video");
      var index = youtubeData.data.indexOf("https://i.ytimg.com/vi", index);
      var movie = youtubeData.data.substring(index+23, youtubeData.data.indexOf("/", index+23));
      console.log(movie);
      res.json({youtubeId: movie});
      


    });
    
});

// Create all our routes and set up logic within those routes where required.
router.post("/api/:user/movies", function(req, res) {
    
    var condition = {email: req.body.email};
    usersController.findAll(condition,function(result) {
        if(result.length > 0) {
            req.body.userid = result[0]._id;
            delete req.body.email;
            moviesController.create(req,res);
        } else {
            res.json({result: "failure"});
        }
    }, function(err) {console.log(err)});
    
});

router.get("/api/movies", function(req, res) {
    getMovies(req,res);
});

function getMovies(req,res1) {
        var movieTrailers = [];
        //Get movie list from rottentomatoes
        axios({method: "get", url: "https://www.rottentomatoes.com/trailers"}).then( function(res,status) {
            res = res.data;
            var index1 = res.indexOf('id="jsonLdSchema">');
            var index2 = res.indexOf('<\/script>',index1);
            var movieData = JSON.parse(res.substring(index1+18,index2));
            
            //Go after top 5 movies
            for(var i = 0; i < 5; i++) {
                var movie = movieData.itemListElement[1].item.itemListElement[i].url;
                //Just get the name from the url
                var name = movie.substring(33);
                //Replace _s
                name = name.replace(new RegExp('_', 'g')," ");
        
                var wordsInName = name.split(" ");
                var year = wordsInName.pop();
                var name1 = wordsInName.join(" ");
                var url = null;
                var finalName;
        
                //Form the omdbapi URL for the movie title
                if(isNaN(year)) {
                    finalName = name;
                } else {
                    finalName = name1;
                }
                finalName = finalName + " trailer";
                axios({ method: "get", url: "https://www.youtube.com/results?search_query=" + finalName, responseType: "text"}).then(function(youtubeData){

                    var index = youtubeData.data.indexOf("yt-lockup-video");
                    var index = youtubeData.data.indexOf("https://i.ytimg.com/vi", index);
                    var movie = youtubeData.data.substring(index+23, youtubeData.data.indexOf("/", index+23));
                    movieTrailers.push({youtubeId: movie});
                    if(movieTrailers.length >= 5) {
                        res1.json({result: movieTrailers});
                    }

                });
                
            }
        });
}


// Export routes for server.js to use.
module.exports = router;

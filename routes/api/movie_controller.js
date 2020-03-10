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

router.get("/api/:email/movies/:cat", function(req, res) {
    var condition = {email: req.params.email};
    usersController.findAll(condition,function(result) {
        if(result.length > 0) {
            req.body.userid = result[0]._id;
            delete req.body.email;
            condition = {category: req.params.cat, userid: req.body.userid};
            moviesController.findAll(condition,function(result) {
                res.json(result);
            });
        } else {
            res.json({result: "failure"});
        }
    }, function(err) {console.log(err)});
});

router.delete("/api/:email/movies/:id", function(req, res) {
    
    moviesController.remove(req,res);
        
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

router.get("/api/trending-movies", function(req, res) {
    getTrendingMovies(req,res);
});

function getTrendingMovies(req,res1) {
    var trendingMovies = [];
    var movieCount = {total: 10};
    //Get movie list from rottentomatoes
    axios({method: "get", url: "https://www.rottentomatoes.com/browse/in-theaters/"}).then( function(res,status) {
        res = res.data;
        var index1 = res.indexOf('var loadPage = (function(adPromise)');
        var index2 = res.indexOf('[{"id":',index1);
        var index3 = res.indexOf(']}]', index2);
        var movies = res.substring(index2, index3+4);
        var movieData = JSON.parse(res.substring(index2,index3+3));
        
        //Go after top 5 movies
        for(var i = 0, j = 0; i < movieData.length; i++) {
            var movie = movieData[i];
            if (Object.keys(movie).includes("mainTrailer")) {
                if(Object.keys(movie.mainTrailer).includes("sourceId")) {
                    j++;
                    getMovieImage(req,res1,trendingMovies, movie, movieCount);
                }
            }
            if(j >= 10) {
                break;
            }
            
            
        }
    });
}

function getMovieImage(req, res1, trendingMovies, movie, movieCount) {
    axios({ method: "get", url: "https://www.rottentomatoes.com" + movie.url }).then(function(movieDetails){

                var index1 = movieDetails.data.indexOf('application/ld+json">');
                var index2 = movieDetails.data.indexOf("</script>", index1);
                var movieTrailer = JSON.parse(movieDetails.data.substring(index1+21, index2));
                movie.image = movieTrailer.image;
                console.log(movie.image);
                if(movie.image.indexOf("740x290") >= 0) {
                    console.log("Movie count = " + movieCount.total);
                    trendingMovies.push({ movie: movie, youtubeId: movieTrailer});
                    if(trendingMovies.length >= movieCount.total) {
                        res1.json({result: trendingMovies});
                    }
                } else {
                    movieCount.total = movieCount.total - 1;
                    if(trendingMovies.length >= movieCount.total) {
                        res1.json({result: trendingMovies});
                    }
                }

            });

}

function getYoutubeTrailer(req,res1, trendingMovies, movie) {
    axios({ method: "get", url: "https://www.youtube.com/results?search_query=" + movie.title + " trailer", responseType: "text"}).then(function(youtubeData){

                var index = youtubeData.data.indexOf("yt-lockup-video");
                var index = youtubeData.data.indexOf("https://i.ytimg.com/vi", index);
                var movieTrailer = youtubeData.data.substring(index+23, youtubeData.data.indexOf("/", index+23));
                trendingMovies.push({ movie: movie, youtubeId: movieTrailer});
                if(trendingMovies.length >= 10) {
                    res1.json({result: trendingMovies});
                }

            });
}

router.get("/api/trending-tv", function(req, res) {
    getTrendingTV(req,res);
});

function getTrendingTV(req,res1) {
    var trendingMovies = [];
    //Get movie list from rottentomatoes
    axios({method: "get", url: "https://www.rottentomatoes.com/browse/tv-list-1"}).then( function(res,status) {
        res = res.data;
        var index1 = res.indexOf('var loadPage = (function(adPromise)');
        console.log("index1 = " + index1);
        var index2 = res.indexOf('[{"title":',index1);
        console.log("index2 = " + index2);
        var index3 = res.indexOf('}]', index2);
        console.log("index3 = " + index3);
        console.log("length = " + res.length);
        var movies = res.substring(index2, index3+3);
        // console.log("movies = " + movies.substring(index3,4));
        var movieData = JSON.parse(res.substring(index2,index3+2));
        
        // Go after top 5 movies
        for(var i = 0; i < 10; i++) {
            var movie = movieData[i];
            
            getYoutubeTrailer(req,res1,trendingMovies, movie);
            
        }
        //Go after top 5 movies
        // for(var i = 0, j = 0; i < movieData.length; i++) {
        //     var movie = movieData[i];
        //     console.log(Object.keys(movie));
        //     if (Object.keys(movie).includes("mainTrailer")) {
        //         if(Object.keys(movie.mainTrailer).includes("sourceId")) {
        //             j++;
        //             getMovieImage(req,res1,trendingMovies, movie, movieCount);
        //         }
        //     }
        //     if(j >= 10) {
        //         break;
        //     }
            
            
        // }
    });
}

function getMovies1(req,res1) {
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

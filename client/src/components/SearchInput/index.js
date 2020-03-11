import React, { Component } from "react";
import Review from "../Review"
import $ from "jquery";
const axios = require("axios");

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movie: [],
        movieDetail: [],
    };
  }
  keyPressed(event,myThis) {
    if (event.key === "Enter") {
      myThis.searchMovie($("#searchInput").val());
    }
  }
  searchMovie = (movieTitle) => {
    if($("#emoji1") != null) {
        $("#emoji1").remove();
    }
    $("#showEmoji").empty();
    $("#inputField").val("");
    axios.get(
        "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy"
      ).then( (response) => {
        if(response.data != null && response.data.Title != null) {
            var genre = response.data.Genre;
            if(genre.indexOf(",") >= 0) {
                genre = genre.substring(0,genre.indexOf(","));
            }
            var rating = this.getRottenTomatoesRating(response);
            this.setState({
                movie: [{ 
                    title: response.data.Title,
                    poster: response.data.Poster,
                    plot: response.data.Plot,
                    genre: genre,
                    runtime: response.data.Runtime,
                    rated: response.data.Rated,
                    year: response.data.Year,
                    rating: response.data.imdbRating,
                    ratingrt: rating
                }],
                movieDetail: [],
            });
        }
      });
}
getRottenTomatoesRating = (response) => {
    for(var i = 0; i < response.data.Ratings.length; i++) {
        if (response.data.Ratings[i].Source == "Rotten Tomatoes") {
            return response.data.Ratings[i].Value;
        } 
        
    }
    return "N/A";
}

getMovieDetails = (movie) => {
    var myThis = this;
    axios({ method: "get", url: "/api/trailers/" + movie.title}).then(function(youtubeData){

                movie.trailer = youtubeData.data.result;
                myThis.setState({movie: [], movieDetail: [movie]});
            });
}

drag = (ev) => {
    ev.dataTransfer.setData("text", "movie-from-search");
}
  render(){
    return (
        <>
      <div className="search-input">
        <input type="text" id="searchInput" className="inputs" placeholder="Search for a Movie"  onKeyPress={(event) => {this.keyPressed(event,this)}}/>
      </div>
      {
          this.state.movie.map((value,index) => {
            return <div class="list-group">
            <a onClick={() => {this.getMovieDetails(value)}} style={{background: 'black'}}  class="list-group-item list-group-item-action">
                <div style={{background: 'black'}} class="d-flex w-100 justify-content-between">
                    <img style={{width: '100px', height: '100px', float: 'left'}} src={value.poster}/>
                    <h5 class="mb-1 " style={{color: 'white', 'text-align': 'left'}} >{value.title} {value.year}</h5>
                    <small style={{color: 'white'}}>{value.ratingrt}</small>
                </div>
        
            </a>
          </div>
          })
       
      }

      {
          this.state.movieDetail.map((value,index) => {
              return <div className = 'container'>
              <div  onDragStart={this.drag} className = 'row'>
                  <div className = ' movie-frames col-12'>
                  <iframe  className="movie-frames d-block " src={"https://www.youtube.com/embed/"+value.trailer+"?rel=0"} frameborder="0"></iframe>
                  <div className= "movie-frames-detail">
                  <h5 class="mb-1 " style={{ 'text-align': 'left'}} >{value.title}</h5>
                  <small>{value.rated} | {value.runtime} | {value.genre} | {value.year}  </small>
                  <br />
                    <small>Rotten Tomatoes: {value.ratingrt} | IMDB: {value.rating}</small>
                  </div>
                  <div>
                <button className=" drop-down-button btn btn-outline-danger" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    +
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Comedy</a>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Must watch</a>
                    <a className="dropdown-item" href="#">Waste of time</a>
                </div>
            </div>
                  </div>
                  <div id="genre" className="d-none ">{value.genre}</div>
                  <div id="runtime" className="d-none ">{value.runtime}</div>
                  <div id="rated" className="d-none ">{value.rated}</div>
                  <div id="title" className="d-none ">{value.title}</div>
                  <div id="plot" className="d-none ">{value.plot}</div>
                  <div id="year" className="d-none ">{value.year}</div>
                  <div id="poster" className="d-none ">{value.poster}</div>
                  <div id="rating" className="d-none ">{value.rating}</div>
                  <div id="ratingrt" className="d-none ">{value.ratingrt}</div>
              </div>
              <Review />
          </div>
          
          })
      }
      
      
    </>
    );
  }
  
}

export default SearchInput;

import React, { Component } from "react";
import Review from "../Review"
import $ from "jquery";
// import Modal from 'react-modal';

const axios = require("axios");

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movies: [],
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
        "https://www.omdbapi.com/?s=" + movieTitle + "&apikey=trilogy"
      ).then( (response) => {
        console.log('response = '+response.data.Search.length);
        if(response.data.Search != null) {
            var movies = [];
            for(var i=0; i< response.data.Search.length; i++){
              movies[i]={
                title: response.data.Search[i].Title,
                poster: response.data.Search[i].Poster,
                year: response.data.Search[i].Year,
                imdbID: response.data.Search[i].imdbID,
                type: response.data.Search[i].Type
              }
            }
            console.log('movies = '+movies.length);
            this.setState({
                movies: movies,
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
    var year = movie.year.replace("–"," ");
    var url1 = "/api/trailers/" + movie.title + " "+movie.type + " " + year;
    console.log("url " + url1);
    axios({ method: "get", url: "/api/trailers/" + movie.title + " "+movie.type + " " + year}).then(function(youtubeData){

                movie.trailer = youtubeData.data.result;
                myThis.getMovieDetailFromOmdb(movie, myThis);
                
            });
}
getMovieDetailFromOmdb = (movie, myThis) => {
  axios.get(
    "https://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=trilogy"
  ).then( (response) => {
    if(response.data != null && response.data.Title != null) {
        var genre = response.data.Genre;
        if(genre.indexOf(",") >= 0) {
            genre = genre.substring(0,genre.indexOf(","));
        }
        var rating = this.getRottenTomatoesRating(response);
            movie.title= response.data.Title;
            movie.poster= response.data.Poster;
            movie.plot= response.data.Plot;
            movie.genre= genre;
            movie.runtime= response.data.Runtime;
            movie.rated= response.data.Rated;
            movie.year= response.data.Year;
            movie.rating= response.data.imdbRating;
            movie.ratingrt= rating;
            movie.imdbID= response.data.imdbID;
            movie.Type= response.data.Type;

      } 
      myThis.setState({ movieDetail: [movie]});  
      });

}
componentDidUpdate() {
  if(this.state.movieDetail.length > 0) {
    $('#launch-modal').click();
  }
  
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
      <button id="launch-modal" style={{visibility: 'hidden'}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#mModal">Hidden</button>
      {
          this.state.movies.map((value,index) => {
            return <div class="list-group">
            {/* <a onClick={() => {this.getMovieDetails(value)}} style={{background: 'black'}}  class="list-group-item list-group-item-action"> */}
          <a onClick={() => {this.getMovieDetails(value)}} style={{background: ' #152238'}}  className="list-group-item list-group-item-action"> 
                <div style={{background: ' #152238'}} class="d-flex w-100 justify-content-between">
                    <img style={{width: '100px', height: '100px', float: 'left'}} src={value.poster}/>
                    <h5 class="mb-1 " style={{color: 'white', 'text-align': 'left'}} >{value.title} {value.year}</h5>
                    <small style={{color: 'white'}}>{value.type}</small>
                </div>
             
            </a>
          </div>
          })
       
      }

      {
          this.state.movieDetail.map((value,index) => {
              return <div className="modal show modal-container row" id="mModal" data-show="true" role="dialog">
                      <div className="modal-dialog col-8" role="document">
                        <div className="modal-content">
                          
                          <div className="modal-body searchV">
                            
                              <div  onDragStart={this.drag} className = 'row'>
                                <div className = ' movie-frames col-12'>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
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
                                      <div className="dropdown-item" onClick={() => {this.props.cb("cat1")}} >Comedy</div>
                                      <div className="dropdown-item" onClick={() => {this.props.cb("cat2")}}>Action</div>
                                      <div className="dropdown-item" onClick={() => {this.props.cb("cat3")}}>Must watch</div>
                                      <div className="dropdown-item" onClick={() => {this.props.cb("cat4")}}>Waste of time</div>
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
                              <br></br>
                              <Review />
                            
                          </div>
                        </div>
                      </div>
                    </div>
          
          })
      }
      
      
    </>
    );
  }
  
}

export default SearchInput;

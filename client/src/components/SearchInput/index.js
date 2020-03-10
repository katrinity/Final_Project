import React, { Component } from "react";
import $ from "jquery";
const axios = require("axios");

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movie: {
            
        },
    };
  }
  keyPressed(event) {
    if (event.key === "Enter") {
      this.searchMovie($("#searchInput").val());
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
                movie: { 
                    title: response.data.Title,
                    poster: response.data.Poster,
                    plot: response.data.Plot,
                    genre: genre,
                    runtime: response.data.Runtime,
                    rated: response.data.Rated,
                    year: response.data.Year,
                    rating: response.data.imdbRating,
                    ratingrt: rating
                }
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
  render(){
    return (
        <>
      <div className="search-input">
        <input type="text" id="searchInput" className="inputs" placeholder="Search for a Movie"  onKeyPress={this.keyPressed}/>
      </div>
      <div class="list-group">
  <a href="#" style={{background: 'black'}}  class="list-group-item list-group-item-action">
    <div style={{background: 'black'}} class="d-flex w-100 justify-content-between">
      <img style={{width: '100px', height: '100px', float: 'left'}} src="https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg"/>
      <h5 class="mb-1 " style={{color: 'white', 'text-align': 'left'}} >List group item heading</h5>
      <small style={{color: 'white'}}>3 days ago</small>
    </div>
    
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
</div>
    </>
    );
  }
  
}

export default SearchInput;

import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

class Content extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movieDetail: [],
        };
      }

    getMovieDetails = (movie) => {
        var myThis = this;
        axios({ method: "get", url: "/api/trailers/" + movie.title + " "+movie.type}).then(function(youtubeData){
    
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
            myThis.setState({movies: [], movieDetail: [movie]});  
            });
      
      }

    render(){
        return(
            <div class="list-group">
            <a onClick={()=> this.getMovieDetails} style={{background: 'black'}}  class="list-group-item list-group-item-action">
                <div style={{background: 'black'}} class="d-flex w-100 justify-content-between">
                    <img style={{width: '100px', height: '100px', float: 'left'}} src={this.props.value.poster}/>
                    <h5 class="mb-1 " style={{color: 'white', 'text-align': 'left'}} >{this.props.value.title} {this.props.value.year}</h5>
                    <small style={{color: 'white'}}>{this.props.value.type}</small>
                </div>
        
            </a>
          </div>
        )
    }
}

export default Content;

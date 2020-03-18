import React, { Component } from "react";
import '../../../App.css';
import Nav from '../../../components/Nav';
import axios from "axios";
import $ from "jquery";
import Fb from '../../FbIntegrate';
import './style.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SavedPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          movies: [],
          email: ""
      };
    }
    componentDidMount(){
   
        if(window.location.pathname == "/saved/cat1") {
            this.getMovies("cat1");
        }
        if(window.location.pathname == "/saved/cat2") {
     
            this.getMovies("cat2");
        }
        if(window.location.pathname == "/saved/cat3") {
     
            this.getMovies("cat3");
        }
        if(window.location.pathname == "/saved/cat4") {
     
            this.getMovies("cat4");
        }
        if(window.location.pathname == "/saved/cat5") {
     
            this.getMovies("cat5");
        }
        if(window.location.pathname == "/saved") {
            this.getMovies("cat1");
        }
               
        
    }

    getMovies = (category) => {
        var myThis = this;
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
              if(res.id) {
                myThis.getCategoryMovies(category,res.id);
              } else {
                myThis.setState({movies: [], email: ""});
              }
            }
          );
    }
    getCategoryMovies = (category, email) =>{
        var mythis = this;
        axios({ method: "get", url: "/api/"+ email + "/movies/" + category }).then(function(result){
            console.log(result);
            mythis.setState({movies: result.data, email: email});

        });

    }

    deleteMovie = (id,category) => {
        var myThis = this;
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
              if(res.id) {
                $.ajax("/api/"+res.id+"/movies/"+id, {
                    type: "DELETE"
                  }).then(
                    function(res) {
                      myThis.getMovies(category);
                    }
                  );
              }
            }
          );
    }

    refreshComponent = () => {
        this.getMovies("cat1");
    }

    showCategory = (ev,category) => {
        this.getMovies(category);
        var id = "#" + ev.target.id;
        this.updateNavLink(id);
    }

    updateNavLink = (id) => {
        var navids = ["#nav-cat1", "#nav-cat2","#nav-cat3","#nav-cat4","#nav-cat5"];
        navids.map((value,index) => {

            if(id == value) {
                $(value).attr("class","nav-link active");
            } else {
                $(value).attr("class","nav-link");
            }
        });
    }

  render() {
    return (
        <>
            <Nav cb={this.refreshComponent} />
                
                <div className="row m-5 text-center">
                    {this.state.email == "" ? <div className="saved-empty-page1 text-muted">Please login to view saved movies</div> : (this.state.movies.length == 0 ? 
                        <div className="saved-empty-page text-muted">None</div> :  
                        <div></div>)}
                {
                    this.state.movies.map( (value, index)=>{
                        return <div className="d-inline-block mt-3 mb-3">
                                    <div className="movie">
                                        <div onClick= {() => {this.deleteMovie(value._id,value.category)}} className="delete-button">&times;</div>
                                        <img className="saved-img" src= {value.poster} />
                                        
                                        <div className="movie-review">
                                            <h5 className="title">{value.title}</h5>
                                            <br/>
                                            <div className="d-inline text-muted text-small">{value.rated} | </div>
                                            <div className="d-inline text-muted text-small"> {value.runtime} | </div>
                                            <div className="d-inline text-muted text-small"> {value.genre} |</div>
                                            <div className="d-inline text-muted text-small"> {value.year}</div>
                                                                                       

                                            <br/>
                                            <p className="text mt-3 saved-comments">{value.comments}</p>
                                            <div className="movie-ratings">
                                            <p className="text1 d-inline"><small ><img className="dbimage" src={value.emojiUrl} />{value.emojiText}</small></p>
                                            <img className="d-inline rt-image" src="https://files.911media.com/wp-content/uploads/2017/10/rotten-tomatoes-logo.png"/>
                                            <div className="d-inline text-small"> {value.ratingrt}</div>
                                            <img className="d-inline rt-image3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/500px-IMDB_Logo_2016.svg.png"/>
                                            <div className="d-inline text-small"> {value.rating}</div>
                                            <br/>
                                            <Fb value = {value.category}/>
                                            </div>
                                           
                                        </div>   
                                    </div>
                                </div>
                    })
                    
                }
                </div>
            
      </>
    );
  }
}

export default SavedPage;

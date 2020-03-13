import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
// import Carousel from '../../../components/Carousel';
// import Bucket from '../../../components/Bucket';
import axios from "axios";
import $ from "jquery";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SavedPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          movies: [],
        menus: [
            {
                id: "cat1",
                name: "Comedy"
            },
            {
                id: "cat2",
                name: "Action",
            },
            {
                id: "cat3",
                name: "Must Watch"
            },
            {
                id: "cat4",
                name: "Waste of time"
            }
        ]
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
                myThis.setState({movies: []});
              }
            }
          );
    }
    getCategoryMovies = (category, email) =>{
        var mythis = this;
        axios({ method: "get", url: "/api/"+ email + "/movies/" + category }).then(function(result){
            console.log(result);
            mythis.setState({movies: result.data});

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
        var navids = ["#nav-cat1", "#nav-cat2","#nav-cat3","#nav-cat4"];
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
            <Nav cb={this.refreshComponent} menus={this.state.menus}/>
            {/* <ul className="nav nav-pills justify-content-center mt-3 mb-3">
                <li className="nav-item">
                    <a id="nav-cat1" className="nav-link active" onClick={(ev) => {this.showCategory(ev,"cat1")}} href="#">Comedy</a>
                </li>
                <li className="nav-item">
                    <a id="nav-cat2" className="nav-link" onClick={(ev) => {this.showCategory(ev,"cat2")}} href="#">Action</a>
                </li>
                <li className="nav-item">
                    <a id="nav-cat3" className="nav-link" onClick={(ev) => {this.showCategory(ev,"cat3")}} href="#">Must watch</a>
                </li>
                <li className="nav-item">
                    <a id="nav-cat4" className="nav-link" onClick={(ev) => {this.showCategory(ev,"cat4")}} href="#" >Waste of time</a>
                </li>
            </ul> */}
            
                <div className="row">
                <div className=" col-md-1 col-sm-12 d-inline-block"></div>
                {
                    this.state.movies.map( (value, index)=>{
                        return <div className=" col-md-3 col-sm-12 d-inline-block">
                                    <div className="movie">
                                        <div onClick={() => {this.deleteMovie(value._id,value.category)}} className="delete-button">X</div>
                                        <img className="saved-img" src= {value.poster} />
                                        
                                        <div className="movie-review">
                                            <h5 className="title">{value.title}</h5>
                                            <div className="d-inline text-muted text-small">{value.rated} | </div>
                                            <div className="d-inline text-muted text-small"> {value.runtime} | </div>
                                            <div className="d-inline text-muted text-small"> {value.genre} |</div>
                                            <div className="d-inline text-muted text-small"> {value.year}</div>
                                            
                                            <br/>
                                            <p className="text mt-3 saved-comments">{value.comments}</p>
                                        
                                            <p className="text1 d-inline"><small ><img className="dbimage" src={value.emojiUrl} />{value.emojiText}</small></p>
                                            <img className="d-inline rt-image" src="https://files.911media.com/wp-content/uploads/2017/10/rotten-tomatoes-logo.png"/>
                                            <div className="d-inline text-small"> {value.ratingrt}</div>
                                            <img className="d-inline rt-image3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/500px-IMDB_Logo_2016.svg.png"/>
                                            <div className="d-inline text-small"> {value.rating}</div>
                                            <ul className="social">
                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                <li><a href="#"><i className="fa fa-google"></i></a></li>
                                                <li><a href="#"><i className="fa fa-whatsapp"></i></a></li>
                                            </ul>
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

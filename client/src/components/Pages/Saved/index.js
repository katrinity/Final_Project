import React, { Component } from "react";
import '../../../App.css';
import Nav from '../../../components/Nav';
import axios from "axios";
import $ from "jquery";
import Fb from '../../FbIntegrate';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton } from 'react-share';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const buttonStyle = {
    
  media:{
      height: '40px',
      width: '40px',
      borderRadius: '50%',  
      backgroundColor: 'white',      
      transition: 'all 0.3s',
      'padding-right': '10px',
      ':hover': {
          transform: "scale(1.2, 0.7)"
      } 
      
  }
}

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
        var myThis = this;
        axios({ method: "get", url: "/api/"+ email + "/movies/" + category }).then(function(result){
            console.log(result);
            myThis.updateMoviesWithLinks(result);
            myThis.setState({movies: result.data.movies, email: email});

        });

    }

    updateMoviesWithLinks = (result) => {
      var movies = result.data.movies;
      var links = result.data.links;
      for(var i = 0; i < movies.length; i++) {
        
        for(var j = 0; j < links.length; j++) {
            
            if(movies[i]._id.toString() == links[j].movieid.toString()) {
                movies[i].link = links[j].link.toString();
                break;
            }
        }
      }
      console.log(movies);
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

    getSharableLink = (link) => {
      var url = window.location.href;
      var arr = url.split('/');
      url = arr[0] + '//' + arr[2];
      if(link) {
        url = url + '/shared?' + link;
        
      }
      console.log(url);
      
      return url;
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
                        return <div className=" col-md-3 col-sm-12 d-inline-block mt-3 mb-3">
                                    <div className="movie">
                                        <div onClick= {() => {this.deleteMovie(value._id,value.category)}} className="delete-button">X</div>
                                        <img className="saved-img" src= {value.poster} />
                                        
                                        <div className="movie-review">
                                            <h5 className="title">{value.title}</h5>
                                            <br/>
                                            <div className="d-inline text-muted text-small">{value.rated} | </div>
                                            <div className="d-inline text-muted text-small"> {value.runtime} | </div>
                                            <div className="d-inline text-muted text-small"> {value.genre} |</div>
                                            <div className="d-inline text-muted text-small"> {value.year}</div>
                                            {/* <Fb value = {this.getSharableLink(value.link)}/> */}
                                            

                                            <br/>
                                            <p className=" mt-3 saved-comments">{value.comments}</p>
                                            <div className="movie-ratings">
                                            <p className="text1 d-inline"><small ><img className="dbimage" src={value.emojiUrl} />{value.emojiText}</small></p>
                                            <img className="d-inline rt-image" src="https://files.911media.com/wp-content/uploads/2017/10/rotten-tomatoes-logo.png"/>
                                            <div className="d-inline text-small"> {value.ratingrt}</div>
                                            <img className="d-inline rt-image3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/500px-IMDB_Logo_2016.svg.png"/>
                                            <div className="d-inline text-small"> {value.rating}</div>
                                            <br/>
                                            <FacebookShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
                                              <a key = {1} style = {buttonStyle.media} >
                                              <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: "#4267b2"}} className="fab fa-facebook fa-lg">
                                              </i>
                                              </a> 
                                            </FacebookShareButton>
                                            <TwitterShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
                                              <a key = {2} style = {buttonStyle.media} >
                                              <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: '#1DA1F2'}} className="fab fa-twitter fa-lg">
                                              </i>
                                              </a> 
                                            </TwitterShareButton>
                                            <WhatsappShareButton className="d-inline" url={this.getSharableLink(value.link)}>
                                              <a key = {3 }style = {buttonStyle.media}>
                                              <i style = {{marginLeft: '-.2rem', textAlign: 'center', color: '#f685ab'}} className="fab fa-whatsapp fa-lg"></i>
                                              </a>
                                            </WhatsappShareButton>
                                            <TelegramShareButton className="d-inline" url={this.getSharableLink(value.link)}>
                                              <a key = {4} style = {buttonStyle.media}>
                                              <i style = {{marginLeft: '-.1rem', textAlign: 'center', color: '#007dbb'}} className="fab fa-telegram fa-lg"></i>
                                              </a>
                                            </TelegramShareButton>
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

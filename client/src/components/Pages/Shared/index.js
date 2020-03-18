import React, { Component } from "react";
import '../../../App.css';
import Nav from '../../../components/Nav';
import axios from "axios";
import $ from "jquery";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SharedPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          movies: [],
      };
    }
    componentDidMount(){
        console.log(window.location.search);
        this.getMovie(window.location.search.substring(1), this);
        
    }

    getMovie = (link, myThis) => {
        $.ajax("/api/shareablelinks/" + link, {
            type: "GET"
          }).then(
            function(res) {
                console.log(res);
              if(!Object.keys(res).includes("result")) {
                myThis.setState({movies: res});
              }
            }
          );
    }


    

    refreshComponent = () => {
        this.getMovie(window.location.search, this);
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
                    { (this.state.movies.length == 0 ? 
                        <div className="saved-empty-page text-muted">None</div> :  
                        <div></div>)}
                {
                    this.state.movies.map( (value, index)=>{
                        return <div className=" col-md-3 col-sm-12 d-inline-block mt-3 mb-3">
                                    <div className="movie">
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

export default SharedPage;

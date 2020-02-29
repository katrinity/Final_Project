import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Carousel from '../../../components/Carousel';
import Bucket from '../../../components/Bucket';
import axios from "axios";
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
        this.getCategoryMovies("cat1","123@yahoo.com");
    }
    getCategoryMovies = (category, email) =>{
        var mythis = this;
        axios({ method: "get", url: "/api/"+ email + "/movies/" + category }).then(function(result){
            console.log(result);
            mythis.setState({movies: result.data});

    });

    }
  render() {
    return (
        <>
            <Nav menus={this.state.menus}/>
            
                <div className="row">
                {
                    this.state.movies.map( (value, index)=>{
                        return <div className=" col-md-3 col-sm-12 d-inline-block">
                                    <div className="movie">
                                        <img className="saved-img" src= {value.poster} />
                                        <ul className="social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            {/* <li><a href="#"><i className="fa fa-google"></i></a></li>
                                            <li><a href="#"><i className="fa fa-whatsapp"></i></a></li> */}
                                        </ul>
                                        <div className="movie-review">
                                            <h5 className="title">{value.title}</h5>
                                            <p className="text">{value.comments}</p>
                                            <p className="text"><small ><img className="dbimage" src={value.emojiUrl} />{value.emojiText}</small></p>
                                            
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

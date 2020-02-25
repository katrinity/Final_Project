import React, { Component } from "react";
import moana1 from './moana1.jpeg';
import moana2 from './moana2.jpg';
import moana3 from './moana3.jpg';
import AddInfo from '../AddInfo';
import toy from './toy.jpeg';
import Search from '../Search';
import $ from 'jquery';
const axios = require("axios");

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                title: "Toy Story 4",
                year: "2019",
                rated: "G",
                runtime: "100 min",
                genre: "Animation",
                plot: "When a new toy called \"Forky\" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.",
                poster: "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg"
            }
        };
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", "movie");
    }

    flipCard = () => {
        if(document.getElementById("front").style.transform.includes("rotateY(180deg)")) {
            document.getElementById("front").style.transform = "rotateY(0deg)";
            document.getElementById("back").style.transform = "rotateY(180deg)";
            } else {
                document.getElementById("back").style.transform = "rotateY(0deg)";
                document.getElementById("front").style.transform = "rotateY(180deg)";
                
        }
    }

    searchMovie = (movieTitle) => {
        axios.get(
            "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy"
          ).then( (response) => {
            if(response.data != null && response.data.Title != null) {
                var genre = response.data.Genre;
                if(genre.indexOf(",") >= 0) {
                    genre = genre.substring(0,genre.indexOf(","));
                }
                this.setState({
                    movie: { 
                        title: response.data.Title,
                        poster: response.data.Poster,
                        plot: response.data.Plot,
                        genre: genre,
                        runtime: response.data.Runtime,
                        rated: response.data.Rated,
                        year: response.data.Year
                    }
                });
            }
          });
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 searchResults">
                    <Search cb={this.searchMovie}/>
                    <div id="showEmoji"></div>
                    <div className="movie-outer">
                        <div id="movie" className="movie-card-container" onDragStart={this.drag}>
                            <div id="front" className="movie-card movie-card-front">
                                <img onClick={this.flipCard} className="drag3" src={this.state.movie.poster} id="drag1" draggable="true"  alt="Click on the image to get more information"/>
                            </div>
                            <div id="back" onClick={this.flipCard} className="movie-card movie-card-back overflow-hidden">
                                <br></br>
                                <div className="d-inline"><h3 className="d-inline">{this.state.movie.title} <h5 className="d-inline">({this.state.movie.year})</h5></h3></div>
                                <br/>

                                <div className="d-inline text-muted">{this.state.movie.rated} | </div>
                                <div className="d-inline text-muted"> {this.state.movie.runtime} | </div>
                                <div className="d-inline text-muted"> {this.state.movie.genre}</div>
                                <br/>
                                <br/>
                                <div className="text-justify"> {this.state.movie.plot}</div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group" id="formBackground">
                        <textarea rows="5" cols="20" wrap="hard"type="field" id="inputField" placeholder="Tell us how you really feel.."/>
                        <div>
                        <span id="emojiBtn">
                            <span>
                                <img className='emoji_images' src='https://media1.giphy.com/media/cNEkiz27tOidqUBuoR/giphy.gif?cid=5bb8f59ca32da18d5db7e3eec65bfc6485b1322c7076fe51&rid=giphy.gif'/>
                            </span>
                            <span>
                                <img className='emoji_images' src='https://media1.giphy.com/media/2fIbmaiOnI3VlQFZEq/giphy.gif?cid=5bb8f59c42e8574e14297affade56521b2c2e09a17c571e5&rid=giphy.gif'/>
                            </span>
                            <span>
                                <img className='emoji_images' src='https://media1.giphy.com/media/yN4RUYrRRrKVRoGqQm/giphy.gif?cid=5bb8f59c088fc0f7e47356326fca34b85ba4fa89269ee73f&rid=giphy.gif'/>
                            </span>
                            <span>
                                <img className='emoji_images' src='https://media0.giphy.com/media/TgGWZwWlsODxFPA21A/giphy.gif?cid=5bb8f59c6a8b5177645135e80c211200296a599b35fc109c&rid=giphy.gif'/>
                            </span>
                            <span>
                                <img className='emoji_images' src='https://media1.giphy.com/media/3OsFzorSZSUZcvo6UC/giphy.gif?cid=5bb8f59ce67e551ac6b809f9280b8411078bfa3057e7b31a&rid=giphy.gif'/>
                            </span>
                        </span>
                        </div>
                    </div>
                    

                    <h6>Drag the image and drop it in desired category below</h6>
                    <h9>(Click on the image to get more information)</h9>

                </div>
                <div className="col-sm-6">
                    <AddInfo />
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={moana1} className="d-block w-100" alt="..." /> 
                            </div>
                            <div className="carousel-item">
                                <img src={moana2} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={moana3} className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                        
                    <AddInfo />
                </div>
            </div>
        );
    }
}
export default Carousel;
import React, { Component } from "react";
import AddInfo from '../AddInfo';
import Search from '../Search';
import $ from 'jquery';
import Footer from "../Footer";
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
                poster: "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg",
                rating: "7.9",
                ratingrt: "97%"
            },

            movieTrailers: [

            ]
        };
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", "movie-from-search");
    }

    flipCard = () => {
        if (document.getElementById("front").style.transform.includes("rotateY(180deg)")) {
            document.getElementById("front").style.transform = "rotateY(0deg)";
            document.getElementById("back").style.transform = "rotateY(180deg)";
        } else {
            document.getElementById("back").style.transform = "rotateY(0deg)";
            document.getElementById("front").style.transform = "rotateY(180deg)";

        }
    }
    addEmoji = (url, text) => {
        var emojiDiv = $("<span id='emoji1' class='emoji'>");
        $("#showEmoji").empty();
        $("#showEmoji").append(emojiDiv);
        var emojiImage = $('<img id="emojiImage">')
            .attr("class", 'emoji_images')
            .attr("src", url);

        $(emojiDiv).append(emojiImage);
        $(emojiDiv).append(text);

    }
    searchMovie = (movieTitle) => {
        if ($("#emoji1") != null) {
            $("#emoji1").remove();
        }
        $("#showEmoji").empty();
        $("#inputField").val("");
        axios.get(
            "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy"
        ).then((response) => {
            if (response.data != null && response.data.Title != null) {
                var genre = response.data.Genre;
                if (genre.indexOf(",") >= 0) {
                    genre = genre.substring(0, genre.indexOf(","));
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
        for (var i = 0; i < response.data.Ratings.length; i++) {
            if (response.data.Ratings[i].Source == "Rotten Tomatoes") {
                return response.data.Ratings[i].Value;
            }

        }
        return "N/A";
    }
    componentDidMount() {
        var compThis = this;
        $.ajax({ METHOD: "GET", url: "/api/movies" }).done(function (res3, status) {
            console.log(res3.result);

            compThis.setState({ movieTrailers: res3.result });

        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-5 searchResults">
                    <Search cb={this.searchMovie} />
                    <div id="showEmoji">
                        <div className="text-muted pt-1 d-inline">Click an emoji below to rate this movie!</div>
                    </div>
                    <div>
                    </div>
                    <div className="movie-outer">
                        <div id="movie" className="movie-card-container" onDragStart={this.drag}>
                            <div id="front" className="movie-card movie-card-front">
                                <img onClick={this.flipCard} className="drag3" src={this.state.movie.poster} id="drag1" draggable="true" alt="Click on the image to get more information" />
                            </div>
                            <div id="back" onClick={this.flipCard} className="movie-card movie-card-back ">
                                <br></br>
                                <div className="d-inline"><h3 className="d-inline">{this.state.movie.title} <h5 className="d-inline">({this.state.movie.year})</h5></h3></div>
                                <br />

                                <div className="d-inline text-muted">{this.state.movie.rated} | </div>
                                <div className="d-inline text-muted"> {this.state.movie.runtime} | </div>
                                <div className="d-inline text-muted"> {this.state.movie.genre}</div>

                                <div id="genre" className="d-none ">{this.state.movie.genre}</div>
                                <div id="runtime" className="d-none ">{this.state.movie.runtime}</div>
                                <div id="rated" className="d-none ">{this.state.movie.rated}</div>
                                <div id="title" className="d-none ">{this.state.movie.title}</div>
                                <div id="plot" className="d-none ">{this.state.movie.plot}</div>
                                <div id="year" className="d-none ">{this.state.movie.year}</div>
                                <div id="poster" className="d-none ">{this.state.movie.poster}</div>
                                <div id="rating" className="d-none ">{this.state.movie.rating}</div>
                                <div id="ratingrt" className="d-none ">{this.state.movie.ratingrt}</div>
                                <br />
                                <br />
                                <div className="text-justify p-3"> {this.state.movie.plot}</div>
                                <img className="d-inline rt-image1" src="https://files.911media.com/wp-content/uploads/2017/10/rotten-tomatoes-logo.png" />
                                <div className="d-inline text-small"> {this.state.movie.ratingrt}</div>
                                <img className="d-inline rt-image4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/500px-IMDB_Logo_2016.svg.png" />
                                <div className="d-inline text-small"> {this.state.movie.rating}</div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group" id="formBackground">
                        <textarea rows="5" cols="20" wrap="hard" type="field" id="inputField" placeholder="Tell us how you really feel.." maxlength="150" />
                        <div>
                            <span id="emojiBtn">
                                <span>
                                    <span><img className='emoji_images' onClick={() => { this.addEmoji('https://media1.giphy.com/media/cNEkiz27tOidqUBuoR/giphy.gif?cid=5bb8f59ca32da18d5db7e3eec65bfc6485b1322c7076fe51&rid=giphy.gif', "Love it!") }} src='https://media1.giphy.com/media/cNEkiz27tOidqUBuoR/giphy.gif?cid=5bb8f59ca32da18d5db7e3eec65bfc6485b1322c7076fe51&rid=giphy.gif' /></span>
                                </span>
                                <span>
                                    <img className='emoji_images' onClick={() => { this.addEmoji('https://media1.giphy.com/media/2fIbmaiOnI3VlQFZEq/giphy.gif?cid=5bb8f59c42e8574e14297affade56521b2c2e09a17c571e5&rid=giphy.gif', "Very Funny!") }} src='https://media1.giphy.com/media/2fIbmaiOnI3VlQFZEq/giphy.gif?cid=5bb8f59c42e8574e14297affade56521b2c2e09a17c571e5&rid=giphy.gif' />
                                </span>
                                <span>
                                    <img className='emoji_images' onClick={() => { this.addEmoji('https://media1.giphy.com/media/yN4RUYrRRrKVRoGqQm/giphy.gif?cid=5bb8f59c088fc0f7e47356326fca34b85ba4fa89269ee73f&rid=giphy.gif', "Hate i!") }} src='https://media1.giphy.com/media/yN4RUYrRRrKVRoGqQm/giphy.gif?cid=5bb8f59c088fc0f7e47356326fca34b85ba4fa89269ee73f&rid=giphy.gif' />
                                </span>
                                <span>
                                    <img className='emoji_images' onClick={() => { this.addEmoji('https://media0.giphy.com/media/TgGWZwWlsODxFPA21A/giphy.gif?cid=5bb8f59c6a8b5177645135e80c211200296a599b35fc109c&rid=giphy.gif', "Great movie!") }} src='https://media0.giphy.com/media/TgGWZwWlsODxFPA21A/giphy.gif?cid=5bb8f59c6a8b5177645135e80c211200296a599b35fc109c&rid=giphy.gif' />
                                </span>
                                <span>
                                    <img className='emoji_images' onClick={() => { this.addEmoji('https://media1.giphy.com/media/3OsFzorSZSUZcvo6UC/giphy.gif?cid=5bb8f59ce67e551ac6b809f9280b8411078bfa3057e7b31a&rid=giphy.gif', "Very Entertaining!") }} src='https://media1.giphy.com/media/3OsFzorSZSUZcvo6UC/giphy.gif?cid=5bb8f59ce67e551ac6b809f9280b8411078bfa3057e7b31a&rid=giphy.gif' />
                                </span>
                            </span>
                        </div>
                    </div>

                    <h6>Drag the image and drop it in desired category below</h6>
                    <h9>(Click on the image to get more information)</h9>

                </div>
                <div className="col-sm-7">
                    <AddInfo text="Checkout latest trailers!" />
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                        </ol>
                        <div className="carousel-inner">
                            {
                                this.state.movieTrailers.map((value, index) => {
                                    var active = "carousel-item";
                                    var url = "https://www.youtube.com/embed/" + value.youtubeId + "?rel=0";
                                    if (index == 0) {
                                        active = "carousel-item active";
                                    }
                                    return <div className={active}>
                                        <iframe width="420" height="415" className="d-block w-100" src={url} frameborder="0"></iframe>
                                    </div>
                                })
                            }
                        </div>



                    </div>

                    {/* <AddInfo text="Additional Information"/> */}
                </div>
            </div>
        );
    }
}
export default Carousel;
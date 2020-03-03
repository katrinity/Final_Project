import React, { Component } from "react";
<<<<<<< HEAD
=======
import $ from 'jquery';
import {Carousel} from 'react-responsive-carousel';
>>>>>>> 36ca9980f272c93652932e03f64a9d11a3fc7f9f

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
<<<<<<< HEAD
    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        
      }
    allowDrop = (ev) => {
        ev.preventDefault();
      }
=======

    saveMovies = () => {
        var myComp = this;
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
              if(res.id) {
                myComp.saveCategory("cat1",res.id, myComp);
                myComp.saveCategory("cat2",res.id, myComp);
                myComp.saveCategory("cat3",res.id, myComp);
                myComp.saveCategory("cat4",res.id, myComp);
                myComp.setState({"cat1": [], "cat2": [], "cat3": [], "cat4": []});
              } else {
                alert('Please log in first');
              }
            }
          );
    }
    saveCategory = (category, email, myComp) => {
        for(var i = 0; i < this.state[category].length; i++) {
            $.post("/api/" + email + "/movies", {
                email: email,
                category: category,
                emojiUrl: myComp.state[category][i].emojiUrl,
                emojiText: myComp.state[category][i].emojiText, 
                poster: myComp.state[category][i].poster,
                genre: myComp.state[category][i].genre,
                runtime: myComp.state[category][i].runtime,
                year: myComp.state[category][i].year,
                rated: myComp.state[category][i].rated,
                comments: myComp.state[category][i].comments,
                title: myComp.state[category][i].title,
                plot: myComp.state[category][i].plot,
                rating: myComp.state[category][i].rating,
                ratingrt: myComp.state[category][i].ratingrt
              }).then(
                function(res) {
                  console.log(res);
                }
              );
        }
        
    }
    
    dropToCategory = (ev,category) => {
        if((ev.dataTransfer.getData("text")) != "movie-from-search") {
            return;
        }
        var url = document.getElementById("drag1").getAttribute("src");
        var emojiImage = document.getElementById("emojiImage");
        var comments = $("#inputField").val();
        var emojiUrl = "";
        var emojiText = "";
        if (emojiImage != null) {
            emojiUrl = emojiImage.getAttribute("src");
            emojiText = $("#emoji1").text();
        }
        var movies = this.state[category].slice(0);
        movies.push({url: url, 
                    emojiUrl: emojiUrl, 
                    emojiText: emojiText, 
                    poster: $("#poster").text(),
                    title: $("#title").text(),
                    genre: $("#genre").text(),
                    runtime: $("#runtime").text(),
                    year: $("#year").text(),
                    plot: $("#plot").text(),
                    rated: $("#rated").text(),
                    rating: $("#rating").text(),
                    ratingrt: $("#ratingrt").text(),
                    comments: comments});
        this.setState({[category]: movies});
    }
    
    allowDrop = (ev) => {
        ev.preventDefault();
    }

    deleteMovie = (index,cat) => {
        
        var currentMovies = this.state[cat].slice(0);
        var catMovies = [];
        var j = 0;
        for(var i = 0; i < currentMovies.length; i++) {
            if(i == index) {
                continue;
            }            
            catMovies.push(currentMovies.slice(i,i+1)[0]);
            j++;
        }
        window.pauseCarousel("#" + cat + "Carousel");
        this.setState({[cat]: catMovies});
        
    }
    componentDidUpdate() {
        
        window.continueCarousel("#cat1Carousel");
        window.continueCarousel("#cat2Carousel");
        window.continueCarousel("#cat3Carousel");
        window.continueCarousel("#cat4Carousel");
    }

>>>>>>> 36ca9980f272c93652932e03f64a9d11a3fc7f9f
    render() {
        return (
            <div className="bucket">
                <div className="bucketH"><h1>My Bucket
                    <button type="submit" className="search-button btn btn-primary">Save</button></h1>
                </div>
                <div className="row">
                    <div className="col-sm-3">
<<<<<<< HEAD
                        <div id="div1" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Comedy</div>
                            <a href="" className="bucket1"> More movies...</a>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div2" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Action</div>
                            <a href="" className="bucket2"> More movies...</a>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div3" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Must watch</div>
                            <a href="" className="bucket3"> More movies...</a>
                        </div>
                    </div>   
                    <div className="col-sm-3">
                        <div id="div4" className="div1" onDrop={this.drop} onDragOver={this.allowDrop}  className="card">
                            <div contenteditable="true" className="catName">Waste of time</div>
                            <a href="" className="bucket4"> More movies...</a>
=======
                        <div id="div1" className="div1" onDrop={(ev) => { this.dropToCategory(ev,"cat1")}} onDragOver={this.allowDrop} className="card grow comedy">
        <div contenteditable="true" className="catName">Comedy({this.state.cat1.length})</div>
                            
                            <div id="cat1Carousel" className="carousel slide " data-ride="carousel">
                                <div id="cat1-carousel-inner" className="carousel-inner">
                                { 
                                    this.state.cat1.map((value, index) => {
                                        var active = "carousel-item showEmojiComedy";
                                        var id = "showEmojiComedy" + index;
                                        var emojiId = "showEmojiComedyEmoji" + index;
                                        var emojitext = "Click emojis below to rate this movie!";
                                        
                                        if(index == 0) {
                                            active = "carousel-item active showEmojiComedy";
                                            
                                        }
                                         
                                        if (value.emojiUrl == "") {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><div className="text-muted pt-1">{emojitext}</div></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat1")}} className="delete-button-search">X</div>
                                                    <img src={value.poster} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        } else {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><span class='emoji'><img className="emoji_images" src={value.emojiUrl}></img>{value.emojiText}</span></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat1")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        }
                                        
                                    })
                                }
                                </div>
                                <a class="carousel-control-prev" href="#cat1Carousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#cat1Carousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div2" className="div1" onDrop={(ev) => {this.dropToCategory(ev,"cat2")}} onDragOver={this.allowDrop} className="card grow action">
                            <div contenteditable="true" className="catName">Action({this.state.cat2.length})</div>
                            <div id="cat2Carousel" className="carousel slide " data-ride="carousel">
                                <div id="cat2-carousel-inner" className="carousel-inner">
                                { 
                                    this.state.cat2.map((value, index) => {
                                        var active = "carousel-item showEmojiCat2";
                                        var id = "showEmojiCat2" + index;
                                        var emojiId = "showEmojiCat3Emoji" + index;
                                        if(index == 0) {
                                            active = "carousel-item active showEmojiCat2"
                                        }
                                        if (value.emojiUrl == "") {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><div className="text-muted pt-1">Click emojis below to rate this movie!</div></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat2")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        } else {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><span class='emoji'><img className="emoji_images" src={value.emojiUrl}></img>{value.emojiText}</span></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat2")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        }
                                        
                                    })
                                }
                                </div>
                                <a class="carousel-control-prev" href="#cat2Carousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#cat2Carousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div3" className="div1" onDrop={(ev) => {this.dropToCategory(ev,"cat3")}} onDragOver={this.allowDrop} className="card grow must">
                            <div contenteditable="true" className="catName">Must watch({this.state.cat3.length})</div>
                            <div id="cat3Carousel" className="carousel slide " data-ride="carousel">
                                <div id="cat3-carousel-inner" className="carousel-inner">
                                { 
                                    this.state.cat3.map((value, index) => {
                                        var active = "carousel-item showEmojiCat3";
                                        var id = "showEmojiCat3" + index;
                                        var emojiId = "showEmojiCat3Emoji" + index;
                                        if(index == 0) {
                                            active = "carousel-item active showEmojiCat3"
                                        }
                                        if (value.emojiUrl == "") {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><div className="text-muted pt-1">Click emojis below to rate this movie!</div></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat3")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        } else {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><span class='emoji'><img className="emoji_images" src={value.emojiUrl}></img>{value.emojiText}</span></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat3")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        }
                                        
                                    })
                                }
                                </div>
                                <a class="carousel-control-prev" href="#cat3Carousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#cat3Carousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>   
                    <div className="col-sm-3">
                        <div id="div4" className="div1" onDrop={(ev) => {this.dropToCategory(ev,"cat4")}} onDragOver={this.allowDrop}  className="card grow waste">
                            <div contenteditable="true" className="catName">Waste of time({this.state.cat4.length})</div>
                            
                            
                            <div id="cat4Carousel" className="carousel slide " data-ride="carousel">
                                <div id="cat4-carousel-inner" className="carousel-inner">
                                { 
                                    this.state.cat4.map((value, index) => {
                                        var active = "carousel-item showEmojiCat4";
                                        var id = "showEmojiCat4" + index;
                                        var emojiId = "showEmojiCat4Emoji" + index;
                                        if(index == 0) {
                                            active = "carousel-item active showEmojiCat4"
                                        }
                                        if (value.emojiUrl == "") {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><div className="text-muted pt-1">Click emojis below to rate this movie!</div></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat4")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        } else {
                                            return <div id={id} className={active}>
                                                <div id={emojiId}><span class='emoji'><img className="emoji_images" src={value.emojiUrl}></img>{value.emojiText}</span></div>
                                                <div className="bucket-image-container text-center">
                                                    <div onClick={() => {this.deleteMovie(index,"cat4")}} className="delete-button-search">X</div>
                                                    <img src={value.url} className="d-block bucket-image d-inline" alt="..."/>
                                                </div>
                                                <div className="bucket-comments"><span >{value.comments}</span></div>
                                            </div>
                                        }
                                        
                                    })
                                }
                                </div>
                                <a class="carousel-control-prev" href="#cat4Carousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#cat4Carousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
>>>>>>> 36ca9980f272c93652932e03f64a9d11a3fc7f9f
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bucket;

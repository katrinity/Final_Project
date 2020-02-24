import React, { Component } from "react";
import moana1 from './moana1.jpeg';
import moana2 from './moana2.jpg';
import moana3 from './moana3.jpg';
import AddInfo from '../AddInfo';
import toy from './toy.jpeg';
import Search from '../Search';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 searchResults">
                    <Search />
                    <div className="movie-outer">
                        <div id="movie" className="movie-card-container" onDragStart={this.drag}>
                            <div id="front" className="movie-card movie-card-front">
                                <img onClick={this.flipCard} className="drag3" src={toy} id="drag1" draggable="true"  />
                            </div>
                            <div id="back" onClick={this.flipCard} className="movie-card movie-card-back">
                                <br></br>
                                <h3>Toy Story 4</h3>
                                <h6>Disney Pixar</h6>
                                <p> On digital Blu Ray and 4k Ultra</p>
                            </div>
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
                                {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
            
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
        
                        <div className="carousel-inner">
                            <div className="item active">
                                <img src={moana1} alt="newMovie1" />
                            </div>
            
                            <div className="item">
                                <img src={moana2} alt="newMovie2" />
                            </div>
                            
                            <div className="item">
                                <img src={moana3} alt="newMovie3" />
                            </div>
                        </div>
        
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                        </a>
                    </div> */}
                                <AddInfo />
                            </div>
                        </div>
                        );
                    }
                }
export default Carousel;
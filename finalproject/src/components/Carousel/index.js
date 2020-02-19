import React, { Component } from "react";
import moana1 from './moana1.jpeg';
import moana2 from './moana2.jpg';
import moana3 from './moana3.jpg';
import AddInfo from '../AddInfo';
import toy from './toy.jpeg';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
      }
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 searchResults">
                    <img id="drag1" src={toy} draggable="true" onDragStart={this.drag} />
                </div>
                <div className="col-sm-6">
                <AddInfo />
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
            
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
                    </div>
                    <AddInfo />
                </div>
            </div>
        );
    }
}
export default Carousel;
import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Carousel from '../../../components/Carousel';
import Bucket from '../../../components/Bucket';

class SavedPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
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
  render() {
    return (
        <>
            <Nav menus={this.state.menus}/>
            <div className="card1 text-center">
                
                <div className=" card2 card mb-3 d-inline-block">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src="https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg" className="saved-card" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    );
  }
}

export default SavedPage;

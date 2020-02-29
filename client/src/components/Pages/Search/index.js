import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Carousel from '../../../components/Carousel';
import Bucket from '../../../components/Bucket';

class SearchPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menus: [

        ]
      };
    }
  render() {
    return (
      <>
          <Nav menus={this.state.menus}/>
          <Carousel />
          <Bucket />
      </>
    );
  }
}

export default SearchPage;

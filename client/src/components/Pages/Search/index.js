import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Carousel from '../../../components/Carousel';
import Bucket from '../../../components/Bucket';
import Sidebar from '../../../components/Sidebar';
import Fb from '../../FbIntegrate';


class SearchPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menus: [

        ]
      };
    }

    refreshComponent = () => {
        this.forceUpdate();
    }

  render() {
    return (
      <>
          <Nav cb={this.refreshComponent} menus={this.state.menus}/>
          {/* <Sidebar /> */}
          <Carousel />
          <Bucket />
          <Fb/>
      </>
    );
  }
}

export default SearchPage;

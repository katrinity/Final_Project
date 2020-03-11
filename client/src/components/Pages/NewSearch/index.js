import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Bucket from '../../../components/Bucket';
import SearchInput from '../../../components/SearchInput';

class NewSearchPage extends Component {

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
          <SearchInput />
          <Bucket />
      </>
    );
  }
}

export default NewSearchPage;

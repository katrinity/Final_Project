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
      this.bucket = React.createRef();
    }
   
    refreshComponent = () => {
        this.forceUpdate();
    }

    assignCategory = (category) => {
        this.bucket.current.selectACategory(category);
    }

  render() {
    return (
      <>
          <Nav cb={this.refreshComponent} menus={this.state.menus}/>
          <SearchInput cb={this.assignCategory}/>
          <Bucket ref={this.bucket}/>
      </>
    );
  }
}

export default NewSearchPage;

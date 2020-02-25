import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render(){
    return (
      <div
        style={{ height: 75, clear: "both", paddingTop: 20, paddingLeft: 20, paddingRight:20}}
        className="search-input"
      >
        <input type="text" id="query" className="text" placeholder="Search for a Movie" />
        <button type="submit" className="search-button bg-primary text-light" onClick={()=>{this.props.cb(document.getElementById("query").value)}}>Search</button>
      </div>
    );
  }
  
}

export default Search;

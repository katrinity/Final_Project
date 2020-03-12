import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Theater from '../../Theater'


function Landing(){
    return(
        <div>
        <Nav menus = {[]}/>
        <br/>
        <div id = 'theater'><Theater /></div>
        
        </div>
        
    )
}

export default Landing;
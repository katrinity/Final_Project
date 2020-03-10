import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Banner from '../../Banner';
import BannerCard from '../../BannerCard';
import Bucket from '../../../components/Bucket';
import axios from "axios";
import Theater from '../../Theater'
import $ from "jquery";

function Landing(){
    return(
        <div>
        <Nav menus = {[]}/>
        <br/>
        <Theater />
 
        
        </div>
        
    )
}

export default Landing;
import React, { Component } from "react";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Theater from '../../Theater'


function Landing(){
    return(
        <div>
        <Nav />
        <br/>
        <div id = 'theater'><Theater /></div>
        
        </div>
        
    )
}

export default Landing;
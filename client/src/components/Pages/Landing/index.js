import React, { Component, Fragment } from "react";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Theater from '../../Theater'
import Footer from '../../../components/Footer';


function Landing() {
    return (
        <div>
            <Nav />
            <br />
            <div id='theater'><Theater /></div>
            <Footer />
        </div>

    )
}

export default Landing;
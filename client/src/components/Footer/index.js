import React, { Component } from "react";
import Radium from 'radium';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import $ from 'jquery';

const footerStyle = {
    base:{
        backgroundColor: '#263238',
        boxShadow: '0px -3px 15px 0px rgba(0,0,0,0.75)',
        paddingTop: '10px'
    }
}
const buttonStyle = {
    
    fb:{
        height: '40px',
        width: '40px',
        borderRadius: '50%',  
        backgroundColor: 'white',      
        transition: 'all 0.3s',
        ':hover': {
            transform: "scale(1.2, 0.7)"
        }
    },
    gg:{
        height: '40px',
        width: '40px',
        borderRadius: '50%',  
        backgroundColor: '#db4a39',      
        transition: 'all 0.3s',
        ':hover': {
            transform: "scale(1.2, 0.7)"
        }
    },
    twt:{
        height: '40px',
        width: '40px',
        borderRadius: '50%',  
        backgroundColor: '#f685ab',      
        transition: 'all 0.3s',
        ':hover': {
            transform: "scale(1.2, 0.7)"
        }

    },
    linkd:{
        height: '40px',
        width: '40px',
        borderRadius: '50%',  
        backgroundColor: 'orange',      
        transition: 'all 0.3s',
        ':hover': {
            transform: "scale(1.2, 0.7)"
        }

    }
}



class Footer extends Component{

    constructor(props) {
        super(props);
        this.state = {
          menus: []
        };
        
      }


    render() {
    return(
        <footer style = {footerStyle.base} className="page-footer font-small ">

            <div className="container z-depth-2">

                <ul className="list-unstyled list-inline text-center">
                <li className="list-inline-item">
                <FacebookShareButton  url={document.location.href}>
                    <a key = {1} style = {buttonStyle.fb} className ='btn'>
                    <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: "#4267b2"}} className="fab fa-facebook fa-lg">
                    </i>
                    </a> 
                </FacebookShareButton>
                </li>
                <li className="list-inline-item">
                    <TwitterShareButton url={document.location.href}>
                    <a key = {2} style = {buttonStyle.twt} className="btn">
                    <i style = {{marginLeft: '-.2rem', color: '#1DA1F2'}} className="fab fa-twitter fa-lg"></i>
                    </a>
                    </TwitterShareButton>
                </li>
                <li className="list-inline-item">
                    <a key = {3 }style = {buttonStyle.gg} className="btn">
                    <i style = {{marginLeft: '-.2rem', color: 'white'}} className="fab fa-google-plus-g fa-lg"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <LinkedinShareButton url={document.location.href}>
                    <a key = {4} style = {buttonStyle.linkd} className="btn">
                    <i style = {{marginLeft: '-.1rem', color: '#007dbb'}} className="fab fa-linkedin fa-lg"></i>
                    </a>
                    </LinkedinShareButton>
                </li>
                </ul>


            </div>


            <div style = {{backgroundColor: '#1e282d', color: 'white'}} className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://github.com/homemadechowder/Final_Project"> Andrew Katia Krishna Sree @ Github</a>
            </div>


            </footer>

    )
    }
}

export default Radium(Footer);
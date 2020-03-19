import React, { Component } from "react";
import Radium from 'radium';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton } from 'react-share';
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
        backgroundColor: '#25D366',      
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

    getUrl = () => {
        var url = window.location.href;
        var arr = url.split('/');
        url = arr[0] + '//' + arr[2];
        
        return url;
    }


    render() {
    return(
        <footer style = {footerStyle.base} className="page-footer font-small ">

            <div className="container z-depth-2">

                <ul className="list-unstyled list-inline text-center">
                <li className="list-inline-item">
                <FacebookShareButton  url={this.getUrl()}>
                    <a key = {1} style = {buttonStyle.fb} className ='btn'>
                    <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: "#4267b2"}} className="fab fa-facebook fa-lg">
                    </i>
                    </a> 
                </FacebookShareButton>
                </li>
                <li className="list-inline-item">
                    <TwitterShareButton url={this.getUrl()}>
                    <a key = {2} style = {buttonStyle.twt} className="btn">
                    <i style = {{marginLeft: '-.2rem', color: '#1DA1F2'}} className="fab fa-twitter fa-lg"></i>
                    </a>
                    </TwitterShareButton>
                </li>
                <li className="list-inline-item">
                    <WhatsappShareButton url={this.getUrl()}>
                    <a key = {3 }style = {buttonStyle.gg} className="btn">
                    <i style = {{marginLeft: '-.2rem', color: 'white'}} className="fab fa-whatsapp fa-lg"></i>
                    </a>
                    </WhatsappShareButton>
                </li>
                <li className="list-inline-item">
                    <TelegramShareButton url={this.getUrl()}>
                    <a key = {4} style = {buttonStyle.linkd} className="btn">
                    <i style = {{marginLeft: '-.1rem', color: '#007dbb'}} className="fab fa-telegram fa-lg"></i>
                    </a>
                    </TelegramShareButton>
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
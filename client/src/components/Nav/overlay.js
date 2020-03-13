import React, {Component} from 'react';
import $ from 'jquery';


class Overlay extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            rotated: 0,
            currentUser: ''

        };
    }

    eventSignOut = (navThis) => {
        navThis.signOut();
        $.ajax("/api/session", {
            type: "DELETE"
        }).then(
            function(res) {
          
                // this.state.sessionId = "";
                navThis.checkSession();
                navThis.props.cb();
        
            }
        );
    }

    signOut = () => {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
    
        });
        ;
    }

    checkSession = () => {
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
            //   this.state.sessionId = res.id;
              if(res.id) {
                window.$("#register-form").hide();
                window.$("#signin-form").hide();
                window.$(".app").show();
                
                window.$("#app-content").html("Welcome " + res.id + "!");    
                window.$("#signOut").show();
                // this.setState({currentUser: res.id});
              } else {
                window.$("#register-form").show();
                window.$("#signin-form").show();
                window.$(".app").hide();
                window.$("#app-content").hide();
                window.$("#signOut").hide();
              }
            }
          );
    }

    render(){
    return(
    
        <div className ="overlay-content">
        <a className = 'overlayItems' href="/">Home</a>
        <a className = 'overlayItems' href="/search">Search</a>
        <a className = 'overlayItems' href="/saved">Saved</a>
        <ul className="nav navbar-nav ml-auto">
                        <li>
                            <a id="signin-form" type="button" className="overlayItems" data-toggle="modal" data-target="#loginModal"> Log in </a>
                        </li>
                        <li>
                            <a id="register-form" type="button" className="overlayItems" data-toggle="modal" data-target="#registerModal"> Sign up </a>
                        </li>
                        <li>
                            <div className="app text-light">
                                {/* {this.state.currentUser !== '' ? <div id="app-content" className="pt-1">Welcome! {this.state.currentUser}</div>:<div id="app-content" className="pt-1"></div>} */}
                                <div id="sign-out"></div>
                            </div>
                        </li>
                        <li>
                            <a id="signOut" type="button" className="overlayItems" onClick={() => {this.eventSignOut(this)}}>
                                Sign out
                            </a>
                        </li>
                    </ul> 
        </div>
    )
    }
}

export default Overlay;
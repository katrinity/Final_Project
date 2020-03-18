import React, {Component} from 'react';
import $ from 'jquery';


class Overlay extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            rotated: 0,
            currentUser: '',
            dropdown: false,

        };
    }

    // User session is deleted and the user is logged out of the application
    eventSignOut = (navThis) => {
        navThis.signOut();
        $.ajax("/api/session", {
            type: "DELETE"
        }).then(
            function(res) {
          
                navThis.checkSession();
                navThis.props.cb();
        
            }
        );
    }

    //Google sign-out
    signOut = () => {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
    
        });
        ;
    }

    //Check to see if the user is already logged in, if update the user name in the UI
    checkSession = () => {
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
              if(res.id) {
                window.$("#register-form").hide();
                window.$("#signin-form").hide();
                window.$(".app").show();
                
                window.$("#app-content").html("Welcome " + res.id + "!");    
                window.$("#signOut").show();
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

dropDown = (event)=>{

   event.preventDefault();
   if (this.state.dropdown == true){
    $(".dropdown-container").css('display','none');
    this.setState({dropdown: false})
   }
   else{
    $(".dropdown-container").css('display','block');
    this.setState({dropdown: true});
   }
   
   
}

    render(){
    return(
    
        <div className ="overlay-content">
        <div id = 'app-content'></div>  
        <a className = 'overlayItems' href="/">Home</a>
        <a className = 'overlayItems' href="/search">Search</a>
        <a onClick={this.dropDown}  className = 'overlayItems dropdown-btn' href="/saved">Saved <i className='fa fa-caret-right'></i></a>
        <div  className = 'dropdown-container'>
        <a className = 'submenu' href="/saved/cat1">Waste of time - Not Worthy</a>
        <a className = 'submenu' href="/saved/cat2">Summary Worthy</a>
        <a className = 'submenu' href="/saved/cat3">DVD/Bluray Worthy</a>
        <a className = 'submenu' href="/saved/cat4">Local Theater Worthy</a>
        <a className = 'submenu' href="/saved/cat5">Subscription Worthy</a>
        </div>
        <ul className="nav navbar-nav ml-auto">
                        <li>
                            <a id="signin-form" type="button" className="overlayItems" data-toggle="modal" data-target="#loginModal"> Log in </a>
                        </li>
                        <li>
                            <a id="register-form" type="button" className="overlayItems" data-toggle="modal" data-target="#registerModal"> Sign up </a>
                        </li>
                        <li>
                            <div className="app text-light">
                               

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
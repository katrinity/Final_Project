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
dropDown = ()=>{

   $(".dropdown-container").css('display','block');
}
hideDropDown = ()=>{

    $(".dropdown-container").css('display','none');
 }
    render(){
    return(
    
        <div className ="overlay-content">
        <a className = 'overlayItems' href="/">Home</a>
        <a className = 'overlayItems' href="/search">Search</a>

        <a onMouseEnter={this.dropDown} onMouseLeave={this.hideDropDown} className = 'overlayItems dropdown-btn' href="/saved">Saved <i className='fa fa-caret-right'></i></a>
        <div onMouseEnter={this.dropDown} onMouseLeave={this.hideDropDown} className = 'dropdown-container'>
        <a href="/saved/cat1">Comedy</a>
        <a href="/saved/cat2">Action</a>
        <a href="/saved/cat3">Must watch</a>
        <a href="/saved/cat4">Waste of time</a>
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
                                <div id="app-content" className="pt-1 overlayItems"></div>

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
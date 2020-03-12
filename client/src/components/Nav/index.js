import React, { Component } from "react";
import Overlay from './overlay';
import NavButton from './navbutton';
import $ from "jquery";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            rotated: 0,
            currentUser: '',
        };
    }

    componentDidMount() {
        this.checkSession();
        window.navComponent = this;
        $("#email").focusout((ev)=>{
            var email = ev.target.value;
            this.validateEmail($("#"+ev.target.id), email, "#valiEmail");
        });
        $("#signEmail").focusout((ev)=>{
            var email = ev.target.value;
            this.validateEmail($("#"+ev.target.id), email, "#valiSignEmail");
        });
        $("#psw").focusout((ev) => {  
            var psw = ev.target.value;
            this.validatePsw($("#"+ev.target.id), psw);
        });
        $("#psw-repeat").focusout((ev) => {  
            var pswRepeat = ev.target.value;
            this.checkPasswordMatch();
        });
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
                window.$("#app-content").show();
                window.$("#app-content").html(res.id);    
                window.$("#signOut").show();
                this.setState({currentUser: res.id});
                alert(this.state.currentUser);
              } else {
                window.$("#register-form").show();
                window.$("#signin-form").show();
                window.$("#app-content").hide();
                window.$("#signOut").hide();
              }
            }
          );
    }

     onSignIn(googleUser){
         alert('asdfsd');
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
      
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
      
      //registerUser function call with google email parameters.
          this.registerUser(profile.getEmail(),"", "google");
          console.log("profile "+JSON.stringify(profile));
          console.log("google user has checked in");  
      }
    registerUser = (email, password, provider, navThis) => {
        var user = {
            email: email,
            password: password,
            provider: provider
        };
        // Send the PUT request.
        $.ajax("/api/register", {
            type: "POST",
            data: user
            }).then(   
            function(res, err) {
                $.noConflict();
                if(res.id != ""){
                    // $("#registerModal").modal('hide');
                    window.$('#registerModal').modal('hide');
                    if(provider != "events") 
                        navThis.authUser(email,"", provider, navThis);
                }
                
            }
        );
    }

    registerUserModal = () => {
        var password = document.getElementById("psw").value;
        var email = document.getElementById("email").value;
        this.registerUser(email,password,"events", this);
    }

    authUser = (email, password, provider, navThis) => {
        var myThis = this;
        var password = {
            password: password,
            provider: provider
        };
    
        // Send the POST request.
        $.ajax("/api/auth/"+email, {
            type: "POST",
            data: password
            }).then(
            function(res, err) {
                if(res.result == "success"){
                    window.$("#loginModal").modal('hide');
                    var elem=$("#invalidLogin");
                    $(elem).html("");
                    navThis.checkSession();
                }else{
                    var elem=$("#invalidLogin");
                    $(elem).html("Please enter a valid email or password.");
                    $(elem).css("color", "red");
                }
                myThis.props.cb();
            }
        );
    }

    authUserModal = () => {
        var password = document.getElementById("signPsw").value;
        var email = document.getElementById("signEmail").value;
        this.authUser(email,password,"events", this);
    }

    eventSignOut = (navThis) => {
        this.signOut();
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

    //--------------------- function to validate email--------------------------
    validateEmail = (elem, email, name) => {
    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email == "" || !re.test(String(email).toLowerCase())){
            elem.css("border-color", "red");
            $(name).html("Please enter a valid email.");
            $(name).css("color", "red");
            return false;
        }else{
            elem.css("border-color", "white");
            $(name).html("");
            return true;
        }
    }

//------------------------- function to validate password---------------------------
    validatePsw = (elem, psw) => {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(!re.test(psw)){
            elem.css("border-color", "red");
            $("#valiPsw").html("Please enter a valid password");
            $("#valiPsw").css("color", "red");
        }else{
            elem.css("border-color", "white");
            $("#valiPsw").html("");
        }
    
    }

//---------------------------function to check the password re-entry--------------
    checkPasswordMatch = () => {
        var password = $("#psw").val();
        var confirmPassword = $("#psw-repeat").val();

        if (password != confirmPassword){
            $("#valiRepeatPsw").html("Passwords do not match!");
            $("#valiRepeatPsw").css("color", "red");
            $("#psw-repeat").css("border-color", "red");
            return false;
        }else{
            $("#valiRepeatPsw").html("");
            $("#psw-repeat").css("border-color", "white");
            return true;
        }
    
    }
    
    
    render(){
    return(
    <>
        {/* <div className ="overlay-content">
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
                                <div id="app-content" className="pt-1"></div>
                                <div id="sign-out"></div>
                            </div>
                        </li>
                        <li>
                            <button id="signOut" type="button" className="btn btn-outline-light" onClick={() => {this.eventSignOut(this)}}>
                                Sign out
                            </button>
                        </li>
                    </ul> 
        </div>
     */}
    
 

               <div id="myNav" class="overlay">                                            
                    {/* <a className="navbar-brand" href="/">Movie Review</a> */}
                    <Overlay/>
                    {/* <ul className="nav bg-primary text-light">
                        <li className="" ><a className={this.props.menus.length != 0 ? "font-weight-normal text-white-50" : "font-weight-bold border-bottom"} href="/search">Search</a></li>
                        <li className="pl-3 "><a className={this.props.menus.length != 0 ? "font-weight-bold border-bottom" : "font-weight-normal text-white-50"} href="/saved">Saved</a></li>
                    </ul> */}          
                </div>
                <NavButton/>  
                

               
                {/* google sign in modal */}
                <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Sign-in User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                            </div>
                            <div className="modal-body text-left">
                                <div>
                                    <div className="google">
                                        <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                                    </div>
                                    <div>
                                        <label for="email"><b>Email</b>
                                            <div id="valiSignEmail"></div>
                                        </label>
                                        <div>
                                            <input type="text" placeholder="Enter Email" name="email" id="signEmail" required />
                                        </div>
                                        <label for="psw"><b>Password</b></label>
                                        <div>
                                            <input type="password" placeholder="Enter Password" name="psw" id="signPsw" required />
                                        </div>
                                        <button type="button" onClick={this.authUserModal} className="btn btn-primary signinbtn">Sign-in</button>
                                        <div id="invalidLogin"></div>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="registerModalLabel">Register User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-left">

                                <label for="email"><b>Email</b>
                                    <div id="valiEmail"></div>
                                </label>
                                <div>
                                    <input type="text" placeholder="Enter Email" name="email" id="email" required />
                                </div>
                                <label for="psw"><b>Password</b>
                                    <div id="valiPsw"></div>
                                </label>
                                <div>
                                    <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
                                </div>
                                <label for="psw-repeat"><b>Repeat Password</b>
                                    <div id="valiRepeatPsw"></div>
                                </label>
                                <div>
                                    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="registerbtn" type="button" onClick={this.registerUserModal} className="btn btn-primary registerbtn">Register</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>

        );
    }
}
export default Nav;
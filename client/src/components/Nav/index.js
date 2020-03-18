import React, { Component } from "react";
import Overlay from './overlay';
import NavButton from './navbutton';
import $ from "jquery";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            
        };
    }

    componentDidMount() {

        //Check to see if the user is already logged in, if update the user name in the UI
        this.checkSession();
        window.navComponent = this;

        //Events to handle validations
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

    //Check to see if the user is already logged in, if update the user name in the UI
    checkSession = () => {
        var myThis = this;
        $.ajax("/api/session", {
            type: "GET"
          }).then(
            function(res) {
              if(res.id) {
                window.$("#register-form").hide();
                window.$("#signin-form").hide();
                window.$(".app").show();
                window.$("#app-content").show();
                window.$("#app-content").html('Logged In as: '+res.id);    
                window.$("#signOut").show();
                myThis.setState({currentUser: res.id});
                window.$("#navbutton").css("color","gold");
              } else {
                window.$("#register-form").show();
                window.$("#signin-form").show();
                window.$("#app-content").hide();
                window.$("#signOut").hide();
                window.$("#navbutton").css("color","white");
              }
            }
          );
    }

    //This would be invoked by Google API once the user has logged in via Google
     onSignIn(googleUser){
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

    //Registers a user with the database
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
                if(!Object.keys(res).includes("id")){
                    var elem=$("#valiEmail");
                    $(elem).html("");
                    window.$('#registerModal').modal('hide');
                    if(provider != "events") 
                        navThis.authUser(email,"", provider, navThis);
                    navThis.clearModal();
                } else {
                    var elem=$("#valiEmail");
                    $(elem).html("User is already registered!");
                    $(elem).css("color", "red");
                    if(provider != "events") 
                        navThis.authUser(email,"", provider, navThis);
                }
                
            }
        );
    }
    keyPressedR(event,myThis) {
        if (event.key === "Enter") {
          myThis.registerUserModal();
          
        }
      }

    //Registers a user with the database
    registerUserModal = () => {
        if(!this.checkPasswordMatch()) {
            return false;
        }
        if(!this.validateEmail($("#email"), $("#email").val(), "#valiEmail")) {
            return false;
        }
        var password = document.getElementById("psw").value;
        var email = document.getElementById("email").value;
        this.registerUser(email,password,"events", this);
    }

    clearModal = () => {
        $("#email").val("");
        $("#email").css("border-color", "white");
        $("#psw").val("");
        $("#psw").css("border-color", "white");
        $("#psw-repeat").val("");
        $("#psw-repeat").css("border-color", "white");
        $("#signEmail").val("");
        $("#signEmail").css("border-color", "white");
        $("#signPsw").val("");
        $("#signPsw").css("border-color", "white");
        $("#invalidLogin").html("");
        $("#valiEmail").html("");
        $("#valiSignEmail").html("");
        
        $("#valiPsw").html("");
        $("#valiRepeatPsw").html("");
    }

    //Authenticates a user
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
                    navThis.clearModal();
                }else{
                    var elem=$("#invalidLogin");
                    $(elem).html("Please enter a valid email or password.");
                    $(elem).css("color", "red");
                }
            }
        );
    }

    keyPressed(event,myThis) {
        if (event.key === "Enter") {
          myThis.authUserModal();
          
        }
      }

    //Authenticates a user
    authUserModal = () => {
        var password = document.getElementById("signPsw").value;
        var email = document.getElementById("signEmail").value;
        this.authUser(email,password,"events", this);
    }

    // User session is deleted and the user is logged out of the application
    eventSignOut = (navThis) => {
        this.signOut();
        $.ajax("/api/session", {
            type: "DELETE"
        }).then(
            function(res) {
          
                navThis.checkSession();
        
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

    //function to validate email
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

    //function to validate password
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

    //function to check the password re-entry
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
    
    //Render the Nav component
    render(){
    return(
    <>
        <div id="myNav" class="overlay">                                           
            <Overlay cb={this.props.cb} />         
        </div>
        <NavButton />  
        {/* google sign in modal */}
        <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content loginModal">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">Sign-in User</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={this.clearModal} aria-label="Close"> <span id="xout" aria-hidden="true">&times;</span> </button>
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
                                    <input type="password" placeholder="Enter Password" name="psw" id="signPsw" required onKeyPress={(event) => {this.keyPressed(event,this)}}/>
                                </div>
                                <button type="button" onClick={this.authUserModal} className="btn btn-outline-primary signinbtn">Sign-in</button>
                                <div id="invalidLogin"></div>
                            </div>

                        </div>

                    </div>
                    <div className="modal-footer">
                        <p>You can only save movies to your dashboard after signing in!</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content registerModal">
                    <div className="modal-header">
                        <h5 className="modal-title" id="registerModalLabel">Register User</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={this.clearModal} aria-label="Close">
                            <span id="xout" aria-hidden="true">&times;</span>
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
                            <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required onKeyPress={(event) => {this.keyPressedR(event,this)}} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="registerbtn" type="button" onClick={this.registerUserModal} className="btn btn-primary signinbtn">Register</button>
                    </div>
                </div>
            </div>
        </div>


        </>

        );
    }
}
export default Nav;
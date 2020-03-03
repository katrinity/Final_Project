import React, { Component } from "react";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
<<<<<<< HEAD
=======

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
                window.$("#app-content").html("Welcome " + res.id + "!");
                window.$("#signOut").show();
              } else {
                window.$("#register-form").show();
                window.$("#signin-form").show();
                window.$(".app").hide();
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

>>>>>>> 36ca9980f272c93652932e03f64a9d11a3fc7f9f
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-primary">
                    <a className="navbar-brand" href="/">Movie Review</a>
<<<<<<< HEAD
=======
                    <ul className="nav bg-primary text-light">
                        <li className="" ><a className={this.props.menus.length != 0 ? "font-weight-normal text-white-50" : "font-weight-bold border-bottom"} href="/search">Search</a></li>
                        <li className="pl-3 "><a className={this.props.menus.length != 0 ? "font-weight-bold border-bottom" : "font-weight-normal text-white-50"} href="/saved">Saved</a></li>
                    </ul>
                    
>>>>>>> 36ca9980f272c93652932e03f64a9d11a3fc7f9f
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <button id="signin-form" type="button" className="btn btn-outline-light ml-3" data-toggle="modal" data-target="#loginModal"> Log in </button>
                        </li>
                        <li>
                            <button id="signin-form" type="button" className="btn btn-outline-light ml-3 mr-3" data-toggle="modal" data-target="#registerModal"> Sign up </button>
                        </li>
                    </ul>
                </nav>

                <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="loginModalLabel">Sign-in User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <div class="google">
                                        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
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
                                        <button type="button" class="btn btn-primary signinbtn">Sign-in</button>
                                        <div id="invalidLogin"></div>
                                    </div>

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="registerModalLabel">Register User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary registerbtn">Register</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>

        );
    }
}
export default Nav;

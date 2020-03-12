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

    

    render() {
        return (
            <>   

               <div id="myNav" class="overlay">                                            
                    {/* <a className="navbar-brand" href="/">Movie Review</a> */}
                    <Overlay/>
                    {/* <ul className="nav bg-primary text-light">
                        <li className="" ><a className={this.props.menus.length != 0 ? "font-weight-normal text-white-50" : "font-weight-bold border-bottom"} href="/search">Search</a></li>
                        <li className="pl-3 "><a className={this.props.menus.length != 0 ? "font-weight-bold border-bottom" : "font-weight-normal text-white-50"} href="/saved">Saved</a></li>
                    </ul> */}          
                </div>
                <NavButton />  
                

               
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
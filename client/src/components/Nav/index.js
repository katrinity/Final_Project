import React, { Component } from "react";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-primary">
                    <a className="navbar-brand" href="/">Movie Review</a>
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

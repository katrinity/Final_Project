import React, { Component } from "react";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary">
                <a className="navbar-brand" href="/">Movie Review</a>
            </nav>
        );
    }
}
export default Nav;

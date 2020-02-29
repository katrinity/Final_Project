import React, { Component } from "react";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
        <div className="wrapper">

            <nav id="sidebar">
            
                <div className="sidebar-header">
                    <h3>Collapsible Sidebar</h3>
                </div>

            
                <ul className="list-unstyled components">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li>
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="#">Page</a></li>
                            <li><a href="#">Page</a></li>
                            <li><a href="#">Page</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>

            <div id="content">
                <button type="button" id="sidebarCollapse" className="navbar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

        </div>
        );
    }
}
export default Sidebar;

import React, { Component } from "react";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
        <div className="menu">
            <nav className="menu">
                <header> Menu <span>x</span></header>
                <ol >
                    <li className="menu-item"><a href="#">Home</a></li>
                    <li className="menu-item"><a href="#">Comedy</a></li>
                    <li className="menu-item"><a href="#">Action</a></li>
                    <li className="menu-item"><a href="#">Must watch</a></li>
                    <li className="menu-item"><a href="#">Waste of Time</a></li>
                </ol>
                <footer>
                    <button arial-label="Togglemenu">Toogle</button>
                </footer>
            </nav>
        </div>
        );
    }
}
export default Sidebar;

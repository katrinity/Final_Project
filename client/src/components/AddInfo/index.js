import React, { Component } from "react";

class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
                <p className="info">{this.props.text}</p>
            </div>
        );
    }
}
export default AddInfo;

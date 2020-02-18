import React, { Component } from "react";

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="bucket">
                <a  href="/">My Bucket</a>
                <div className="card">
                    <div>
                        <a href="comedy"> Comedy</a>
                    </div>
                    <div>
                        <a href="action"> Action</a>
                    </div>
                    <div>
                        <a href="mustWatch"> Must Watch</a>
                    </div>
                    <div>
                        <a href="timeWaste"> Time Waste</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bucket;

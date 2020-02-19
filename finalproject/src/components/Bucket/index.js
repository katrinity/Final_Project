import React, { Component } from "react";

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        
      }
    allowDrop = (ev) => {
        ev.preventDefault();
      }
    render() {
        return (
            <div className="bucket">
                <div className="bucketH">My Bucket</div>
                <div className="row">
                    <div className="col-sm-3">
                        <div id="div1" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Comedy</div>
                            <div > </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div2" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Action</div>
                            <div > </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div3" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Must watch</div>
                            <div > </div>
                        </div>
                    </div>   
                    <div className="col-sm-3">
                        <div id="div4" className="div1" onDrop={this.drop} onDragOver={this.allowDrop}  className="card">
                            <div contenteditable="true" className="catName">Waste of time</div>
                            <div > </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bucket;

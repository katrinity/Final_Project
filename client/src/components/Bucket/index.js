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
                <div className="bucketH"><h1>My Bucket
                    <button type="submit" className="search-button btn btn-primary">Save</button></h1>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div id="div1" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Comedy</div>
                            <a href="" className="bucket1"> More movies...</a>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div2" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Action</div>
                            <a href="" className="bucket2"> More movies...</a>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div id="div3" className="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card">
                            <div contenteditable="true" className="catName">Must watch</div>
                            <a href="" className="bucket3"> More movies...</a>
                        </div>
                    </div>   
                    <div className="col-sm-3">
                        <div id="div4" className="div1" onDrop={this.drop} onDragOver={this.allowDrop}  className="card">
                            <div contenteditable="true" className="catName">Waste of time</div>
                            <a href="" className="bucket4"> More movies...</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bucket;

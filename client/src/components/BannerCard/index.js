import React, {Component} from 'react';

class BannerCard extends Component{
    
    
    constructor(props) {
        super(props);
        this.state = {
            items: ''
        };
    }
    
    render(){
        return(
            <div className="containerBanner">
            <div className="overlayBanner">
                <div className = "items"></div>
                <div className = "items head">
                <p>Movie Here</p>
                <hr></hr>
                </div>
                <div className = "items director">
                <p className="old">Director: </p>
                <p className="new">Release Year:</p>
                <p className = 'genre'>Genre: </p>
                </div>
                <div className="items cart">
                <i class="fas fa-cart-arrow-down"></i>
                <span>SAVE and RATE</span>
            </div>
            </div>
        </div>
        )
    }
}

export default BannerCard;
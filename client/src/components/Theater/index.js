import React, {Component} from 'react';
import $ from 'jquery';
import { isAbsolute } from 'path';
import Banner from '../Banner';



const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

const responsive2 ={
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
}


class Theater extends Component{

    constructor(props) {
        super(props);
        this.state = {
            link: 'http://link.theplatform.com/s/NGweTC/media/cJcMXTtoO5Jk',
        };
      } 


    componentDidMount() {
            
    }
    
    getLinkAgain = (link) => {
        this.setState({link: link})
    }

    render(){
    return(
        <div>
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'col-12'>
                    <video key = {this.state.link} className = 'theater' controls autoPlay muted>
                        <source src = {this.state.link} type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
        <br/>
        <Banner responsive = {responsive1} getLinkAgain = {this.getLinkAgain} mediatype = 'movie' loadElement="trendingMovies"/>
        <Banner responsive = {responsive2} loadElement="trendingTV"/>
        </div>
    )
    }
}

export default Theater;
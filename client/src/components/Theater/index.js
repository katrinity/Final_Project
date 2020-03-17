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
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}


class Theater extends Component{

    constructor(props) {
        super(props);
        this.state = {
            link: 'http://link.theplatform.com/s/NGweTC/media/cJcMXTtoO5Jk',
            height: 0,
            width: 0
        };
      } 


    componentDidMount() {
      this.getDimensions(); 
    }
    
    getLinkAgain = (link) => {
      window.scrollTo({top: 200, behavior: 'smooth'});
      this.setState({link: link})
    }

    getDimensions = () => {
      var width = document.getElementById('vid').offsetWidth;
      var height = document.getElementById('vid').offsetHeight;

      this.setState({ width: width,
                      height: height});
    
    }
    render(){
    return(
        <div className = 'main-wrapper'>
          
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'col-12'>
                    <h1 className = 'askk'>
                      <span id = 'char1'>A</span>
                      <span id = 'char2'>S</span>
                      <span id = 'char3'>K</span>
                      <span id = 'char4'>K</span>
                    </h1>      
                    <p className = 'motto'>Your Movie and TV Show Compendium</p> 
                    
                    {this.state.link.indexOf('youtube')==-1 ? 
                    <video id = 'vid' key = {this.state.link} className = 'theater' controls autoPlay muted>
                        <source src = {this.state.link} type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video> 
                    :
                    <iframe width = {this.state.width}
                    height = {this.state.height} key = {this.state.link} muted
                    src={this.state.link}>
                    </iframe>
                    }
                </div>
            </div>
        </div>
        <br/>
        <Banner responsive = {responsive1} getLinkAgain = {this.getLinkAgain} mediatype = 'movie' loadElement="trendingMovies"/>
        <Banner responsive = {responsive2} getLinkAgain = {this.getLinkAgain} loadElement="trendingTV"/>
        </div>
    )
    }
}

export default Theater;
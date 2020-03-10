import React, {Component} from 'react';
import $ from 'jquery';
import { isAbsolute } from 'path';
import Banner from '../Banner';


const containerStyle = {
   
}


class Theater extends Component{

    constructor(props) {
        super(props);
        this.state = {
            link: 'http://link.theplatform.com/s/NGweTC/media/cJcMXTtoO5Jk',
        };
      } 


      componentDidMount() {
        // Link.getLink();
            
      }
    

      getLinkAgain = (link) => {
        this.setState({link: link})
      }

    render(){
    return(
        <div>
        <div style = {containerStyle} className = 'container'>
            <div className = 'row'>
                <div className = 'col-12'>
                    <video key = {this.state.link} className = 'theater' controls autoPlay>
                        <source src = {this.state.link} type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
        <br/>
        <Banner getLinkAgain = {this.getLinkAgain} mediatype = 'movie' loadElement="trendingMovies"/>
        <Banner loadElement="trendingTV"/>
        </div>
    )
    }
}

export default Theater;
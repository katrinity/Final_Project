import React, {Component} from 'react';
import $ from 'jquery';
import { isAbsolute } from 'path';

const containerStyle = {
   
}


class Theater extends Component{

    constructor(props) {
        super(props);
        this.state = {
            items: '',
            trendingMovies: [],
            trendingTV: []
        };
      } 
    
      componentDidMount() {
        var compThis = this;
            $.ajax({METHOD: "GET", url: "/api/trending-movies"}).done(function (res, status) {           
                compThis.getTrendingTV(compThis, res.result);         
            });
    
            
      }
    
      getTrendingTV = (compThis, movies) => {
        $.ajax({METHOD: "GET", url: "/api/trending-tv"}).done(function (res, status) {        
            compThis.setState({trendingMovies: movies, trendingTV: res.result});      
        });
      }
    


    render(){
    return(
        <div style = {containerStyle} className = 'container'>
            <div className = 'row'>
                <div className = 'col-12'>
                    <video className = 'theater' controls>
                        <source src='http://link.theplatform.com/s/NGweTC/media/n1OKyT_EBLI4' type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
    }
}

export default Theater;
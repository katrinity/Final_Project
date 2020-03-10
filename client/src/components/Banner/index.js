import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BannerCard from '../BannerCard';
import Theater from '../Theater';
import Radium from 'radium';
import $ from 'jquery';
import { isAbsolute } from 'path';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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

class Banner extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        items: '',
        trendingMovies: [],
        trendingTV: [],
        link:''
    };
  } 

  componentDidMount() {
    var compThis = this;
        $.ajax({METHOD: "GET", url: "/api/trending-movies"}).done(function (res, status) {           
            compThis.getTrendingTV(compThis, res.result);         
        }); 
       
  }

  printResults(){
    console.log(this.state.trendingMovies);
    console.log(this.state.trendingTV);
  }

  getTrendingTV = (compThis, movies) => {
    $.ajax({METHOD: "GET", url: "/api/trending-tv"}).done(function (res, status) {        
        compThis.setState({trendingMovies: movies, trendingTV: res.result});      
    });
  }

  getLink = (link) =>{
    this.setState({link: link})
  }
  

  
  render(){
        return(
          <div test = {this.state.trendingMovies} className = 'container'>
          {this.props.mediatype == "movie" ? <h1 className = 'carousel-title'>Trending Movies:</h1> : <h1 className = 'carousel-title'>Trending TV Shows:</h1>}
          <Carousel
          additionalTransfrom={0}
          responsive = {responsive}
          direction = {'right'}
          arrows
          autoPlay
          autoPlaySpeed={20000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          // showDots={true}
          sliderClass=""
          slidesToSlide={3}
          swipeable
        >
          {/* <div><BannerCard/></div>
          <div><BannerCard/></div>
          <div><BannerCard/></div>
          <div><BannerCard/></div>   
          <div><BannerCard/></div> 
          <div><BannerCard/></div> 
          <div><BannerCard/></div>  */}
          {
              this.state[this.props.loadElement].map((value,index) => {
                  if(this.props.loadElement == "trendingMovies") {
                    return <div><BannerCard getLink = {this.props.getLinkAgain} mediatype="movie" index={index} movie={value.movie} youtubeId={value.youtubeId}/></div>
                  } else {
                    return <div><BannerCard mediatype="tv" index={index} movie={value.movie} youtubeId={value.youtubeId}/></div>
                  }
                  
              })
          }
          {/* <div>
          <div style = {{width: '200px', height: '300px'}} className = 'container'>
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
                            <p className="genre">Genre: </p>
                        </div>
                        <div className="items cart">
                            <i class="fas fa-cart-arrow-down"></i>
                            <span>SAVE and RATE</span>
                        </div>
                        </div>
                    </div>
            </div>
          </div>        */}
        </Carousel>
        </div>
        )
    }
}

export default Banner;
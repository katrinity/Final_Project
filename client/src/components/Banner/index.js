import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BannerCard from '../BannerCard';
import Radium from 'radium';
import $ from 'jquery';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          showDots={false}
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
                    return <div><BannerCard mediatype="movie" index={index} movie={value.movie} youtubeId={value.youtubeId}/></div>
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
        )
    }
}

export default Banner;
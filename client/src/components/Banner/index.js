import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BannerCard from '../BannerCard';
import Radium from 'radium';

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
        items: ''
    };
  } 

  
  render(){
        return(
          <Carousel
          additionalTransfrom={0}
          responsive = {responsive}
          direction = {'right'}
          arrows
          autoPlay
          autoPlaySpeed={2000}
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
          <div><BannerCard/></div>
          <div><BannerCard/></div>
          <div><BannerCard/></div>
          <div><BannerCard/></div>   
          <div>
          <div style = {{width: '300px', height: '400px'}} className = 'container'>
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
          </div>       
        </Carousel>
        )
    }
}

export default Banner;
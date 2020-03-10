import React, {Component} from 'react';
import $ from 'jquery';

const zindex = {
    'z-index': -1
};

class BannerCard extends Component{
    
    
    constructor(props) {
        super(props);
        this.state = {
            items: ''
        };
    }

    componentDidMount() {
        $(".overlayBanner").hide();

    }

    showMovie = (id) => {
        $(id).show();
    }

    

    enableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','145');
        $(id).attr("controls",true);
        // $(".movie-image").css('transform','scale(0.5)');
        $(id).css('z-index','145');
        $(id).css('transform','scale(1.5)');
        
        // document.getElementById(id).width = 560;
        // document.getElementById(id).play();
    }
    
    disableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','-1');
        $(id).attr("controls",false);
        $(id).css('z-index','-1');
        $(id).css('transform','scale(1)');
        // $(".movie-image").css('transform','scale(1)');
        // document.getElementById(id).pause();
    }

    movieContent = () => {
        return <div   onMouseLeave={() => {this.disableControls(".movie-image" + this.props.index, this.props.index)} } onMouseEnter={() => {this.enableControls(".movie-image" + this.props.index, this.props.index)} } id={"movie-image-container" + this.props.index} className={"col-mb-4 movie-image-container" + " movie-image-container" + this.props.index}>
        <video id={"movie-image" + this.props.index} className={"movie-image-trending " + "movie-image" + this.props.index} poster={this.props.movie.image}>
                    <source src={this.props.movie.mainTrailer.sourceId} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <div class="movie-title">{this.props.movie.title.substring(0,20) + (this.props.movie.title.length > 20 ? "..." : "")}</div>
                </div>
    }

    tvContent = () => {
        return <div   className={"col-mb-4 tv-image-container" + " tv-image-container" + this.props.index}>
                <img className="tv-image-trending" src={this.props.movie.posters.primary}/>
                <div class="movie-title">{this.props.movie.title.substring(0,20) + (this.props.movie.title.length > 20 ? "..." : "")}</div>
                </div>
    }

    resizeImageContainer = (id) => {
        $(id).attr("controls",true);
    }
    
    
    render(){
        return(
            <div className={"row containerBanner" + " containerBanner" + this.props.index} >
                
                {this.props.mediatype == "movie" ? this.movieContent() : this.tvContent()}
                
                
                <div  index={this.props.index} id={"overlayBanner" + this.props.index} className={"col-mb-8 overlayBanner" + " overlayBanner" + this.props.index}>
                <iframe className="movie-frame d-block " src={"https://www.youtube.com/embed/"+this.props.youtubeId+"?rel=0"} frameborder="0"></iframe>
                    <div ></div>
                    <div id={"title" + this.props.index} className="title color-white">
                        <p>{this.props.movie.title}</p>
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
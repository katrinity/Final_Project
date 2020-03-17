import React, {Component} from 'react';
import $ from 'jquery';
import Theater from '../Theater';


class BannerCard extends Component{
    
    
    constructor(props) {
        super(props);
        this.state = {
            link: '',
        };
    }

    componentDidMount() {
        // $(".overlayBanner").hide();
        // this.removeEmTag(this.props.movie.synopsis);
    }

    showMovie = (id) => {
        $(id).show();
    }

    getLink = () => {
        this.setState({link: this.props.movie.mainTrailer.sourceId});
        
    }

    enableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','145');
        $(id).attr("controls",true);
        // $(".movie-image").css('transform','scale(0.5)');
        $(id).css('z-index','145');
        // $(id).css('transform','scale(1.5)');
        
        // document.getElementById(id).width = 560;
        // document.getElementById(id).play();
    }
    
    disableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','-1');
        $(id).attr("controls",false);
        $(id).css('z-index','-1');
        // $(id).css('transform','scale(1)');
        // $(".movie-image").css('transform','scale(1)');
        // document.getElementById(id).pause();
    }


    movieContent = () => {
        return (
            
            <div  onMouseLeave={() => {this.disableControls(".movie-image" + this.props.index, this.props.index)} } onMouseEnter={() => {this.enableControls(".movie-image" + this.props.index, this.props.index)} } id={"movie-image-container" + this.props.index} className={"col-mb-4 movie-image-container" + " movie-image-container" + this.props.index}>
            {/* <video id={"movie-image" + this.props.index} className={"movie-image-trending " + "movie-image" + this.props.index} poster={this.props.movie.image}>
                    <source src={this.props.movie.mainTrailer.sourceId} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video> */}

                <img id={"movie-image" + this.props.index} className={"movie-image-trending " + "movie-image" + this.props.index} src={this.props.movie.image} alt = {this.props.index}>
                </img>
                {/* <div class="movie-title">{this.props.movie.title.substring(0,20) + (this.props.movie.title.length > 20 ? "..." : "")}</div> */}
                <div onClick = {()=>this.props.getLink(this.props.movie.mainTrailer.sourceId)} index={this.props.index} id={"overlayBanner" + this.props.index} className={"col-mb-8 overlayBanner" + " overlayBanner" + this.props.index}>
                
                {/* <iframe className="movie-frame d-block " src={"https://www.youtube.com/embed/"+this.props.youtubeId+"?rel=0"} frameborder="0"></iframe> */}
                    <div ></div>
                  
                    <div id={"title" + this.props.index} className="title color-white">
                        <p>{this.props.movie.title}</p>
                        {/* <hr></hr> */}
                    </div>
                     
                    
                    <div className = "items director">
                        <p className="old">Director: <strong>{this.props.youtubeId.director[0].name} </strong></p>
                        <p className="new">Release Year: <strong>{this.props.movie.theaterReleaseDate} 2020</strong></p>
                        <p className = 'genre'>Genre: <strong>{this.props.youtubeId.genre[0]} </strong></p>
                       
                    </div>                 
                    
                    <div className="items cart">
                        <i className="fas fa-cart-arrow-down"></i>
                        <span>SAVE and RATE</span>
                    </div>
                    
                    <div className = 'synopsis'>
                       {this.props.movie.synopsis}
                    </div>
                </div>

                
            </div>          
        )
    }

    tvContent = () => {
        return <div className={"col-mb-4 tv-image-container" + " tv-image-container" + this.props.index}>
                <img className="tv-image-trending" src={this.props.movie.posters.primary}/>
                {/* <div class="movie-title">{this.props.movie.title.substring(0,20) + (this.props.movie.title.length > 20 ? "..." : "")} */}
                <div onClick = {()=>this.props.getLink("https://www.youtube.com/embed/"+this.props.youtubeId + '?autoplay=1&mute=1')}index={this.props.index} id={"overlayBanner" + this.props.index} className={"col-mb-8 overlayBanner" + " overlayBanner" + this.props.index}>
                
                {/* <iframe className="movie-frame d-block " src={"https://www.youtube.com/embed/"+this.props.youtubeId+"?rel=0"} frameborder="0"></iframe> */}
                    <div ></div>
                  
                    <div id={"title" + this.props.index} className="title color-white">
                        <p>{this.props.movie.title}</p>
                        <hr></hr>
                    </div>
{/* 
                    <div className = "items director">
                        <p className="old">Director: {this.props.youtubeId.director}</p>
                        
                        <p className="new">Release Year: {this.props.movie.theaterReleaseDate} 2020</p>
                        <p className = 'genre'>Genre: {this.props.youtubeId.genre} </p>
                    </div> */}

                    <div className="items cart">
                        <i className="fas fa-cart-arrow-down"></i>
                        <span>SAVE and RATE</span>
                    </div>
                </div>
                </div>
                // </div>
    }

    resizeImageContainer = (id) => {
        $(id).attr("controls",true);
    }
    
    
    render(){
        return(
            <div>
            <div className={"row containerBanner" + " containerBanner" + this.props.index} data-id={this.props.movie.id} >
                
                {this.props.mediatype == "movie" ? this.movieContent() : this.tvContent()}
                
            </div>
            </div>
        )
    }
}

export default BannerCard;
import React, { Component } from "react";
import $ from 'jquery';
const axios = require("axios");

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                
            },
            
            movieTrailers: [
                
            ]
        };
    }
    addEmoji = (url, text)=>{
        var emojiDiv = $("<span id='emoji1' class='emoji'>");
        $("#showEmoji").empty();
      $("#showEmoji").append(emojiDiv);          
          var emojiImage = $('<img id="emojiImage">')
              .attr("class", 'emoji_images')
              .attr("src", url);
              
          $(emojiDiv).append(emojiImage);
          $(emojiDiv).append(text);
    
    }

    render() {
        return(
            <>
            <div id="showEmoji">
                <div className="text-muted pt-1 d-inline">Click an emoji to rate this movie!</div> 
            </div>
            <div className="form-group" id="formBackground">
                <textarea rows="5" cols="20" wrap="hard"type="field" id="inputField" placeholder="Tell us how you really feel.." maxlength="150"/>
            </div>
            
            <span id="emojiBtn">
                <span>
                    <span><img className='emoji_images' onClick={() => {this.addEmoji('https://media1.giphy.com/media/cNEkiz27tOidqUBuoR/giphy.gif?cid=5bb8f59ca32da18d5db7e3eec65bfc6485b1322c7076fe51&rid=giphy.gif', "Love it!")}} src='https://media1.giphy.com/media/cNEkiz27tOidqUBuoR/giphy.gif?cid=5bb8f59ca32da18d5db7e3eec65bfc6485b1322c7076fe51&rid=giphy.gif'/></span>
                </span>
                <span>
                    <img className='emoji_images' onClick={() => {this.addEmoji('https://media1.giphy.com/media/2fIbmaiOnI3VlQFZEq/giphy.gif?cid=5bb8f59c42e8574e14297affade56521b2c2e09a17c571e5&rid=giphy.gif', "Very Funny!")}} src='https://media1.giphy.com/media/2fIbmaiOnI3VlQFZEq/giphy.gif?cid=5bb8f59c42e8574e14297affade56521b2c2e09a17c571e5&rid=giphy.gif'/>
                </span>
                <span>
                    <img className='emoji_images' onClick={() => {this.addEmoji('https://media1.giphy.com/media/yN4RUYrRRrKVRoGqQm/giphy.gif?cid=5bb8f59c088fc0f7e47356326fca34b85ba4fa89269ee73f&rid=giphy.gif', "Hate i!")}} src='https://media1.giphy.com/media/yN4RUYrRRrKVRoGqQm/giphy.gif?cid=5bb8f59c088fc0f7e47356326fca34b85ba4fa89269ee73f&rid=giphy.gif'/>
                </span>
                <span>
                    <img className='emoji_images' onClick={() => {this.addEmoji('https://media0.giphy.com/media/TgGWZwWlsODxFPA21A/giphy.gif?cid=5bb8f59c6a8b5177645135e80c211200296a599b35fc109c&rid=giphy.gif', "Great movie!" )}} src='https://media0.giphy.com/media/TgGWZwWlsODxFPA21A/giphy.gif?cid=5bb8f59c6a8b5177645135e80c211200296a599b35fc109c&rid=giphy.gif'/>
                </span>
                <span>
                    <img className='emoji_images' onClick={() => {this.addEmoji('https://media1.giphy.com/media/3OsFzorSZSUZcvo6UC/giphy.gif?cid=5bb8f59ce67e551ac6b809f9280b8411078bfa3057e7b31a&rid=giphy.gif', "Very Entertaining!" )}} src='https://media1.giphy.com/media/3OsFzorSZSUZcvo6UC/giphy.gif?cid=5bb8f59ce67e551ac6b809f9280b8411078bfa3057e7b31a&rid=giphy.gif'/>
                </span>
            </span>
            </>
        );
    }
}
export default Review;
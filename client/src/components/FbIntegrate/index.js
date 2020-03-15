import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';
// import {
//     EmailShareButton,
//     TwitterShareButton,
//     FacebookShareButton,
//     WhatsappShareButton,}from "react-share";

 
export default class FbIntegrate extends Component {
  render() {
      let val = this.props.value;
      let cc = "http://localhost:3000/saved/" + val

        return (
        <FacebookProvider appId="913152545781163">
            <ShareButton href={cc} >
            Share
            </ShareButton>
        </FacebookProvider>
        );
  }
}
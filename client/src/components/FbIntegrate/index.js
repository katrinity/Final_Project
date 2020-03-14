import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';
// import {
//     EmailShareButton,
//     TwitterShareButton,
//     FacebookShareButton,
//     WhatsappShareButton,}from "react-share";

 
export default class FbIntegrate extends Component {
  render() {
    return (
      <FacebookProvider appId="913152545781163">
        <ShareButton href="http://www.facebook.com">
          Share
        </ShareButton>
      </FacebookProvider>
    );
  }
}
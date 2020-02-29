import React from 'react';
import Carousel from '../../components/Carousel';
import AddInfo from '../../components/AddInfo';
import Footer from '../../components/Footer';
import Bucket from '../../components/Bucket';

function Main() {
    return (
      <div>
        <Carousel />
        <Bucket />
        <Footer/>
      </div>
    );
  }

export default Main;
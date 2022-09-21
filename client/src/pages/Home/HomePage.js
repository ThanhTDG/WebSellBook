import React from 'react';
import './HomePage.scss'
import '../../components/Menu/Menu'
import Menu from '../../components/Menu/Menu';
import ImageSlider from '../../components/Carousel/ImageSlider';
import MyFooter from '../../components/Footer/MyFooter';
import { MyVariable } from '../../variables/variables';
const HomePage = () => {
    // const slides = [
    //     { url: `${MyVariable.hostName}/assets/banners/banner0.png`, title: "beach" },
    //     { url: `${MyVariable.hostName}/assets/banners/banner1.gif`, title: "boat" },
    //     { url: `${MyVariable.hostName}/assets/banners/banner2.gif`, title: "forest" },
    //   ];
    var banners = []
    MyVariable.Banners.forEach((banner)=>(
      banners.push({
        url: `${MyVariable.hostName}${banner.url}`,
        title: `${banner.title}`,
        backColor: `${banner.backColor}`
      })
    ))
      return (
        <div>
          <Menu active='Trang Chủ'/>
          <div className='homepage-banner'>
            <ImageSlider slides={banners} />
          </div>
          <MyFooter />
        </div>
      );
}

export default HomePage;

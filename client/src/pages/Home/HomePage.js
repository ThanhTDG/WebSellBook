import React from 'react';
import './HomePage.scss'
import '../../components/Menu/Menu'
import Menu from '../../components/Menu/Menu';
import ImageSlider from '../../components/Carousel/ImageSlider';
import MyFooter from '../../components/Footer/MyFooter';
import { MyVariable } from '../../variables/variables';
import Books from '../../components/Book/Books';
import { FakeData } from '../../variables/FakeData';
const HomePage = () => {
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
          <Books bookData={FakeData.books} title={MyVariable.BookTopics[0]} color={'var(--Orange)'}/>
          <Books bookData={FakeData.books} title={MyVariable.BookTopics[1]} color={'var(--Pink)'}/>
          <MyFooter />
        </div>
      );
}

export default HomePage;

import React, { useState, useEffect } from 'react';
import * as booksServies from '../../apiServices/booksServices'
import './HomePage.scss';
import '../../components/Menu/Menu';
import Menu from '../../components/Menu/Menu';
import ImageSlider from '../../components/Carousel/ImageSlider';
import MyFooter from '../../components/Footer/MyFooter';
import { MyVariable } from '../../variables/variables';
import { FakeData } from '../../variables/FakeData';
import FavoriteBook from '../../components/User/Favorite/FavoriteBook';
import LoadingBookFavorite from '../../components/Loading/LoadingBookFavorite/LoadingBookFavorite';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DisplayBook from '../../components/DisplayBookInHomePage/DisplayBook';
import * as Tools from '../../CustomeTools/Tools'
import LoadingDisplayBook from '../../components/DisplayBookInHomePage/Loadding/LoadingDisplayBook';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  var banners = []
  const [apiBooks, setApiBooks] = useState([])
  MyVariable.Banners.forEach((banner) => (
    banners.push({
      url: `${MyVariable.hostName}${banner.url}`,
      title: `${banner.title}`,
      backColor: `${banner.backColor}`
    })
  ))
  function getTitleStyle(color) {
    return {
      color: color,
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchApi()
  }, [])

  const fetchApi = async () => {
    const booksResult = await booksServies.books()
    setIsLoading(false)
    setApiBooks(booksResult.docs)
  }



  const renderBooks = isLoading === true ?
    <div className='hot-search grid-books-container'>
      {FakeData.books.map((book) => (
        <LoadingBookFavorite height={340} />
      ))}
    </div> :
    <div className='hot-search grid-books-container'>
      {
        apiBooks.map((book) => (
          <FavoriteBook bookData={book} height='340' />
        ))
      }
    </div>

  const { height, width } = Tools.useWindowDimensions()

  // const SliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   lazyLoad: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000
  // };

  useEffect(() => {
    SetSilderSettings({
      ...SliderSettings,
      slidesToShow: width <= 400? 2: width>400 && width<=1000? 2: 3,
      centerMode: width <= 400? false: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const [SliderSettings, SetSilderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000
  })

  const renderBookSliders = (start, size) => {
    var toRenders = []
    let max = start + size
    for (let i = start; i < max; i++) {
      toRenders.push(
        <div>
          <DisplayBook book={apiBooks[i]} key={i} />
        </div>
      )
    }
    return toRenders
  }

  const renderLoadingBookSliders = () =>{
    var toRenders =[]
    for(let i=0; i<6; i++){
      toRenders.push(<div>
        <LoadingDisplayBook />
      </div>)
    }
    return toRenders
  }

  return (
    <div>
      <Menu active='Trang Chủ' />
      <div className='home-page-body'>
        <div className='homepage-banner'>
          <ImageSlider slides={banners} />
        </div>
        <div className='home-page-books-title' style={getTitleStyle('var(--Darkest)')}>
          Tìm kiếm nhiều nhất
        </div>
        {/* {renderBooks} */}
        <div className='home-page-books'>
          <Slider {...SliderSettings}>
            {
              isLoading ? renderLoadingBookSliders() :
                renderBookSliders(0, 8)
                //renderLoadingBookSliders()
            }
          </Slider>
        </div>

        <div className='home-page-books-title' style={getTitleStyle('var(--Darkest)')}>
          Bán chạy nhất
        </div>
        <div className='home-page-books'>
          <Slider {...SliderSettings}>
            {
              isLoading ? renderLoadingBookSliders() :
                renderBookSliders(8, 8)
                //renderLoadingBookSliders()
            }
          </Slider>
        </div>

      </div>
      <MyFooter />
    </div>
  );
}

export default HomePage;

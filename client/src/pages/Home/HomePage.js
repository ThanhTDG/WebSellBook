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
import * as bookDetail  from '../../apiServices/bookDetailService';
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  var banners = []
  const [apiBooks, setApiBooks] =useState([])
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

  useEffect(()=>{
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

  return (
    <div>
      <Menu active='Trang Chủ' />
      <div className='home-page-body'>
        <div className='homepage-banner'>
          <ImageSlider slides={banners} />
        </div>
        <div className='home-page-books-title' style={getTitleStyle('var(--Pink)')}>
          Tìm kiếm nhiều nhất
        </div>
        {renderBooks}
      </div>
      <MyFooter />
    </div>
  );
}

export default HomePage;

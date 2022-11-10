import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import BookDetail from './components/Book/BookDetail';
import BooksPage from './pages/Books/Books';
import Cart from './pages/Cart/Cart';
import ContactUs from './pages/Contact/Contact';
import HomePage from './pages/Home/HomePage';
import UserAccount from './pages/UserAccount/UserAccount';
const App = () => {
    return (
        <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/bookdetail" element={<BookDetail/>} />
          <Route path="/useraccount" element={<UserAccount/>} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      </Router>
    );
}

export default App;

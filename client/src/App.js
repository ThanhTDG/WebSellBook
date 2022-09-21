import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Books from './pages/Books/Books';
import Cart from './pages/Cart/Cart';
import ContactUs from './pages/Contact/Contact';
import HomePage from './pages/Home/HomePage';
const App = () => {
    return (
        <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/books" element={<Books/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      </Router>
    );
}

export default App;

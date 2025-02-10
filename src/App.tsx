import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsList from './components/ProductsList';
import NavigationBar from './layout/NavigationBar';
import ProfilePage from './components/ProfilePage';
import CartPage from './components/CartPage';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
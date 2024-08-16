import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Profile from './Profile'; 
import styles from '../styles/App.module.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
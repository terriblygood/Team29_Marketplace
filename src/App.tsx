import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./pages/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

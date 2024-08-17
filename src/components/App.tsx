import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import ProductList from "../pages/ProductList/ProductList";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import styles from "../styles/App.module.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />{" "}
          {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

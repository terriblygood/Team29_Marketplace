import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./pages/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import styles from "./App.module.scss";
import { useAppDispatch } from "./store/hooks";
import { fetchAuth } from "./store/userThunkActions";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const findUser = async (): Promise<void> => {
      if (localStorage.getItem("user")) {
        await dispatch(
          fetchAuth({ data: JSON.parse(localStorage.getItem("user")!) })
        );
      }
    };
    findUser();
  }, [dispatch]);

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

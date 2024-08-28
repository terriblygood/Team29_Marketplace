import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./pages/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
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
      <ErrorBoundary>
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
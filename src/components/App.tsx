import React from 'react';
import Header from './Header';
import ProductList from './ProductList';
import styles from '../styles/App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <ProductList />
    </div>
  );
};

export default App;
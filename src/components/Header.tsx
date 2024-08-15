import React from 'react';
import styles from '../styles/Header.module.css';
import profileIcon from '../assets/profile-icon.svg';
import cartIcon from '../assets/cart-icon.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Веб-Ларёк</div>
      <div className={styles.icons}>
        <img src={profileIcon} alt="Profile" className={styles.icon} />
        <img src={cartIcon} alt="Cart" className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
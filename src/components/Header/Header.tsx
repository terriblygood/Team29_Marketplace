import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import styles from "./Header.module.scss";
import profileIcon from "../../assets/profile-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const uniqueItemCount = cartItems.length;

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Веб-Ларёк
      </div>
      <div className={styles.icons}>
        <img
          src={profileIcon}
          alt="Profile"
          className={styles.icon}
          onClick={() => navigate("/profile")}
        />
        <div
          className={styles.cartIconWrapper}
          onClick={() => navigate("/cart")}
        >
          <img src={cartIcon} alt="Cart" className={styles.icon} />
          {uniqueItemCount > 0 && (
            <div className={styles.cartBadge}>{uniqueItemCount}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

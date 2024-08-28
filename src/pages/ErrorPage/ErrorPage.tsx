import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
    navigate("/");
  };

  return (
    <div className={styles.errorPage}>
      <h1>Что-то пошло не так</h1>
      <p>Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
      <button onClick={handleReload} className={styles.reloadButton}>
        Перезагрузить страницу
      </button>
    </div>
  );
};

export default ErrorPage;

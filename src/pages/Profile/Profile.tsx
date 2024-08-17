import React, { useState } from 'react';
import styles from './Profile.module.scss'; 

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // тут бдует логика auth
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            placeholder='Ваша почта'
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            placeholder='Ваш пароль'
          />
        </label>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Profile;
import React from 'react';
import styles from './Header2.module.css'; // Import CSS module correctly

const Header2 = ({ title, image, children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__containerBg}>
          <img src={image} alt="Header Background Image" />
        </div>
        <div className={styles.header__content}>
          <h1><span style={{ color: 'black' }}>{title}</span></h1>
          <h2><p><span style={{ color: 'LimeGreen' }}>{children}</span></p></h2>
        </div>
      </div>
    </header>
  );
}

export default Header2;

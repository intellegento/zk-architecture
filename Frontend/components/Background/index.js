// Background.js
import React from 'react';
import styles from './styles.module.scss';

const Background = ({ animate }) => {
  return <div className={`${styles.background} ${animate ? styles.fadeOut : ''}`} />;
};

export default Background;

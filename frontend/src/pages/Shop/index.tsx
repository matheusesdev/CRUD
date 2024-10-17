import React from 'react';
import styles from './Stocks.module.css';
import { Sidebar } from '../../components/Sidebar';

const Shop: React.FC = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.main}>
        
      </div>
    </div>
  );
};

export default Shop;
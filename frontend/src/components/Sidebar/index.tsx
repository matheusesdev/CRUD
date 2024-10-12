import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>DCM System</h3>
      </div>
      <div className={styles.sidebarBody}>
        <ul>
          <li>
              <a href='/portal'>Home</a>
          </li>
          <div className={styles.divider}/>
          <li>
            <a href='/products'>Products</a>  
          </li>
          <div className={styles.divider}/>
          <li>
           <a href="/stocks">Stocks</a>
          </li>
        </ul>
      </div>
        
    </div>
  );
};


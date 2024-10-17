import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom'

export const Sidebar: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    navigate('/login');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>DCM System</h3>
      </div>
      
      <ul className={styles.nav}>
        <div className={styles.list}>
          <li className={location.pathname === '/portal' ? styles.active : styles.navItem}>
              <button onClick={() => navigate('/portal')} className={styles.buttonNav}>Home</button>
          </li>
          <div className={styles.divider}/>
          <li className={location.pathname === '/products' ? styles.active : styles.navItem}>
            <button onClick={() => navigate('/products')} className={styles.buttonNav}>Products</button>  
          </li>
          <div className={styles.divider}/>
          <li className={location.pathname === '/shop' ? styles.active : styles.navItem}>
            <button onClick={() => navigate("/shop")} className={styles.buttonNav}>Shop</button>
          </li>
        </div>
        
        <button onClick={handleLogout} className={styles.buttonLogout}>Logout</button>
      </ul>
      
      
      
    </div>
        
  
  );
};


import React from 'react';
import styles from './Portal.module.css';
import profile from '../../assets/profile.jpeg';
import { IoIosArrowDown } from "react-icons/io";
import { Sidebar } from '../../components/Sidebar';

const Portal: React.FC = () => {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <div className={styles.portal}>
        <div className={styles.menu}>
          <h2>Portal</h2>

          <div className={styles.menuoptions}>
            <div className={styles.profile}>
              <img src={profile} alt="" />
            </div>
            <button className={styles.downarrow} style={{backgroundColor:'transparent', border:'none', fontSize: '1.6rem', color:'black' }}>
              <IoIosArrowDown />
            </button>
          </div>
        </div>

        <div className={styles.dashboards}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Card 1</h3>
              <p>Card 1 description</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Portal;
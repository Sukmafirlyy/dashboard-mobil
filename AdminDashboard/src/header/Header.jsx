import React, { useState, useEffect } from 'react'
import { MdOutlineSpeed, MdHistory, MdQuestionMark, MdTrain, MdLocationOn, MdSearch, MdFormatAlignJustify, MdOutlineNotificationsActive, MdPerson } from 'react-icons/md'
import axios from 'axios';
import styles from './Header.module.css'; // Import CSS module
import Button from '@mui/material/Button';


function Header({ toggleSidebar }) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [buttonColor, setButtonColor] = useState('primary');

  useEffect(() => {
    //simulasi pengecekan data yang melebihi batas yang ditentukan
    const checkData = async () => {
      try {
        const response = await axios.get('http://localhost:5001');
        if (response.data.dataLimitExceeded) {
          setHasNotification(true);
          setNotificationMessage('Data melebihi batas yang diizinkan!');
        } else {
          setHasNotification(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasNotification(false);
      }
    };

    checkData();
  }, []);

  const handleNotificationClick = () => {
    setShowMessage(!showMessage);
  };

  const handleButtonClick = () => {
    // Mengubah warna button menjadi hijau
    setButtonColor('success');

    // Kembali ke warna semula setelah 1 detik
    setTimeout(() => {
      setButtonColor('primary');
    }, 1000);
  };


  return (
    <header className={styles.header}>
      <div className={styles.menuIcon}>
        <MdFormatAlignJustify className={styles.icon} onClick={toggleSidebar} />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.notificationIcon} onClick={handleNotificationClick}>
          <MdOutlineNotificationsActive className={styles.icon} />
          {hasNotification && <span className={styles.notificationDot}></span>}
        </div>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          className={`${styles.customButton} ${buttonColor === 'success' ? styles.successButton : ''}`}
        >
          Start
        </Button>
      </div>
      {showMessage && hasNotification && (
        <div className={styles.notificationMessage}>
          {notificationMessage}
        </div>
      )}
    </header>
  )
}

export default Header


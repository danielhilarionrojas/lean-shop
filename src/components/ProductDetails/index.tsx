import React from 'react';
import styles from './ProductDetails.module.scss';

import medalIcon from '@/assets/medal.png';
import truckIcon from '@/assets/truck.png';
import handshakeIcon from '@/assets/handshake.png';
import headphonesIcon from '@/assets/headphones.png';
import creditCardIcon from '@/assets/creditCard.png';
import Image from 'next/image';

const ProductDetails = () => {
  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.activeTab}`}>DESCRIPTION</div>
        <div className={styles.tab}>ADDITIONAL INFORMATION</div>
        <div className={styles.tab}>SPECIFICATION</div>
        <div className={styles.tab}>REVIEW</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>
            The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip—the first Apple silicon designed for pros—you get groundbreaking performance and amazing battery life.
          </p>
          <p>
            Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
          </p>
        </div>
        
        <div className={styles.feature}>
          <h3>Feature</h3>
          <ul>
            <li>
              <Image src={medalIcon.src} alt="Medal Icon" className={styles.icon} width={24} height={24}/> Free 1 Year Warranty
            </li>
            <li>
              <Image src={truckIcon.src} alt="Truck Icon" className={styles.icon} width={24} height={24}/> Free Shipping & Fasted Delivery
            </li>
            <li>
              <Image src={handshakeIcon.src} alt="Handshake Icon" className={styles.icon} width={24} height={24}/> 100% Money-back guarantee
            </li>
            <li>
              <Image src={headphonesIcon.src} alt="Headphones Icon" className={styles.icon} width={24} height={24}/> 24/7 Customer support
            </li>
            <li>
              <Image src={creditCardIcon.src} alt="Credit Card Icon" className={styles.icon} width={24} height={24}/> Secure payment method
            </li>
          </ul>
        </div>

        <div className={styles.shippingInfo}>
          <h3>Shipping Information</h3>
          <ul>
            <li><strong>Courier:</strong> 2-4 days, free shipping</li>
            <li><strong>Local Shipping:</strong> up to one week, $19.00</li>
            <li><strong>UPS Ground Shipping:</strong> 4-6 days, $29.00</li>
            <li><strong>Unishop Global Export:</strong> 3-4 days, $39.00</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

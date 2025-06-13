'use client'
import React, { useState, useEffect } from 'react';
import styles from '../adminpages.module.css';

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Abfrage durch einen Check ersetzen, ob mitgegebene props daten enthalten
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.contentGrid}>
          <div className={styles.gridElement}>
            Balalala
          </div>
                    <div className={styles.gridElement}>
            Balalala
          </div>
                    <div className={styles.gridElement}>
            Balalala
          </div>
                    <div className={styles.gridElement}>
            Balalala
          </div>
                    <div className={styles.gridElement}>
            Balalala
          </div>
                    <div className={styles.gridElement}>
            Balalala
          </div>
        </div>
  );
}
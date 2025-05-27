'use client'
import { redirect } from "next/navigation";
import styles from "./page.module.css";


export default function page() {

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Ihre Anlaufstelle für Geschäftsreisen</h1>
        <button className={styles.button}onClick={() => redirect("/booking")}>Jetzt Buchen</button>
        </div>
    </div>
  );
}

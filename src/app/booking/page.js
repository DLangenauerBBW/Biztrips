'use server'
import styles from "./booking.module.css";

export default async function page() {

  return (
    <div className={styles.container}>
        <h1>Ihre Anlaufstelle für Geschäftsreisen</h1>
    </div>
  );
}

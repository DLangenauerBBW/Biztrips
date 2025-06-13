'use server'
import styles from "../adminpages.module.css";
import ClientPage from "./clientPage.js";

export default async function page() {
//TODO Hier die Daten zum Rendern Fetchen

  return (
    <div className={styles.container}>
       <ClientPage/>
    </div>
  );
}

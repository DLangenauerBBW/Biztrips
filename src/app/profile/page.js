'use server'
import styles from "./profile.module.css"
import ClientPage from "./clientPage.js"
import { getBookings } from "../lib/Fetch"

export default async function page() {
   let bookings = await getBookings()
   console.log(bookings)
  return (
    <div className={styles.container}>
       <ClientPage bookings={bookings}/>
    </div>
  )
}

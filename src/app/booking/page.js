'use server'
import { getBusinessTrips, getFlights, getHotels } from "../lib/Fetch"
import ClientPage from "./clientPage"

export default async function page() {
  let flights = await getFlights()
  let biztrips = await getBusinessTrips()
  let hotels = await getHotels()
  console.log(hotels)
  return (
    <>
        <ClientPage biztrips={biztrips} flights={flights} hotels={hotels} />
    </>
  )
}

'use server'
import { getBusinessTrips, getEmployees, getFlights } from "../lib/Fetch";
import ClientPage from "./clientPage";

export default async function page() {

  return (
    <>
        <ClientPage />
    </>
  );
}

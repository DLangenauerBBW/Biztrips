'use server'

async function sendFetch(table, options) {
  const res = await fetch(`http://localhost:8080${table}`, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  })
  if (!res.ok) throw new Error(res)
    console.log(res)
  return res.json()
}

//Muss Data umformen wegen komischem backend Java Fehler
function transformData(data) {
  return {
    businesstrip: { id: data.businesstrip_id },
    flight: { id: data.flight_id },
    hotel: { id: data.hotel_id },
    employee: { id: data.employee_id }
  };
}

export async function getBusinessTrips() {
  return sendFetch('/api/businesstrips')
}

export async function getFlights() {
  return sendFetch(`/api/flights`)
}

export async function getHotels() {
  return sendFetch(`/api/hotels`)
}

export async function getEmployees() {
  return sendFetch(`/api/employees`)
}

export async function getBookings() {
  return sendFetch(`/api/bookings`)
}

export async function postBookings(data) {
  
  const nowItsTheRightData = transformData(data);
  console.log(JSON.stringify(nowItsTheRightData))
  return sendFetch(`/api/bookings`, {method: "POST", body: JSON.stringify(nowItsTheRightData)} )
}



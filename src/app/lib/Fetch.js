'use server';

async function sendFetch(endpoint, method) {
  const res = await fetch(`http://localhost:8080${endpoint}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export async function getBusinessTrips() {
  return sendFetch('/api/businesstrips');
}

export async function getFlights() {
  return sendFetch(`/api/flights`);
}

export async function getHotels(businesstrip_id) {
  return sendFetch(`/api/hotels?businesstrip_id=${businesstrip_id}`);
}

export async function getEmployees() {
  return sendFetch(`/api/employees`);
}
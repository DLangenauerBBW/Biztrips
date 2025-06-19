'use client';

import { useState, useEffect, useContext } from 'react';
import styles from './booking.module.css';
import Pagination from '../Components/Pagination';
import Tile from '../Components/Tile';
import { UserContext } from '../lib/UserContext';

const data = {
  businesstrips: [
    { id: 1, title: 'Client Meeting in Berlin', description: 'Q3 Strategy Meeting', location: 'Berlin, Germany' },
    { id: 2, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' },
    { id: 3, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' },
    { id: 4, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' },
    { id: 5, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' },
    { id: 6, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' },
    { id: 7, title: 'Trade Show in New York', description: 'Annual Tech Expo', location: 'New York, USA' }
  ],
  flights: [
    { id: 1, flight_number: 'LH1234', businesstrip_id: 1, arrival: '2025-07-09', departure: '2025-07-12', destination: 'Berlin' },
    { id: 2, flight_number: 'UA5678', businesstrip_id: 2, arrival: '2025-08-14', departure: '2025-08-16', destination: 'New York' },
    { id: 3, flight_number: 'LH1235', businesstrip_id: 1, arrival: '2025-07-09', departure: '2025-07-12', destination: 'Berlin' }
  ],
  hotels: [
    { id: 1, businesstrip_id: 1, name: 'Hotel Adlon', location: 'Berlin, Germany', pricing: 250.00 },
    { id: 2, businesstrip_id: 2, name: 'Hilton Times Square', location: 'New York, USA', pricing: 320.00 }
  ],
  employees: [
    { id: 1, name: 'Anna Schmidt', title: 'Project Manager' },
    { id: 2, name: 'Ben Müller', title: 'Sales Director' },
    { id: 3, name: 'Clara Weber', title: 'Developer' }
  ]
};

export default function Booking() {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [selections, setSelections] = useState({
    businesstrip_id: null,
    flight_id: null,
    hotel_id: null,
    employee_id: user.id
  });
  const [availableFlights, setAvailableFlights] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);

  useEffect(() => {
    setSelections(prev => ({ ...prev, employee_id: user.id })); // Sync employee_id
  }, [user]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const filteredFlights = selections.businesstrip_id
      ? data.flights.filter(f => f.businesstrip_id === selections.businesstrip_id)
      : [];
    const filteredHotels = selections.businesstrip_id
      ? data.hotels.filter(h => h.businesstrip_id === selections.businesstrip_id)
      : [];
    setSelections(prev => ({ ...prev, flight_id: null, hotel_id: null }));
    setAvailableFlights(filteredFlights);
    setAvailableHotels(filteredHotels);
  }, [selections.businesstrip_id]);

  const handleSelect = (type, id) => {
    setSelections(prev => ({ ...prev, [type]: id }));
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleBack = () => {
    setIsConfirmed(false);
    setPage(1);
    setSelections({
      businesstrip_id: null,
      flight_id: null,
      hotel_id: null,
      employee_id: user.id
    });
  };

  const pageContent = {
    1: (
      <>
        <h2 className={styles.pageTitle}>Wählen sie Ihren gewünschten Trip</h2>
        <div className={styles.contentGrid}>
          {data.businesstrips.map(trip => (
            <Tile
              page={page}
              key={trip.id}
              item={trip}
              isSelected={selections.businesstrip_id === trip.id}
              onSelect={() => handleSelect('businesstrip_id', trip.id)}
            />
          ))}
        </div>
      </>
    ),
    2: (
      <div>
        <h2 className={styles.pageTitle}>Wählen sie Ihren gewünschten Flug</h2>
        <div className={styles.contentGrid}>
          {availableFlights.length > 0 ? (
            availableFlights.map(flight => (
              <Tile
                page={page}
                key={flight.id}
                item={flight}
                isSelected={selections.flight_id === flight.id}
                onSelect={() => handleSelect('flight_id', flight.id)}
              />
            ))
          ) : (
            <p className={styles.noItems}>Keine Flüge Verfügbar</p>
          )}
        </div>
      </div>
    ),
    3: (
      <div>
        <h2 className={styles.pageTitle}>Wählen sie Ihr gewünschtes Hotel</h2>
        <div className={styles.contentGrid}>
          {availableHotels.length > 0 ? (
            availableHotels.map(hotel => (
              <Tile
                page={page}
                key={hotel.id}
                item={hotel}
                isSelected={selections.hotel_id === hotel.id}
                onSelect={() => handleSelect('hotel_id', hotel.id)}
              />
            ))
          ) : (
            <p className={styles.noItems}>Keine Hotels verfügbar.</p>
          )}
        </div>
      </div>
    ),
    4: (
      <div>
        <h2 className={styles.pageTitle}>Prüfen sie Ihre Auswahl</h2>
        <div className={styles.summary}>
          <p><strong>Employee:</strong> {data.employees.find(e => e.id === selections.employee_id)?.name || 'None'}</p>
          <p><strong>Trip:</strong> {data.businesstrips.find(t => t.id === selections.businesstrip_id)?.title || 'None'}</p>
          <p><strong>Flight:</strong> {data.flights.find(f => f.id === selections.flight_id)?.flight_number || 'None'}</p>
          <p><strong>Hotel:</strong> {data.hotels.find(h => h.id === selections.hotel_id)?.name || 'None'}</p>
        </div>
      </div>
    )
  };

  const confirmationContent = (
    <div>
      <h2 className={styles.pageTitle}>Buchung Bestätigt</h2>
      <div className={styles.confirmation}>
        <p>Buchung erfolgreich für <strong>{data.employees.find(e => e.id === selections.employee_id)?.name || 'None'}</strong></p>
        <p><strong>Trip:</strong> {data.businesstrips.find(t => t.id === selections.businesstrip_id)?.title || 'None'} ({data.businesstrips.find(t => t.id === selections.businesstrip_id)?.location || ''})</p>
        <p><strong>Flight:</strong> {data.flights.find(f => f.id === selections.flight_id)?.flight_number || 'None'} ({data.flights.find(f => f.id === selections.flight_id)?.arrival} to {data.flights.find(f => f.id === selections.flight_id)?.departure})</p>
        <p><strong>Hotel:</strong> {data.hotels.find(h => h.id === selections.hotel_id)?.name || 'None'} ({data.hotels.find(h => h.id === selections.hotel_id)?.pricing ? '$' + data.hotels.find(h => h.id === selections.hotel_id)?.pricing.toFixed(2) : ''})</p>
        <button className={styles.backButton} onClick={handleBack}>Zurück zur Buchung</button>
      </div>
    </div>
  );

return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isConfirmed ? confirmationContent : pageContent[page]}
      </div>
      {!isConfirmed && (
        <Pagination
          page={page}
          setPage={setPage}
          onConfirm={handleConfirm}
          selections={selections}
        />
      )}
    </div>
  );
}
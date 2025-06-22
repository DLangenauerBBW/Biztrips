'use client'

import { useState, useEffect, useContext } from 'react'
import styles from './booking.module.css'
import Pagination from '../Components/Pagination'
import Tile from '../Components/Tile'
import { UserContext } from '../lib/UserContext'
import { redirect } from 'next/navigation'
import { postBookings } from '../lib/Fetch'

export default function Booking({ biztrips, flights, hotels }) {
  const { user } = useContext(UserContext)
  const [page, setPage] = useState(1)
  const [selections, setSelections] = useState({
    businesstrip_id: null,
    flight_id: null,
    hotel_id: null,
    employee_id: user?.id 
  })
  const [availableFlights, setAvailableFlights] = useState([])
  const [availableHotels, setAvailableHotels] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)

useEffect(() => {
  //Verwift den Buchungsprozess, wenn während des Buchens der User gewechselt wird
  if (user?.id) {
    setSelections({
      businesstrip_id: null,
      flight_id: null,
      hotel_id: null,
      employee_id: user.id
    })
    setPage(1)
    setIsConfirmed(false)
  }
}, [user])

  useEffect(() => {
    //Filtert Auswählbare Flüge und Hotels nach gewähltem Businesstrip
    const filteredFlights = selections.businesstrip_id
      ? flights.filter(f => f.businesstrip.id === selections.businesstrip_id)
      : []
const filteredHotels = selections.businesstrip_id
    ? hotels.filter(h => {
        const trip = biztrips.find(t => t.id === selections.businesstrip_id)
        return trip && h.location.includes(trip.location)
      })
    : []
    setSelections(prev => ({ ...prev, flight_id: null, hotel_id: null }))
    setAvailableFlights(filteredFlights)
    setAvailableHotels(filteredHotels)
  }, [selections.businesstrip_id, flights, hotels])


  const handleSelect = (type, id) => {
    //Fügt das angewählte element dem Selektionsstate hinzu
    setSelections(prev => ({ ...prev, [type]: id }))
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
    postBookings(selections)
  }

  const pageContent = {
    1: (
      <>
        <h2 className={styles.pageTitle}>Wählen Sie Ihren gewünschten Trip</h2>
        <div className={styles.contentGrid}>
          {biztrips.length > 0 ? (
            biztrips.map(trip => (
              <Tile
                page={page}
                key={trip.id}
                item={trip}
                isSelected={selections.businesstrip_id === trip.id}
                onSelect={() => handleSelect('businesstrip_id', trip.id)}
              />
            ))
          ) : (
            <p>Keine Geschäftsreisen verfügbar</p>
          )}
        </div>
      </>
    ),
    2: (
      <>
        <h2 className={styles.pageTitle}>Wählen Sie Ihren gewünschten Flug</h2>
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
            <p>Keine Flüge verfügbar</p>
          )}
        </div>
      </>
    ),
    3: (
      <>
        <h2 className={styles.pageTitle}>Wählen Sie Ihr gewünschtes Hotel</h2>
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
            <p>Keine Hotels verfügbar</p>
          )}
        </div>
      </>
    ),
    4: (
      <div>
        <h2 className={styles.pageTitle}>Prüfen Sie Ihre Auswahl</h2>
        <div>
          <p><strong>Mitarbeiter:</strong> {user?.name || 'None'}</p>
          <p><strong>Trip:</strong> {biztrips.find(t => t.id === selections.businesstrip_id)?.title || 'None'}</p>
          <p><strong>Flug:</strong> {flights.find(f => f.id === selections.flight_id)?.flightNumber || 'None'}</p>
          <p><strong>Hotel:</strong> {hotels.find(h => h.id === selections.hotel_id)?.name || 'None'}</p>
        </div>
      </div>
    )
  }

  const confirmationContent = (
    <div>
      <h2 className={styles.pageTitle}>Buchung Bestätigt</h2>
      <div>
        <p>Buchung erfolgreich übermittelt für <strong>{user?.name || 'None'}</strong></p>
        <p>Ihrem Vorgesetzen wurde eine Genehmigungsanfrage gesendet, sobald diese akzeptiert wird erhalten sie eine Bestätigung per E-Mail</p>
        <p><strong>Trip:</strong> {biztrips.find(t => t.id === selections.businesstrip_id)?.title || 'None'} ({biztrips.find(t => t.id === selections.businesstrip_id)?.location || ''})</p>
        <p><strong>Flug:</strong> {flights.find(f => f.id === selections.flight_id)?.flightNumber || 'None'} ({flights.find(f => f.id === selections.flight_id)?.departure})</p>
        <p><strong>Hotel:</strong> {hotels.find(h => h.id === selections.hotel_id)?.name || 'None'} ({hotels.find(h => h.id === selections.hotel_id)?.pricing ? hotels.find(h => h.id === selections.hotel_id)?.pricing + 'Chf/Nacht' : ''})</p>
        <button onClick={()=> redirect("/profile")}>Zu meinen Buchungen</button>
      </div>
    </div>
  )

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
  )
}
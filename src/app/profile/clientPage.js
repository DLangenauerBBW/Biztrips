'use client'
import React, { useState, useEffect, useContext } from 'react'
import styles from './profile.module.css'
import Tile from '../Components/Tile'
import { UserContext } from '../lib/UserContext'

export default function ClientPage({ bookings }) {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredBookings, setFilteredBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user?.id && bookings) {
      const filteredBookings = bookings.filter(b => b.employee.id === user.id)
      setFilteredBookings(filteredBookings)
      setIsLoading(false)
    }
  }, [user, bookings])

  const handleTileClick = (booking) => {
    setSelectedBooking(booking)
  }

  return (
    <>
      <h2 className={styles.pageTitle}>Klicken Sie auf eine Buchung um Details zu sehen</h2>
      <div className={styles.contentGrid}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`Loader${index}`}
              className={styles.gridElementLoading}
            ></div>
          ))
        ) : (<>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <Tile
                  key={booking.id}
                  page={0}
                  item={booking}
                  isSelected={false}
                  onSelect={()=>{handleTileClick(booking)}}
                />
              ))
            ) : (
              <p>Keine Buchungen verfügbar.</p>
            )}
            </>
        )}
        
      </div>
      {selectedBooking && (
        <div className={styles.bookingOverlay} onClick={()=>{setSelectedBooking(null)}}>
          <div className={styles.booking} onClick={(e)=>{e.stopPropagation()}}>
            <h2>Buchungsdetails</h2>
            <div className={styles.bookingContent}>
              <p><strong>Mitarbeiter:</strong> {selectedBooking.employee.name}</p>
              <h3>Geschäftsreise</h3>
              <p><strong>Titel:</strong> {selectedBooking.businesstrip.title}</p>
              <p><strong>Beschreibung:</strong> {selectedBooking.businesstrip.description}</p>
              <p><strong>Ort:</strong> {selectedBooking.businesstrip.location}</p>
              {selectedBooking.businesstrip.meetings.length > 0 && (
                <>
                  <h4>Meetings</h4>
                  {selectedBooking.businesstrip.meetings.map(meeting => (
                    <div key={meeting.id}>
                      <p><strong>{meeting.title}</strong></p>
                      <p>{meeting.description}</p>
                      <p>Datum: {meeting.date} um {meeting.time}</p>
                      <p>Ort: {meeting.location}</p>
                    </div>
                  ))}
                </>
              )}
              <h3>Flug</h3>
              <p><strong>Flugnummer:</strong> {selectedBooking.flight.flightNumber}</p>
              <p><strong>Ziel:</strong> {selectedBooking.flight.destination}</p>
              <p><strong>Ankunft:</strong> {selectedBooking.flight.arrival}</p>
              <p><strong>Abflug:</strong> {selectedBooking.flight.departure}</p>
              <h3>Hotel</h3>
              <p><strong>Name:</strong> {selectedBooking.hotel.name}</p>
              <p><strong>Ort:</strong> {selectedBooking.hotel.location}</p>
              <p><strong>Preis:</strong> {selectedBooking.hotel.pricing.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
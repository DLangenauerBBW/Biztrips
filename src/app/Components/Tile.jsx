'use client';
import styles from './components.module.css';

export default function Tile({ page, item, isSelected, onSelect }) {
  switch (page) {
    case 1: // Bussiness Trips
      return (
        <div
          onClick={() => onSelect()}
          className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
        >
          <h3 className={styles.tileTitle}>{item.title}</h3>
          <img
            className={styles.tilePicture}
            src={`images/Trips/${item.id}.jpg`}
            alt={item.title}
          />
          <p className={styles.tileDescription}>{item.description}</p>
        </div>
      );

    case 2: // Flüge
      return (
        <div
          onClick={() => onSelect()}
          className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
        >
          <h3 className={styles.tileTitle}>{item.flightNumber || item.flight_number}</h3>
          <img
            className={styles.tilePicture}
            src={`images/Flights/1.jpg`}
            alt={item.id}
          />
          <p className={styles.tileDescription}>{`Abflug: ${item.departure}`}</p>
          <p className={styles.tileDescription}>{`Ankunft: ${item.arrival}`}</p>
        </div>
      );

    case 3: // Hotels
      return (
        <div
          onClick={() => onSelect()}
          className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
        >
          <h3 className={styles.tileTitle}>{item.name}</h3>
          <img
            className={styles.tilePicture}
            src={`images/Hotels/${item.id}.jpg`}
            alt={item.id}
          />
          <p className={styles.tileDescription}>Preis pro Nacht: {item.pricing} Chf </p>
          <p className={styles.tileDescription}>{item.location}</p>
        </div>
      );

    default:
      const { businesstrip, flight, hotel } = item;
      return (
        <div
          onClick={() => onSelect()}
          className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
        >
          <h3 className={styles.tileTitle}>{businesstrip.title}</h3>
          <img
            className={styles.tilePicture}
            src={`images/Trips/${businesstrip.id}.jpg`}
            alt={businesstrip.title}
          />
          <p className={styles.tileDescription}>{businesstrip.description}</p>
          {hotel.pricing && <p className={styles.tilePrice}>Preis: {hotel.pricing.toFixed(2)}Chf</p>}
        </div>
      );
  }
}
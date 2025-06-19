'use client';

import styles from "./components.module.css";

export default function Tile({ page, item, isSelected, onSelect }) {

const getFolder = (page) => {
  switch (page) {
  case 1:
    return "Trips/"
  case 2:
    return "Flights/"
  case 3:
    return "Hotels/"
  default:
    break;
}
}
  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
    >
      <h3 className={styles.tileTitle}>{item.title || item.name || item.flight_number}</h3>
      <img className={styles.tilePicture} src={"images/" + getFolder(page) + item.id + ".jpg"} alt={item.id} />
      <p className={styles.tileDescription}>{item.description || item.location || `${item.arrival} to ${item.departure}`}</p>
      {item.pricing && <p className={styles.tilePrice}>Price: ${item.pricing.toFixed(2)}</p>}
    </div>
  );
}
'use client'

import styles from './components.module.css'

export default function Pagination({ page, setPage, onConfirm, selections }) {
  const totalPages = 4

  const handlePrevious = () => {
      setPage(page - 1)
  }

  const handleNext = () => {
      setPage(page + 1)
  }

  const isNextDisabled = (
    (page === 1 && !selections.businesstrip_id) ||
    (page === 2 && !selections.flight_id) ||
    (page === 3 && !selections.hotel_id)
  )

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={styles.paginationBtn}
      >
        Zurück
      </button>
      <span className={styles.paginationText}>
        Schritt {page} von {totalPages}
      </span>
      {page === totalPages ? (
        <button
          onClick={onConfirm}
          className={`${styles.paginationBtn} ${styles.confirmBtn}`}
        >
          Buchung Bestätigen
        </button>
      ) : (
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`${styles.paginationBtn} ${styles.paginationBtnPrimary}`}
        >
          Weiter
        </button>
      )}
    </div>
  )
}
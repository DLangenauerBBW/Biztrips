'use client';

import styles from './components.module.css';

export default function Pagination({ page, setPage, onConfirm, selections }) {
  const totalPages = 4;

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const isNextDisabled = (
    (page === 1 && !selections.businesstrip_id) ||
    (page === 2 && !selections.flight_id) ||
    (page === 3 && !selections.hotel_id)
  );

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={styles.paginationBtn}
      >
        Previous
      </button>
      <span className={styles.paginationText}>
        Step {page} of {totalPages}
      </span>
      {page === totalPages ? (
        <button
          onClick={onConfirm}
          className={`${styles.paginationBtn} ${styles.confirmBtn}`}
        >
          Confirm Booking
        </button>
      ) : (
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`${styles.paginationBtn} ${styles.paginationBtnPrimary}`}
        >
          Next
        </button>
      )}
    </div>
  );
}
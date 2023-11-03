import React from 'react'

const Pagination = ({currentPage, totalPages, onPageChange}) => {

  return (
    <div>
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled-button' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
    </div>
  );
};

export default Pagination;

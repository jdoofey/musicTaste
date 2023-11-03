import React from 'react'

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'disabled-button' : ''}`}
          >Previous</button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <button className="page-link">Next</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate'; // Or use a different pagination library
import '../css/pagination.css'

function Pagination({ pageCount, onPageChange }) {
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    onPageChange(selectedPage); // Callback to update the current page in your main component
  };

  return (
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
  );
}

export default Pagination;

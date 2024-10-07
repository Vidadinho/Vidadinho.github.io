import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Limit page numbers shown
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // go to next page
  const paginateNext = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;

      // show next set of page numbers
      if (nextPage > maxPageNumberLimit) {
        setMaxPageNumberLimit((prev) => prev + pageNumberLimit);
        setMinPageNumberLimit((prev) => prev + pageNumberLimit);
      }

      return nextPage;
    });
  };

  // go to prev page
  const paginatePrev = () => {
    setCurrentPage((prevPage) => {
      const prevPageNumber = prevPage - 1;

      // show prev set of page numbers
      if (prevPageNumber % pageNumberLimit === 0) {
        setMaxPageNumberLimit((prev) => prev - pageNumberLimit);
        setMinPageNumberLimit((prev) => prev - pageNumberLimit);
      }

      return prevPageNumber;
    });
  };

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? styles.hidden : ""}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? styles.active : ""}
            >
              {number}
            </li>
          );
        }
        return null; // Add return statement for consistency
      })}

      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : ""
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`Page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${totalPages}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;

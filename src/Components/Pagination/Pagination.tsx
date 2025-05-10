import React from "react";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxDisplayed = 5;

    if (totalPages <= maxDisplayed) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);
      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
         {'<<'}
      </button>

      {getPageNumbers().map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={`${styles.pageButton} ${
              item === currentPage ? styles.active : ""
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {item}
          </span>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
          {'>>'}
      </button>
    </div>
  );
};

export default Pagination;

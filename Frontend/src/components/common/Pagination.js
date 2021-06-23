import React from "react";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

const MyPagination = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <Pagination size="sm">
      {pages.map((page) => (
        <Pagination.Item
          onClick={() => onPageChange(page)}
          key={page}
          className={page === currentPage ? "active" : "bg-dark text-white"}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default MyPagination;

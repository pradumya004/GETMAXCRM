import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex items-center">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-600 hover:text-white"
              } font-bold py-2 px-4 rounded`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

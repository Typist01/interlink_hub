import { Dispatch, FC, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, hasNextPage }) => {
  const nextPage = () => {
    console.log("next page called");
    setPage((v) => v + 1);
  };
  const previousPage = () => {
    console.log("previous page called");
    setPage((v) => v - 1);
  };
  return (
    <>
      <div className="flex space-x-2">
        {page !== 1 && (
          <button
            onClick={previousPage}
            disabled={page === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Previous
          </button>
        )}
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className="disabled:bg-gray-300 flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Pagination;

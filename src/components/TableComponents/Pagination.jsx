import React, { useState, useEffect } from "react";
import { getPagination } from "@api/urls";

export default function index({ paginationData, dataFunction }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tempPage, setTempPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Current Page:", currentPage);
  }, [currentPage]);

  const handlePrevious = async (event) => {
    event.preventDefault();
    if (paginationData.previous && !loading) {
      setLoading(true);
      try {
        const response = await getPagination(paginationData.previous);
        dataFunction(response);
        setTempPage((prev) => prev - 1);
        setCurrentPage(tempPage - 1);
      } catch (error) {
        console.error("Failed to fetch previous page:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNext = async (event) => {
    event.preventDefault();
    if (paginationData.next && !loading) {
      setLoading(true);
      try {
        const response = await getPagination(paginationData.next);
        dataFunction(response);
        setTempPage((prev) => prev + 1);
        setCurrentPage(tempPage + 1);
      } catch (error) {
        console.error("Failed to fetch next page:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="dataTables_paginate paging_simple_numbers"
      id="DataTables_Table_0_paginate"
    >
      <ul className="pagination">
        <li
          className="paginate_button page-item previous disabled"
          id="DataTables_Table_0_previous"
        >
          <a
            href="javascript:void(0);"
            onClick={handlePrevious}
            style={{
              pointerEvents:
                paginationData.previous && !loading ? "auto" : "none",
              opacity: paginationData.previous && !loading ? 1 : 0.5,
              padding: 0,
            }}
            aria-disabled="true"
            role="link"
            data-dt-idx="previous"
            tabIndex={-1}
            className="page-link"
          >
            <i className="ti ti-chevron-left ti-sm" />
          </a>
        </li>
        {paginationData.previous && (
          <li className="paginate_button page-item " onClick={handlePrevious}>
            <a
              href="javascript:void(0);"
              role="link"
              aria-current="page"
              data-dt-idx={0}
              tabIndex={0}
              className="page-link"
            >
              {loading ? "..." : currentPage - 1}
            </a>
          </li>
        )}

        <li className="paginate_button page-item active">
          <a
            href="javascript:void(0);"
            role="link"
            data-dt-idx={1}
            tabIndex={0}
            className="page-link"
          >
            {loading ? "..." : currentPage}
          </a>
        </li>
        {paginationData.next && (
          <li className="paginate_button page-item " onClick={handleNext}>
            <a
              href="javascript:void(0);"
              role="link"
              data-dt-idx={2}
              tabIndex={0}
              className="page-link"
            >
              {loading ? "..." : currentPage + 1}
            </a>
          </li>
        )}

        <li
          className="paginate_button page-item next"
          id="DataTables_Table_0_next"
        >
          <a
            href="javascript:void(0);"
            onClick={handleNext}
            style={{
              pointerEvents: paginationData.next && !loading ? "auto" : "none",
              opacity: paginationData.next && !loading ? 1 : 0.5,
              padding: 0,
            }}
            role="link"
            data-dt-idx="next"
            tabIndex={0}
            className="page-link"
          >
            <i className="ti ti-chevron-right ti-sm" />
          </a>
        </li>
      </ul>
    </div>
  );
}

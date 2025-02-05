import React, { useState, useEffect } from "react";
import flatpickr from "flatpickr";

const DateSelector = ({ handleFilterChange }) => {
  const [dateRange, setDateRange] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    flatpickr("#flatpickr-date", {
      mode: "range",
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        const [startDate, endDate] = selectedDates;

        // Validation: Prevent same start and end date
        if (
          startDate &&
          endDate &&
          startDate.toDateString() === endDate.toDateString()
        ) {
          setError(
            "Start date and end date cannot be the same. Please select a valid range."
          );
          setDateRange("");
          handleFilterChange("created_at__gte", "");
          handleFilterChange("created_at__lte", "");
          return;
        }
        setError("");

        const formatDate = (date) => {
          if (!date) return "";
          const utcDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          );
          const day = String(utcDate.getUTCDate()).padStart(2, "0");
          const month = utcDate.toLocaleString("en-GB", { month: "short" });
          const year = utcDate.getUTCFullYear();
          return `${day}-${month}-${year}`;
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        setDateRange(
          `${formattedStartDate}${
            formattedStartDate && formattedEndDate ? " to " : ""
          }${formattedEndDate}`
        );

        // Convert formatted date to a standard format for the backend
        const dateFormatter = (dateString) => {
          if (!dateString) return "";
          const [day, month, year] = dateString.split("-");
          const monthIndex = new Date(`${month} 1`).getMonth() + 1; // convert month name to number
          return `${year}-${String(monthIndex).padStart(2, "0")}-${day}`;
        };

        handleFilterChange(
          "created_at__gte",
          dateFormatter(formattedStartDate)
        );
        handleFilterChange("created_at__lte", dateFormatter(formattedEndDate));
      },
    });
  }, []);

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Select date range"
        id="flatpickr-date"
        value={dateRange}
        readOnly
      />
      {error && <div className="text-danger">{error}</div>}
    </>
  );
};

export default function Index({ filterMetaData, setSelectedFilters }) {
  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const DateSelector = () => {
  //   useEffect(() => {
  //     flatpickr("#flatpickr-date", {
  //       dateFormat: "Y-m-d",
  //       onChange: ([selectedDate]) => handleFilterChange("date", selectedDate),
  //     });
  //   }, []);

  //   return (
  //     <input
  //       type="text"
  //       className="form-control"
  //       placeholder="YYYY-MM-DD"
  //       id="flatpickr-date"
  //     />
  //   );
  // };

  return (
    <div className="d-flex align-items-center row pt-4 gap-4 gap-md-0">
      <div className="col-md-3 mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search keyword"
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      {Object.entries(filterMetaData.filter_data).map(
        ([key, filterValue], index) =>
          filterMetaData.filters[key] && (
            <div className="col-md-3 mb-3" key={index}>
              {Array.isArray(filterValue) ? (
                <select
                  className="form-select text-capitalize"
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                >
                  <option value="">{`Select ${filterMetaData.filters[key]}`}</option>
                  {filterValue.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.identity}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          )
      )}
      {filterMetaData.filters?.created_at && (
        <div className="col-12 col-sm-6 col-md-5 col-xl-3 mb-3">
          <DateSelector handleFilterChange={handleFilterChange} />
        </div>
      )}

      {/* <div className="col-3 mb-3">
        <button
          className="btn btn-primary d-flex align-items-center"
          type="button"
          onClick={() => console.log("Filtering...")}
        >
          <i className="ph-bold  ph-funnel me-1"></i>
          Filter
        </button>
      </div> */}
    </div>
  );
}

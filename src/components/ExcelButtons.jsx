import React from "react";

const index = ({ fileUrl }) => {
  return (
    <button
      onClick={() => window.open(fileUrl, "_blank")}
      className="btn btn-info waves-effect waves-light"
    >
      <span>
        <i className="ti ti-download me-0 me-sm-1 ti-xs" />
        <span className="d-none d-sm-inline-block">Download Report</span>
      </span>
    </button>
  );
};

export default index;

import React, { useEffect, useState } from "react";
import { getDashboardData } from "@api/urls";
import { Link } from "react-router-dom";
import { Loader } from "@components";
import { useAppContext } from "@context/AppContext";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const { setBreadcrumbs } = useAppContext();
  useEffect(() => {
    setBreadcrumbs({
      activeID: 1,
    });
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardData();

      setDashboardData(response);
    };
    fetchData();
  }, []);

  function formatAmount(amount) {
    return `₹${(amount || 0).toLocaleString("en-IN")}`;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {!dashboardData ? (
        <Loader />
      ) : (
        <>
          <div className="row g-6 mb-6">
            {/* Total Users */}
            <div className="col-sm-6 col-xl-3">
              <div className="card card-border-shadow-primary">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span className="text-heading">Total Employee</span>
                      <div className="d-flex align-items-center my-1">
                        <h4 className="mb-0 me-2">
                          {dashboardData.employee_count || 0}
                        </h4>
                      </div>
                      <small className="mb-0">Total number of employees</small>
                    </div>
                    <div className="avatar">
                      <Link to="/user">
                        <span className="avatar-initial rounded bg-label-primary">
                          <i className="ti ti-users ti-26px" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="card card-border-shadow-success">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span className="text-heading">Today Present</span>
                      <div className="d-flex align-items-center my-1">
                        <h4 className="mb-0 me-2">
                          {dashboardData.present_count || 0}
                        </h4>
                      </div>
                      <small className="mb-0">
                        Number of employees present today
                      </small>
                    </div>
                    <div className="avatar">
                      <Link to="/bundle">
                        <span className="avatar-initial rounded bg-label-success">
                          <i className="ti ti-package ti-26px" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card card-border-shadow-danger">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span className="text-heading">Today Absent</span>
                      <div className="d-flex align-items-center my-1">
                        <h4 className="mb-0 me-2">
                          {dashboardData.absent_count || 0}
                        </h4>
                      </div>
                      <small className="mb-0">
                        Number of employees absent today
                      </small>
                    </div>
                    <div className="avatar">
                      <Link to="/course">
                        <span className="avatar-initial rounded bg-label-danger">
                          <i className="ti ti-book ti-26px" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

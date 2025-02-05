import React, { useEffect, useState } from "react";
import { DynamicTable } from "@components";
import {
  getEmployeeAttendanceData,
  getEmployeeAttendanceMeta,
} from "@api/urls";
import { useParams } from "react-router-dom";
import { useAppContext } from "@context/AppContext";

export default function CategoryList() {
  const { uuid } = useParams();
  const [employeeData, setEmployeeData] = useState();
  const { setBreadcrumbs } = useAppContext();
  useEffect(() => {
    setBreadcrumbs({
      activeID: 2,
    });
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployeeCud(uuid);
      setEmployeeData(response);
    };

    fetchData();
  }, [uuid]);

  return (
    <DynamicTable
      tableMetaApi={(extra) => getEmployeeAttendanceMeta(uuid, extra)}
      tableDataApi={(extra) => getEmployeeAttendanceData(uuid, extra)}
      tableName={"Employee Attendance"}
      employeeData={employeeData}
    />
  );
}

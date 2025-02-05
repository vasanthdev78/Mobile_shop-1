import React, { useEffect } from "react";
import { DynamicTable } from "@components";
import { attendanceTableData, attendanceTableMeta } from "@api/urls";
import { useAppContext } from "@context/AppContext";

export default function CategoryList() {
  const { setBreadcrumbs } = useAppContext();
  useEffect(() => {
    setBreadcrumbs({
      activeID: 3,
    });
  }, [setBreadcrumbs]);

  return (
    <DynamicTable
      tableMetaApi={attendanceTableMeta}
      tableDataApi={attendanceTableData}
      reportLink="/cms/attendance/report/"
      tableName="Attendance"
    />
  );
}

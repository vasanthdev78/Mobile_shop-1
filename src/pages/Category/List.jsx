import React, { useEffect } from "react";
import { DynamicTable } from "@components";
import { employeeTableData, employeeTableMeta } from "@api/urls";
import { useAppContext } from "@context/AppContext";

export default function CategoryList() {
  const { setBreadcrumbs } = useAppContext();
  useEffect(() => {
    setBreadcrumbs({
      activeID: 2,
    });
  }, [setBreadcrumbs]);
  return (
    <>
      <DynamicTable
        tableMetaApi={employeeTableMeta}
        tableDataApi={employeeTableData}
        actionLink={{
          addLink: "/employee/form",
          viewLink: "/employee/view",
          editLink: "/employee/form",
        }}
        tableName="Employee"
      />
    </>
  );
}

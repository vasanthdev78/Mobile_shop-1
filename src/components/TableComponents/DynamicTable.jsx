import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, Pagination, Filters, ExcelButtons } from "@components";
import { useDynamicFormContext } from "@context/DynamicFormContext";

export default function index({
  tableMetaApi,
  tableDataApi,
  actionLink,
  staticTableData,
  isStaticTable = false,
  reportLink = "",
  tableName,
  employeeData,
}) {
  const navigate = useNavigate();
  const { trigger } = useDynamicFormContext();
  const [tableMeta, setTableMeta] = useState({
    count: 36,
    columns: {
      "image_details.file": "Images",
      full_name: "Name",
      email: "Email",
      phone_number: "Phone",
      "role_details.identity": "Role",
      is_working_profession: "Working Profession",
      status: "Status",
    },
    filters: {
      role: "Role",
      education: "Education",
      is_working_profession: "Working Profession",
    },
    filter_data: {
      education: [
        {
          id: "Secondary School",
          identity: "Secondary School",
        },
        {
          id: "Higher Secondary",
          identity: "Higher Secondary",
        },
        {
          id: "Diplomo",
          identity: "Diplomo",
        },
        {
          id: "Bachelors",
          identity: "Bachelors",
        },
        {
          id: "Masters",
          identity: "Masters",
        },
      ],
      is_working_profession: [
        {
          id: true,
          identity: "Yes",
        },
        {
          id: false,
          identity: "No",
        },
      ],
      role: [
        {
          id: "1",
          identity: "Admin",
        },
      ],
    },
  });
  const [tableData, setTableData] = useState({
    count: 36,
    next: "https://backendlive.nexemy.com/cms/user/list/?page=2",
    previous: null,
    results: [
      {
        id: 36,
        uuid: "17d19e62-a7cc-4f75-8f5c-81cc524c500e",
        full_name: "uma",
        email: "umasigmaconstellation@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 35,
        uuid: "dc22bf52-1ceb-409e-911a-2c958db74406",
        full_name: "Jesper",
        email: "jesper@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 34,
        uuid: "6c0e444e-0ad0-4174-8a12-fba5505b41c8",
        full_name: "Sridharan Ravichandran",
        email: "zero@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 33,
        uuid: "eec84a25-8cb1-42dc-9b8d-1382a55752dc",
        full_name: "Roriri",
        email: "roriri@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 32,
        uuid: "3ff8217c-624a-43e2-9db6-80bdb5a898f4",
        full_name: "shifana",
        email: "bismishifana30@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 31,
        uuid: "322b0801-e4b9-44af-81d2-118d75b29d60",
        full_name: "Ragu",
        email: "ragu@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 30,
        uuid: "19ebb738-92d4-4fb5-a316-5f38abd1a614",
        full_name: "Noblesam",
        email: "noblesam66@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 29,
        uuid: "6f213175-8339-4a54-8fe3-a6954743fd72",
        full_name: "sri",
        email: "dharan@gmail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
      {
        id: 28,
        uuid: "60b0aa46-2066-4330-9a1d-47fdde37952d",
        full_name: null,
        email: "ragu@mail.com",
        phone_number: null,
        role_details: null,
        image_details: null,
        is_working_profession: "No",
        education: null,
        current_profession: null,
        status: "Active",
      },
    ],
  });
  const [selectedFilters, setSelectedFilters] = useState({});
  const params = new URLSearchParams(selectedFilters).toString();
  const filelink = `${process.env.BACKEND_URL}${reportLink}`;

  const paginationData = {
    next: tableData?.next,
    previous: tableData?.previous,
  };

  useEffect(() => {
    const FetchData = async () => {
      console.log(tableMetaApi);

      const response = await tableMetaApi();
      setTableMeta(response);
      // console.log("Table Meta : ", response);
    };

    !isStaticTable && FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      // console.log(tableDataApi);

      const response = await tableDataApi(selectedFilters);
      setTableData(response);
      // console.log("Table Data : ", response);
    };
    !isStaticTable && FetchData();
  }, [selectedFilters, trigger]);

  if (!(tableData && tableMeta) && !isStaticTable) {
    return;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
        <div className="d-flex flex-column justify-content-center">
          {employeeData ? (
            <h4 className="mb-1">{tableName} List</h4>
          ) : (
            <>
              <h4 className="mb-1">{employeeData?.identity}</h4>
              <small className="user-status text-body">
                {employeeData?.phone_number}
              </small>
            </>
          )}
        </div>

        <div className="d-flex align-content-center flex-wrap gap-4">
          {reportLink && <ExcelButtons fileUrl={filelink} />}
          {actionLink?.addLink && (
            <button
              className="btn btn-secondary add-new btn-primary waves-effect waves-light"
              tabIndex={0}
              type="button"
              onClick={() => navigate(actionLink.addLink)}
            >
              <span>
                <i className="ti ti-plus me-0 me-sm-1 ti-xs" />
                <span className="d-none d-sm-inline-block">
                  Add New {tableName}
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">Filters</h5>
          {!isStaticTable && (
            <Filters
              filterMetaData={tableMeta}
              setSelectedFilters={setSelectedFilters}
            />
          )}
        </div>
        <div className="card-datatable">
          <div className="dataTables_wrapper dt-bootstrap5 no-footer">
            <DataTable
              tableMeta={
                isStaticTable ? staticTableData.columns : tableMeta.columns
              }
              tableData={isStaticTable ? staticTableData : tableData}
              actionLink={actionLink}
            />
            <div className="row">
              <div className="col-sm-12 col-md-12">
                {!isStaticTable && (
                  <Pagination
                    paginationData={paginationData}
                    dataFunction={setTableData}
                    // totalCount={80}
                  />
                )}
              </div>
            </div>
            <div style={{ width: "1%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

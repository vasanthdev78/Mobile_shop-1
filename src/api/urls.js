// urls.js
import EndPoints from "./endpoints";
import {
  makeGetRequest,
  makePostRequest,
  makeCustomRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeFromRequest,
  makePutRequest,
} from "./methods/makeRequest";

// Auth API
export const login = (data) => makePostRequest(EndPoints.loginURL, data);
export const logout = () => makePostRequest(EndPoints.logoutURL);
export const register = (data) => makePostRequest(EndPoints.registerURL, data);
export const getUserDetails = () => makePostRequest(EndPoints.userDetailsURL);

// Pagination API
export const getPagination = (url) => makeGetRequest(url);

//Dashboard API
export const getDashboardData = () =>
  makeGetRequest(EndPoints.dashboardDataURL);

// Employee API
export const employeeTableMeta = () => makeGetRequest(EndPoints.employeeListURL + "table-meta/");
export const employeeTableData = (data) => makeGetRequest(EndPoints.employeeListURL, data);
export const getEmployeeCud = (uuid) => makeGetRequest(EndPoints.employeeCudURL + uuid + "/meta/");
export const postEmployeeCud = (data) => makePostRequest(EndPoints.employeeCudURL, data);
export const patchEmployeeCud = (uuid, data) => makePatchRequest(EndPoints.employeeCudURL + uuid + "/", data);
export const getEmployeeAttendanceMeta = (uuid) => makeGetRequest(EndPoints.employeeAttendanceURL + uuid + "/table-meta/");
export const getEmployeeAttendanceData = (uuid, data) => makeGetRequest(EndPoints.employeeAttendanceURL + uuid + "/", data);

// Attendance API
export const attendanceTableMeta = () =>
  makeGetRequest(EndPoints.attendanceListURL + "table-meta/");
export const attendanceTableData = (params) =>
  makeGetRequest(EndPoints.attendanceListURL, params);

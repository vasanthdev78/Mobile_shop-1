import { format, parse } from "date-fns";

export function formatTime(time) {
  const parsedTime = parse(time, "HH:mm:ss", new Date());
  return format(parsedTime, "h:mm a"); // output: 2:28 PM
}

export function deformatTime(time) {
  const parsedTime = parse(time, "h:mm a", new Date());
  return format(parsedTime, "HH:mm:ss"); // output: 14:28:00
}

export function formatDate(date) {
  return format(new Date(date), "dd MMM yyyy"); // Output: 24 Nov 2024
}

export function deformatDate(date) {
  const parsedDate = parse(date, "dd MMM yyyy", new Date());
  return format(parsedDate, "yyyy-MM-dd"); // Output: 2011-03-15
}

export function deformatDateObj(date) {
  return format(date, "yyyy-MM-dd"); // Output: 2011-03-15
}

export function formatISO(timestamp) {
  return format(new Date(timestamp), "dd MMM yyyy, h:mm a"); // Output: 24 Nov 2024, 2:28 PM
}

export function deformatISO(timestamp) {
  const parsedDate = parse(timestamp, "dd MMM yyyy, h:mm a", new Date());
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"); // Output: 2024-11-24T14:28:00Z
}

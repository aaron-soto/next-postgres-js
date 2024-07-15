import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber) {
  // Remove all non-numeric characters
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // If input is not a valid phone number, return the original input
  return phoneNumber;
}

export function formatTupleDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(date);

  const day = d.getDate();
  const month = months[d.getMonth()];

  return [day, month];
}

"use client";

import { ServiceType } from "@/static/defaultForm";

export const generateInvoiceNumber = () => {
  if (typeof window == "undefined") return ""
  const invoices = JSON.parse(localStorage.getItem("invoice") || "[]");
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const count =
    +(invoices[invoices.length - 1]?.invoiceNumber?.split("-")?.[2] || 0) + 1;
  return `INV-${year}${month}-${String(count).padStart(4, "0")}`;
};

export const calculateTotal = (services: ServiceType[]) => {
  return services.reduce((total, service) => {
    return total + service.hours * service.rate;
  }, 0);
};

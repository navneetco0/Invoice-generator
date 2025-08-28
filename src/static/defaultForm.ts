import { generateInvoiceNumber } from "@/utils/generateInvoiceNumber";

export type ServiceType = {
  description: string;
  hours: number;
  rate: number;
  amount: number;
};
export type PaymentMethodType = {
  upi: string;
  bankAccount: string;
  ifsc: string;
};
export type InvoiceDataType = {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  fromAddress: string;
  toName: string;
  toCompany: string;
  toEmail: string;
  toAddress: string;
  services: ServiceType[];
  paymentMethod: PaymentMethodType;
  notes: string;
  gstNote: boolean;
  createdAt: string;
  total: number;
};

export const defaultForm: InvoiceDataType = {
  invoiceNumber: generateInvoiceNumber(),
  date: new Date().toISOString().split("T")[0],
  dueDate: "",
  fromName: "",
  fromEmail: "",
  fromPhone: "",
  fromAddress: "",
  toName: "",
  toCompany: "",
  toEmail: "",
  toAddress: "",
  services: [{ description: "", hours: 0, rate: 0, amount: 0 }],
  paymentMethod: {
    upi: "",
    bankAccount: "",
    ifsc: "",
  },
  notes: "",
  gstNote: true,
  createdAt: new Date().toISOString().split("T")[0],
  total: 0,
};

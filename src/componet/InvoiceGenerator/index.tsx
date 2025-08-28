"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, History, Calendar, DollarSign } from "lucide-react";
import { defaultForm, InvoiceDataType } from "@/static/defaultForm";
import CreateInvoiceView from "./CreateInvoiceView";
import {
  calculateTotal,
} from "@/utils/generateInvoiceNumber";
import HistoryView from "./HistoryView";
import PreviewView from "./PreviewView";
import Image from "next/image";

const InvoiceGenerator = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [invoices, setInvoices] = useState<InvoiceDataType[]>([]);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceDataType | null>(
    null
  );
  const [invoiceData, setInvoiceData] = useState<InvoiceDataType>(defaultForm);

  useEffect(() => {
    setInvoices(JSON.parse(localStorage.getItem("invoice") || "[]") || []);
  }, []);

  // Add service
  const addService = () => {
    setInvoiceData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { description: "", hours: 0, rate: 0, amount: 0 },
      ],
    }));
  };

  // Remove service
  const removeService = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  // Update service
  const updateService = (
    index: number,
    field: keyof InvoiceDataType | "hours" | "description" | "rate",
    value: string | number
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      services: prev.services.map((service, i) => {
        if (i === index) {
          const updatedService = { ...service, [field]: value };
          if (field === "hours" || field === "rate") {
            updatedService.amount = updatedService.hours * updatedService.rate;
          }
          return updatedService;
        }
        return service;
      }),
    }));
  };

  // Save invoice
  const saveInvoice = () => {
    const invoice = {
      ...invoiceData,
      createdAt: editingInvoice?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      total: calculateTotal(invoiceData.services),
    };

    let updatedInvoiceData = invoices;

    if (editingInvoice) {
      updatedInvoiceData = invoices.map((inv) =>
        inv.invoiceNumber === invoice.invoiceNumber ? invoice : inv
      );
    } else {
      updatedInvoiceData = [...updatedInvoiceData, invoice];
    }
    setInvoices(updatedInvoiceData);
    localStorage.setItem("invoice", JSON.stringify(updatedInvoiceData));
    setCurrentView("history");
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setEditingInvoice(null);
    setInvoiceData(defaultForm);
  };

  // Edit invoice
  const editInvoice = (invoice: InvoiceDataType) => {
    setEditingInvoice(invoice);
    setInvoiceData(invoice);
    setCurrentView("create");
  };

  // Delete invoice
  const deleteInvoice = (invoiceNumber: string) => {
    const updatedInvoiceData = invoices.filter((inv: InvoiceDataType) => inv.invoiceNumber !== invoiceNumber)
    setInvoices(updatedInvoiceData);
    localStorage.setItem("invoice", JSON.stringify(updatedInvoiceData));
  };

  // Dashboard View
  const DashboardView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          InvoiceGen
        </h1>
        <p className="text-gray-600">Create professional invoices in minutes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {invoices.length}
              </p>
              <p className="text-gray-600">Total Invoices</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <DollarSign className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                ₹
                {invoices
                  .reduce((sum, inv) => sum + inv.total, 0)
                  .toLocaleString()}
              </p>
              <p className="text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {
                  invoices.filter(
                    (inv) =>
                      new Date(inv.createdAt) >=
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </p>
              <p className="text-gray-600">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentView("create")}
          className="bg-blue-600 text-white p-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Create New Invoice</h3>
          <p className="text-blue-100">Generate a new professional invoice</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentView("history")}
          className="bg-gray-700 text-white p-8 rounded-lg shadow-md hover:bg-gray-800 transition-colors"
        >
          <History className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Invoice History</h3>
          <p className="text-gray-300">View and manage all your invoices</p>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image height={30} width={30} src={"/InvoiceGen.png"} alt="logo" className="" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                InvoiceGen
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("create")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "create"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Create
              </button>
              <button
                onClick={() => setCurrentView("history")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-950">
        <AnimatePresence mode="wait">
          {currentView === "dashboard" && <DashboardView key="dashboard" />}
          {currentView === "create" && (
            <CreateInvoiceView
              setCurrentView={setCurrentView}
              editingInvoice={!!editingInvoice}
              saveInvoice={saveInvoice}
              key="create"
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
              removeService={removeService}
              addService={addService}
              updateService={updateService}
            />
          )}
          {currentView === "preview" && (
            <PreviewView
              invoiceData={invoiceData}
              setCurrentView={setCurrentView}
              key="preview"
            />
          )}
          {currentView === "history" && (
            <HistoryView
              editInvoice={editInvoice}
              setInvoiceData={setInvoiceData}
              setCurrentView={setCurrentView}
              deleteInvoice={deleteInvoice}
              key="history"
              invoices={invoices}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          nav,
          button,
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceGenerator;

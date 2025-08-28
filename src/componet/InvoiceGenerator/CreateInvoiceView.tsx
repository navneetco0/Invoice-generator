import { InvoiceDataType } from "@/static/defaultForm";
import { calculateTotal } from "@/utils/generateInvoiceNumber";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building,
  Eye,
  Plus,
  Save,
  Trash2,
  User,
} from "lucide-react";
import { PaymentQRCode } from "../PaymentQRCode";

interface CreateInvoiceViewProp {
  setCurrentView: (view: string) => void;
  editingInvoice: boolean;
  saveInvoice: () => void;
  invoiceData: InvoiceDataType;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceDataType>>;
  addService: () => void;
  removeService: (index: number) => void;
  updateService: (
    index: number,
    field: keyof InvoiceDataType | "hours" | "description" | "rate",
    value: string | number
  ) => void;
}

const CreateInvoiceView: React.FC<CreateInvoiceViewProp> = ({
  setCurrentView,
  editingInvoice,
  saveInvoice,
  invoiceData,
  setInvoiceData,
  addService,
  removeService,
  updateService,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView("preview")}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
          <button
            onClick={saveInvoice}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Invoice Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceData.invoiceNumber}
                  disabled
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      invoiceNumber: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* From Details */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              From (Your Details)
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={invoiceData.fromName}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    fromName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={invoiceData.fromEmail}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    fromEmail: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={invoiceData.fromPhone}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    fromPhone: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Your Address"
                value={invoiceData.fromAddress}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    fromAddress: e.target.value,
                  }))
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* To Details */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Bill To (Client Details)
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={invoiceData.toName}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    toName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={invoiceData.toCompany}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    toCompany: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Client Email"
                value={invoiceData.toEmail}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    toEmail: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Client Address"
                value={invoiceData.toAddress}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    toAddress: e.target.value,
                  }))
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Services and Payment */}
        <div className="space-y-6">
          {/* Services */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <button
                onClick={addService}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Service
              </button>
            </div>
            <div className="space-y-4">
              {invoiceData.services.map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Service {index + 1}
                    </span>
                    {invoiceData.services.length > 1 && (
                      <button
                        onClick={() => removeService(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) =>
                        updateService(index, "description", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Hours"
                        value={service.hours}
                        onChange={(e) =>
                          updateService(
                            index,
                            "hours",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Rate (₹)"
                        value={service.rate}
                        onChange={(e) =>
                          updateService(
                            index,
                            "rate",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={service.hours * service.rate}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{calculateTotal(invoiceData.services).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={invoiceData.paymentMethod.upi}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      paymentMethod: {
                        ...prev.paymentMethod,
                        upi: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  value={invoiceData.paymentMethod.bankAccount}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      paymentMethod: {
                        ...prev.paymentMethod,
                        bankAccount: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={invoiceData.paymentMethod.ifsc}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      paymentMethod: {
                        ...prev.paymentMethod,
                        ifsc: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
            <textarea
              placeholder="Add any additional notes or terms..."
              value={invoiceData.notes}
              onChange={(e) =>
                setInvoiceData((prev: InvoiceDataType) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={invoiceData.gstNote}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      gstNote: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  Include GST exemption note
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateInvoiceView;

import { InvoiceDataType } from "@/static/defaultForm";
import { generateInvoiceNumber } from "@/utils/generateInvoiceNumber";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Edit,
  Eye,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

interface HistoryViewProps {
  setCurrentView: (view: string) => void;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceDataType>>;
  editInvoice: (invoice: InvoiceDataType) => void;
  deleteInvoice: (id: string) => void;
  invoices: InvoiceDataType[];
}

const HistoryView: React.FC<HistoryViewProps> = ({
  setCurrentView,
  setInvoiceData,
  editInvoice,
  deleteInvoice,
  invoices,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Invoice History</h1>
        </div>
        <button
          onClick={() => setCurrentView("create")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No invoices yet
          </h3>
          <p className="text-gray-600 mb-4">
            Create your first invoice to get started
          </p>
          <button
            onClick={() => setCurrentView("create")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Invoice
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <motion.div
              key={invoice.invoiceNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      #{invoice.invoiceNumber}
                    </h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Paid
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <strong>Client:</strong> {invoice.toName}{" "}
                      {invoice.toCompany && `(${invoice.toCompany})`}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₹{invoice.total.toLocaleString()}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setInvoiceData(invoice);
                      setCurrentView("preview");
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="View Invoice"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editInvoice(invoice)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                    title="Edit Invoice"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      const newInvoice = {
                        ...invoice,
                        id: new Date().toISOString().split("T")[0],
                        invoiceNumber: generateInvoiceNumber(),
                        date: new Date().toISOString().split("T")[0],
                        createdAt: new Date().toISOString(),
                      };
                      setInvoiceData(newInvoice);
                      setCurrentView("create");
                    }}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                    title="Duplicate Invoice"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteInvoice(invoice.invoiceNumber)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Invoice"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryView;

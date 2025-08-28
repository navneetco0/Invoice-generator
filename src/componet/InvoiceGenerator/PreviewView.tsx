import { TemplateKey, templates } from "@/static/templets";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useRef, useState } from "react";
import InvoicePreview from "./InvoicePreview";
import { InvoiceDataType } from "@/static/defaultForm";
interface PreviewViewProps {
  setCurrentView: (view: string) => void;
  invoiceData: InvoiceDataType;
}

const PreviewView: React.FC<PreviewViewProps> = ({
  setCurrentView,
  invoiceData,
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateKey>("modern");
  const printRef = useRef(null);
  const handlePrint = async () => {
    const oldTitle = document.title;
    document.title = invoiceData.invoiceNumber;
    await window.print();
    document.title = oldTitle;
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView("create")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Edit
        </button>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Template:</span>
            <select
              value={selectedTemplate}
              onChange={(e) =>
                setSelectedTemplate(e.target.value as TemplateKey)
              }
              className="p-2 border border-gray-300 rounded"
            >
              {Object.entries(templates).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Print/Download
          </button>
        </div>
      </div>

      <div
        ref={printRef}
        className="print-section bg-white p-8 shadow-lg max-w-4xl mx-auto"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        <InvoicePreview
          invoice={invoiceData}
          template={templates[selectedTemplate]}
        />
      </div>
    </motion.div>
  );
};

export default PreviewView;

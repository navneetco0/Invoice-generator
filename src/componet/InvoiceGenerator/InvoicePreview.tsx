import { InvoiceDataType } from "@/static/defaultForm";
import { calculateTotal } from "@/utils/generateInvoiceNumber";
import { PaymentQRCode } from "../PaymentQRCode";
import { Template } from "@/static/templets";

interface InvoicePreviewProps {
  invoice: InvoiceDataType;
  template: Template;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  template,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`${template.colors.primary} text-white p-6 rounded-lg`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
            <p className="text-lg opacity-90">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{invoice.fromName}</p>
            {invoice.fromEmail && (
              <p className="opacity-90">{invoice.fromEmail}</p>
            )}
            {invoice.fromPhone && (
              <p className="opacity-90">{invoice.fromPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">From:</h3>
          <div className="space-y-1 text-gray-700">
            <p className="font-medium">{invoice.fromName}</p>
            {invoice.fromEmail && <p>{invoice.fromEmail}</p>}
            {invoice.fromPhone && <p>{invoice.fromPhone}</p>}
            {invoice.fromAddress && (
              <p className="whitespace-pre-line">{invoice.fromAddress}</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">To:</h3>
          <div className="space-y-1 text-gray-700">
            <p className="font-medium">{invoice.toName}</p>
            {invoice.toCompany && <p>{invoice.toCompany}</p>}
            {invoice.toEmail && <p>{invoice.toEmail}</p>}
            {invoice.toAddress && (
              <p className="whitespace-pre-line">{invoice.toAddress}</p>
            )}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p>
            <span className="font-medium">Invoice Date:</span>{" "}
            {new Date(invoice.date).toLocaleDateString()}
          </p>
        </div>
        <div>
          {invoice.dueDate && (
            <p>
              <span className="font-medium">Due Date:</span>{" "}
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className={`${template.colors.secondary}`}>
            <tr>
              <th className="text-left p-4 font-semibold">
                Service Description
              </th>
              <th className="text-center p-4 font-semibold">Hours</th>
              <th className="text-center p-4 font-semibold">Rate (₹)</th>
              <th className="text-right p-4 font-semibold">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoice.services.map((service, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-4">{service.description}</td>
                <td className="text-center p-4">{service.hours}</td>
                <td className="text-center p-4">
                  {service.rate.toLocaleString()}
                </td>
                <td className="text-right p-4">
                  {(service.hours * service.rate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className={`${template.colors.secondary}`}>
            <tr>
              <td colSpan={3} className="text-right p-4 font-semibold">
                Total Amount Payable:
              </td>
              <td className="text-right p-4 font-bold text-lg">
                ₹{calculateTotal(invoice.services).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Details */}
      <div className={`${template.colors.secondary} p-6 rounded-lg`}>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <div>
              <p className="font-medium text-gray-700">UPI ID:</p>
              <p className={`${template.colors.accent} font-mono`}>
                {invoice.paymentMethod.upi}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Bank A/c:</p>
              <p className={`${template.colors.accent} font-mono`}>
                {invoice.paymentMethod.bankAccount}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">IFSC Code:</p>
              <p className={`${template.colors.accent} font-mono`}>
                {invoice.paymentMethod.ifsc}
              </p>
            </div>
          </div>
          <PaymentQRCode
            name={invoice.fromName}
            amount={invoice.total.toString()}
            paymentMethod={invoice.paymentMethod}
          />
        </div>
      </div>

      {/* Payment Terms */}
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <h3 className="font-semibold mb-2">Payment Terms</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 100% payment to be made within 7 days of invoice date.</li>
          <li>
            • Delay in payment beyond due date may attract late fees or service
            suspension.
          </li>
        </ul>
      </div>

      {/* GST Note */}
      {invoice.gstNote && (
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">
            Legal Note on GST Applicability
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              • As per <strong>Section 22 of the CGST Act, 2017</strong>, GST
              registration is mandatory only if annual turnover exceeds ₹20
              lakhs (₹10 lakhs in special category states).
            </p>
            <p>
              • We are{" "}
              <strong>
                independent freelancers with turnover below this threshold
              </strong>{" "}
              and are <strong>not registered under GST</strong>.
            </p>
            <p>
              • Therefore, <strong>GST is not applicable</strong> on this
              invoice, and the client must pay the{" "}
              <strong>full invoice amount without GST deduction</strong>.
            </p>
            <p>
              • If GST input credit is required at your end, you will need to
              bear GST additionally, as we cannot issue a GST-compliant invoice.
            </p>
          </div>
        </div>
      )}

      {/* Additional Notes */}
      {invoice.notes && (
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-2">Additional Notes</h3>
          <p className="text-gray-700 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;

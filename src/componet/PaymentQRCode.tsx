"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { PaymentMethodType } from "@/static/defaultForm";

interface PaymentQRCodeType {
  paymentMethod: PaymentMethodType;
  name: string;
  amount: string;
}

export const PaymentQRCode: React.FC<PaymentQRCodeType> = ({
  paymentMethod,
  name,
  amount,
}) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const upiLink = `upi://pay?pa=${paymentMethod.upi}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    QRCode.toDataURL(upiLink)
      .then((url: string) => setQr(url))
      .catch((err: unknown) => console.error(err));
  }, []);
  if (!paymentMethod.upi) return null;

  return (
    <div className="flex flex-col items-center">
      {qr && <img src={qr} alt="UPI QR Code" className="w-48 h-48" />}
      <h2 className="text-lg font-bold mb-2">Scan to Pay</h2>
    </div>
  );
};

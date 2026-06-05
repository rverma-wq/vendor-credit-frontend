"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CreditNotesPage() {
  const [creditNotes, setCreditNotes] = useState<any[]>([]);

  useEffect(() => {
    fetchCreditNotes();
  }, []);

  
  const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";


  const fetchCreditNotes = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/credit-notes`
      );
  
      setCreditNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const totalPurchase = creditNotes.reduce(
    (sum, note) => sum + note.purchase_amount,
    0
  );
  
  const totalPaid = creditNotes.reduce(
    (sum, note) => sum + note.paid_amount,
    0
  );
  
  const totalPending = creditNotes.reduce(
    (sum, note) => sum + note.pending_amount,
    0
  );

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Credit Notes
      </h1>
  
      <table className="w-full border-collapse border">
  <thead>
    <tr>
      <th className="border p-3 text-left">
        Vendor
      </th>
      <th className="border p-3 text-left">
        Purchase
      </th>
      <th className="border p-3 text-left">
        Paid
      </th>
      <th className="border p-3 text-left">
        Pending
      </th>
    </tr>
  </thead>

  <tbody>
    {creditNotes.map((note) => (
      <tr key={note.id}>
        <td className="border p-3">
          {note.vendor_name}
        </td>

        <td className="border p-3">
          ₹{note.purchase_amount}
        </td>

        <td className="border p-3">
          ₹{note.paid_amount}
        </td>

        <td className="border p-3">
          ₹{note.pending_amount}
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
  <tr className="font-bold ">
    <td className="border p-3">
      Total
    </td>

    <td className="border p-3">
      ₹{totalPurchase.toLocaleString()}
    </td>

    <td className="border p-3">
      ₹{totalPaid.toLocaleString()}
    </td>

    <td className="border p-3">
      ₹{totalPending.toLocaleString()}
    </td>
  </tr>
</tfoot>
</table>
    </main>
  );
}
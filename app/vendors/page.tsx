"use client";

import { useEffect, useState } from "react";
import axios from "axios";



export default function VendorsPage() {
    const [vendors, setVendors] = useState<any[]>([]);

    const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [selectedVendorId, setSelectedVendorId] =
        useState("");

    const [purchaseAmount, setPurchaseAmount] =
        useState("");

    const [paidAmount, setPaidAmount] =
        useState("");

    useEffect(() => {
        fetchVendors();
    }, []);

    const createCreditNote = async () => {
        try {
          await axios.post(
            `${API_URL}/credit-notes`,
            {
              vendor_id: selectedVendorId,
              purchase_amount: Number(purchaseAmount),
              paid_amount: Number(paidAmount),
            }
          );
      
          alert("Credit Note Created");
      
          setShowModal(false);
      
          setPurchaseAmount("");
          setPaidAmount("");
      
        } catch (error) {
          console.error(error);
        }
      };

    const fetchVendors = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/vendors`
            );

            setVendors(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const addVendor = async () => {
        try {
            await axios.post(
                `${API_URL}/vendors`,
                {
                    name,
                    phone,
                    address,
                }
            );

            setName("");
            setPhone("");
            setAddress("");

            fetchVendors();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteVendor = async (vendorId: number) => {
        try {
            await axios.delete(
                `${API_URL}/vendors/${vendorId}`
            );

            fetchVendors();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="p-10">
            <div className="border rounded p-6 mb-8">
                <h2 className="font-bold text-xl mb-4">
                    Add Vendor
                </h2>

                <div className="flex flex-col gap-3">

                    <input
                        className="border p-2 rounded"
                        placeholder="Vendor Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button
                        onClick={addVendor}
                        className="bg-black text-white p-2 rounded"
                    >
                        Add Vendor
                    </button>

                </div>
            </div>
            <h1 className="text-3xl font-bold mb-6">
                Vendors
            </h1>


            <div className="space-y-4">
                {vendors.map((vendor) => (
                    <div
                        key={vendor.id}
                        className="border rounded p-4"
                    >
                        <h2 className="font-bold">
                            {vendor.name}
                        </h2>

                        <p>{vendor.phone}</p>

                        <p>{vendor.address}</p>
                        <button
                            onClick={() => deleteVendor(vendor.id)}
                            className="mt-3 bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setSelectedVendorId(vendor.id);
                                setShowModal(true);
                            }}
                            className="m-3 mt-3 bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Add Credit Note
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-black p-6 rounded w-96">

                        <h2 className="text-xl font-bold mb-4">
                            Create Credit Note
                        </h2>

                        <input
                            type="number"
                            placeholder="Purchase Amount"
                            value={purchaseAmount}
                            onChange={(e) =>
                                setPurchaseAmount(e.target.value)
                            }
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="number"
                            placeholder="Paid Amount"
                            value={paidAmount}
                            onChange={(e) =>
                                setPaidAmount(e.target.value)
                            }
                            className="border p-2 w-full mb-4"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={createCreditNote}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

const ShippingSetting = ({ auth }) => {
    const [activeTab, setActiveTab] = useState("address");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            fullName: "Stephanie C. Arig",
            phoneNumber: "63983556421",
            address:
                "#286, Sitio Bukig, Pangapisan, City of Alaminos, Pangasinan Pangapisan, Alaminos City North Luzon, Pangasinan 2407",
            type: "Address",
        },
        {
            id: 2,
            fullName: "Rhenzel Von A. Ginez",
            phoneNumber: "639085121168",
            address:
                "Near at Jehova (Paraiso) Sign Board of Ferrer and Supangan Street. Poblacion, Mabini North Luzon, Pangasinan 2409",
            type: "Pickup Address",
        },
        {
            id: 3,
            fullName: "Rhenzel Von Ginez",
            phoneNumber: "639762266801",
            address:
                "Near at Jehova , Sign board of Supangan and Ferrer Street",
            type: "Default Address",
        },
    ]);

    const handleDelete = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    return (
        <SellerAuthenticatedLayout user={auth}>
            <Head title="Shipping Setting" />

            <div className="container mx-auto bg-white shadow rounded-lg p-4">
                <div className="border-b border-gray-200">
                    <ul className="flex">
                        <li
                            className={`mr-1 ${
                                activeTab === "address"
                                    ? "border-b-2 border-red-600"
                                    : ""
                            }`}
                        >
                            <button
                                className={`bg-white inline-block py-2 px-4 text-gray-800 hover:text-gray-600 focus:outline-none ${
                                    activeTab === "address" ? "font-bold" : ""
                                }`}
                                onClick={() => handleTabClick("address")}
                            >
                                Address Management
                            </button>
                        </li>
                        <li
                            className={`mr-1 ${
                                activeTab === "shipping"
                                    ? "border-b-2 border-red-600"
                                    : ""
                            }`}
                        >
                            <button
                                className={`bg-white inline-block py-2 px-4 text-gray-800 hover:text-gray-600 focus:outline-none ${
                                    activeTab === "shipping" ? "font-bold" : ""
                                }`}
                                onClick={() => handleTabClick("shipping")}
                            >
                                Shipping Channel
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="mt-4  flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold ">My Addresses</h2>
                        <h3 className="text-slate-500">
                            Manage your shipping and pickup addresses
                        </h3>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Add a new address
                    </button>
                </div>
                <div className=" p-4">
                    {activeTab === "address" &&
                        addresses.map((address, index) => (
                            <div
                                key={address.id}
                                className="mb-6 border-b pb-4"
                            >
                                <h2 className="mb-2 font-bold text-slate-800">
                                    Address {index + 1}
                                </h2>
                                <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between p-4 rounded-md bg-slate-50">
                                    <div className=" flex gap-4">
                                        <div className="text-slate-500 space-y-1.5">
                                            <h3>Full Name</h3>
                                            <h3>Phone Number</h3>
                                            <h3>Address</h3>
                                        </div>
                                        <div className="text-slate-800 space-y-1.5">
                                            <h3 className="font-bold">
                                                Name mo{" "}
                                                <small
                                                    className={`px-2 ml-2 text-xs py-1 rounded ${
                                                        address.type ===
                                                        "Pickup Address"
                                                            ? "bg-orange-200 text-orange-700"
                                                            : address.type ===
                                                              "Default Address"
                                                            ? "bg-green-200 text-green-700"
                                                            : "bg-gray-200 text-gray-700"
                                                    }`}
                                                >
                                                    {address.type}
                                                </small>
                                            </h3>
                                            <h3>09102648125</h3>
                                            <h3>
                                                Dapdap Pocalpocal alaminos City
                                                pangasinan
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-x-2">
                                        <button className="text-blue-500">
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() =>
                                                handleDelete(address.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {/* <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">
                                        Address {index + 1}
                                    </h3>
                                    
                                </div> */}
                                {/* <div>
                                    <span className="font-bold">Type: </span>
                                    
                                </div> */}
                            </div>
                        ))}
                </div>
            </div>
        </SellerAuthenticatedLayout>
    );
};

export default ShippingSetting;

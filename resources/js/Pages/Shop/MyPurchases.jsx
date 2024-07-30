import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    FaMoneyBillWave,
    FaShippingFast,
    FaBoxOpen,
    FaStar,
} from "react-icons/fa";

export default function MyPurchases({ auth }) {
    const [activeTab, setActiveTab] = useState("toPay");

    const tabs = [
        { id: "toPay", label: "To Pay", icon: <FaMoneyBillWave /> },
        { id: "toShip", label: "To Ship", icon: <FaShippingFast /> },
        { id: "toReceive", label: "To Receive", icon: <FaBoxOpen /> },
        { id: "toRate", label: "To Rate", icon: <FaStar /> },
    ];

    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title="My Purchases" />
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

                    <div className="mb-6">
                        <ul className="flex justify-around border-b">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.id}
                                    className={`cursor-pointer p-4 text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? "border-b-2 border-themeColor text-themeColor"
                                            : "hover:text-themeColor"
                                    }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        {activeTab === "toPay" && (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">
                                    To Pay
                                </h2>
                                <p>Your items that need payment...</p>
                            </div>
                        )}
                        {activeTab === "toShip" && (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">
                                    To Ship
                                </h2>
                                <p>Your items that need shipping...</p>
                            </div>
                        )}
                        {activeTab === "toReceive" && (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">
                                    To Receive
                                </h2>
                                <p>Your items that are on the way...</p>
                            </div>
                        )}
                        {activeTab === "toRate" && (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">
                                    To Rate
                                </h2>
                                <p>Your items that need rating...</p>
                            </div>
                        )}
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
    FaMoneyBillWave,
    FaShippingFast,
    FaBoxOpen,
    FaStar,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToPay = lazy(() => import("./Partials/ToPay"));
const ToShip = lazy(() => import("./Partials/TopShip"));
const ToReceive = lazy(() => import("./Partials/ToReceive"));
const ToRate = lazy(() => import("./Partials/ToRate"));

export default function MyPurchases({ auth }) {
    const { flash, purchases } = usePage().props;
    const [activeTab, setActiveTab] = useState("toPay");

    const tabs = [
        { id: "toPay", label: "To Pay", icon: <FaMoneyBillWave /> },
        { id: "toShip", label: "To Ship", icon: <FaShippingFast /> },
        { id: "toReceive", label: "To Receive", icon: <FaBoxOpen /> },
        { id: "toRate", label: "To Rate", icon: <FaStar /> },
    ];

    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.error(flash.message);
        }
    });

    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title="My Purchases" />
                <ToastContainer />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

                    <div className="mb-6">
                        <ul className="flex justify-around border-b">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.id}
                                    className={`cursor-pointer p-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
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
                        <Suspense fallback={<div>Loading...</div>}>
                            {activeTab === "toPay" && (
                                <ToPay toPay={purchases} />
                            )}
                            {activeTab === "toShip" && <ToShip />}
                            {activeTab === "toReceive" && <ToReceive />}
                            {activeTab === "toRate" && <ToRate />}
                        </Suspense>
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

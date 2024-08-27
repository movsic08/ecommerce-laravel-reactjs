import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawalRequests = ({ auth }) => {
    const { requestsLists, flash } = usePage().props;
    const [filter, setFilter] = useState("all");

    const { data, setData, post, processing, reset } = useForm({
        status: "",
    });

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("activeTab") || "pending";
        setActiveTab(param);
    }, []);

    const filteredRequests = requestsLists.filter((request) => {
        if (filter === "all") return true;
        return request.status === filter;
    });

    const handleChangeTab = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeTab", tabId);
        window.history.pushState({ activeTab }, "", url);
    };

    const handleStatusChange = async (id) => {
        try {
            await post(route("widthdrawal.request.update", id), {
                data: {
                    status: data.status,
                },
                onSuccess: () => reset(),
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleButtonClick = async (status, id) => {
        // Set status and then call handleStatusChange
        await new Promise((resolve) => {
            setData("status", status, resolve);
        });
        handleStatusChange(id);
    };

    useEffect(() => {
        if (flash.status === "success") {
            toast.success(flash.message);
        } else if (flash.message) {
            toast.info(flash.message);
        }
    }, [flash]);

    return (
        <AdminAuthenticatedLayout user={auth}>
            <ToastContainer />
            <Head title="Withdrawal Requests" />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    Withdrawal Requests
                </h2>

                {/* Filter Buttons */}
                <div className="mb-6 flex space-x-4">
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "all"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("all");
                            setFilter("all");
                        }}
                    >
                        All
                    </button>

                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "pending"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("pending");
                            setFilter("pending");
                        }}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "approved"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("approved");
                            setFilter("approved");
                        }}
                    >
                        Approved
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "rejected"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("rejected");
                            setFilter("rejected");
                        }}
                    >
                        Rejected
                    </button>
                </div>

                {/* Withdrawal Requests Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Seller
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Amount
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Status
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Created At
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-6 border-b text-gray-800">
                                        {request.seller_data.user.first_name +
                                            " " +
                                            request.seller_data.user.last_name}
                                    </td>
                                    <td className="py-3 px-6 border-b text-gray-800">
                                        PHP {request.amount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-6 border-b capitalize text-gray-800">
                                        {request.status}
                                    </td>
                                    <td className="py-3 px-6 border-b text-gray-800">
                                        {format(
                                            new Date(request.created_at),
                                            "MMMM d, yyyy h:mm a"
                                        )}
                                    </td>
                                    <td className="py-3 px-6 border-b">
                                        {request.status === "pending" && (
                                            <div className="flex space-x-2">
                                                <button
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                                    onClick={() =>
                                                        handleButtonClick(
                                                            "approved",
                                                            request.id
                                                        )
                                                    }
                                                    disabled={processing}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                                    onClick={() =>
                                                        handleButtonClick(
                                                            "rejected",
                                                            request.id
                                                        )
                                                    }
                                                    disabled={processing}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
};

export default WithdrawalRequests;

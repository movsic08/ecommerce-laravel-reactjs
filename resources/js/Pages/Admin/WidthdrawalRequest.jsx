import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { format } from "date-fns"; // Import date-fns for formatting

const WithdrawalRequests = ({ auth }) => {
    const { requestsLists } = usePage().props;
    const [filter, setFilter] = useState("all");

    const filteredRequests = requestsLists.filter((request) => {
        if (filter === "all") return true;
        return request.status === filter;
    });

    return (
        <AdminAuthenticatedLayout user={auth}>
            <Head title="Withdrawal Requests" />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    Withdrawal Requests
                </h2>

                {/* Filter Buttons */}
                <div className="mb-6 flex space-x-4">
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            filter === "all"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            filter === "pending"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            filter === "approved"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setFilter("approved")}
                    >
                        Approved
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            filter === "rejected"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setFilter("rejected")}
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
                                        ${request.amount.toLocaleString()}
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
                                                        handleApprove(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                                    onClick={() =>
                                                        handleReject(request.id)
                                                    }
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

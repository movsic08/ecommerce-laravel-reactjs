import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";

export default function Finance({ auth }) {
    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const activetabURL = urlParams.get("activeTab") || "toRelease";
        setActiveTab(activetabURL);
    });

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // router.get(route("seller.finance", { activeTab: tab }));
        window.history.pushState(null, "", `?activeTab=${tab}`);
    };

    return (
        <>
            <SellerAuthenticatedLayout user={auth}>
                <Head title="Finance - Seller" />
                <div className="mx-auto max-w-6xl flex mt-2 md:mt-4 lg:mt-6 flex-col lg:flex-row gap-6">
                    <div className="w-full space-y-6">
                        {/* 1st container */}
                        <div className="p-4 bg-white drop-shadow-md w-full rounded-md">
                            <h1 className="font-bold text-gray-600">
                                Income Overview
                            </h1>
                            <div className="mt-4 flex w-full gap-4">
                                <div className="flex gap-4 w-full">
                                    <div className="flex flex-col">
                                        <h1 className="mb-2 text-gray-800">
                                            To Release
                                        </h1>
                                        <small className="text-gray-500">
                                            Total
                                        </small>
                                        <strong className="text-4xl flex">
                                            <FaPesoSign /> 0.00
                                        </strong>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="mb-2 text-gray-800">
                                            To Release
                                        </h1>
                                        <small className="text-gray-500">
                                            Total
                                        </small>
                                        <strong className="text-4xl flex">
                                            <FaPesoSign /> 0.00
                                        </strong>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full items-end">
                                    <div className="flex flex-col">
                                        <small className="text-gray-500">
                                            Total
                                        </small>
                                        <strong className="text-2xl flex">
                                            <FaPesoSign /> 0.00
                                        </strong>
                                    </div>
                                    <div className="flex flex-col">
                                        <small className="text-gray-500">
                                            Total
                                        </small>
                                        <strong className="text-2xl flex">
                                            <FaPesoSign /> 0.00
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 2nd container */}
                        <div className="p-4 bg-white drop-shadow-md w-full rounded-md">
                            <h1 className="font-bold text-gray-600">
                                Income Details
                            </h1>
                            <div>
                                <div className="flex gap-8 mb-2 mt-4">
                                    <button
                                        onClick={() =>
                                            handleTabClick("toRelease")
                                        }
                                        className={`text-gray-500 ${
                                            activeTab === "toRelease"
                                                ? "text-themeColor border-b cursor-default border-themeColor font-extrabold"
                                                : "cursor-pointer"
                                        }}`}
                                    >
                                        To Release
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleTabClick("release")
                                        }
                                        className={`text-gray-500 ${
                                            activeTab === "release"
                                                ? "text-themeColor border-b cursor-default border-themeColor font-extrabold"
                                                : "cursor-pointer"
                                        }}`}
                                    >
                                        Release
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg-gray-200">
                                            <tr className="text-sm">
                                                <th className="w-1/5 py-2 px-4">
                                                    Order
                                                </th>
                                                <th className="w-1/5 py-2 px-4">
                                                    Release Date
                                                </th>
                                                <th className="w-1/5 py-2 px-4">
                                                    Status
                                                </th>
                                                <th className="w-1/5 py-2 px-4">
                                                    Payment Method
                                                </th>
                                                <th className="w-1/5 py-2 px-4">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeTab == "toRelease" ? (
                                                <tr className="border-b bg-gray-50">
                                                    <td className="py-2 px-4">
                                                        52345234535
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr className="border-b bg-gray-50">
                                                    <td className="py-2 px-4">
                                                        release
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        --
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 3rd container */}
                    <div className="p-4 bg-white drop-shadow-md w-full rounded-md max-w-md">
                        <h1 className="font-bold text-gray-600">
                            Income Statement
                        </h1>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

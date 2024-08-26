import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Finance({ auth }) {
    const { balance, walletTransactions, flash } = usePage().props;
    console.log(walletTransactions);
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

    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.info(flash.message);
        }
    }, [flash]);

    return (
        <>
            <SellerAuthenticatedLayout user={auth}>
                <Head title="Finance - Seller" />
                <ToastContainer />
                <div className="mx-auto max-w-6xl flex mt-2 md:mt-4 lg:mt-6 flex-col lg:flex-row gap-6">
                    <div className="w-full space-y-6">
                        {/* 1st container */}
                        <div className="p-4 bg-white drop-shadow-md w-full rounded-md">
                            <div className="flex items-center justify-between">
                                <h1 className="font-bold text-gray-600">
                                    Income Overview
                                </h1>
                                <Link
                                    href={route("seller.request.withdraw")}
                                    disabled={balance == 0}
                                    className={`py-1  px-2 rounded-lg font-medium bg-themeColor text-white ${
                                        balance == 0
                                            ? " cursor-not-allowed "
                                            : " duration-300 cursor-pointer ease-in-out hover:bg-orange-500 "
                                    }`}
                                >
                                    Request Payout
                                </Link>
                            </div>
                            <div className="mt-4 flex w-full gap-4">
                                <div className="flex gap-4 w-full">
                                    <div className="flex flex-col">
                                        <h1 className="mb-2 text-gray-800">
                                            Current Balance
                                        </h1>
                                        <small className="text-gray-500">
                                            Total
                                        </small>
                                        <strong className="text-4xl flex">
                                            <FaPesoSign />{" "}
                                            {new Intl.NumberFormat().format(
                                                balance
                                            )}
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
                                        Income Statements
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
                    <div className="p-6 bg-white shadow-lg w-full rounded-lg lg:max-w-md lg:mx-auto">
                        <h1 className="font-semibold text-xl text-gray-800 mb-4">
                            Wallet Transactions
                        </h1>
                        <div className="space-y-2">
                            {walletTransactions.length == 0
                                ? "No Wallet transaction yet."
                                : walletTransactions.map((transaction) => (
                                      <div
                                          key={transaction.id}
                                          className="bg-slate-50 flex items-center justify-between border p-3 shadow-sm border-slate-200 rounded"
                                      >
                                          <div className="flex gap-1 flex-col">
                                              <small className="text-slate-500">
                                                  Reference No.:
                                              </small>
                                              <span className="font-medium text-gray-900">
                                                  {transaction.reference_number}
                                              </span>
                                          </div>
                                          <div className="flex gap-1 flex-col items-end">
                                              <span
                                                  className={`font-medium p-1 capitalize ${
                                                      transaction.type ==
                                                      "income"
                                                          ? "bg-green-200 text-green-700"
                                                          : "bg-red-200 text-red-700"
                                                  } rounded text-xs `}
                                              >
                                                  {transaction.type}
                                              </span>
                                              <span className="font-medium text-green-600">
                                                  {transaction.type == "income"
                                                      ? "+"
                                                      : "-"}{" "}
                                                  ₱
                                                  {new Intl.NumberFormat().format(
                                                      transaction.amount
                                                  )}
                                              </span>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

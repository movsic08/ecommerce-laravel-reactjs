import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { RiBillLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineStarRate } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";

export default function OrderDetais({ auth }) {
    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title="No. - Order Details" />

                <div className="max-w-4xl mx-auto p-4">
                    <div className="bg-white shadow-md rounded-md p-4 mb-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center justify-between  w-full  text-gray-500">
                                <Link
                                    href={route("user.myPurchases")}
                                    className="items-center hover:text-themeColor duration-200 cursor-pointer flex gap-2"
                                >
                                    <IoChevronBackCircle />
                                    Back
                                </Link>
                                <span className="text-sm">
                                    <strong> ORDER ID:</strong> 220615VRSUDYM |
                                    <span className="text-red-500 ml-2 font-semibold">
                                        ORDER PLACED
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 lg:mt-6">
                            <div className="relative flex justify-between items-center">
                                {/* Progress Line */}
                                <div className="absolute top-[1rem] left-[2rem] right-[2rem] h-1.5 bg-themeColor"></div>{" "}
                                {/* Order Placed */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="bg-themeColor flex items-center justify-center rounded-full w-10 h-10">
                                        <RiBillLine
                                            className="text-white"
                                            size={25}
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Placed
                                    </span>
                                </div>
                                {/* Order Paid */}
                                <div className="relative z-20 flex flex-col items-center">
                                    <div className="border-2 bg-white border-themeColor flex items-center justify-center rounded-full w-10 h-10">
                                        <MdOutlinePayments
                                            size={25}
                                            className="text-themeColor"
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Paid (COD)
                                    </span>
                                </div>
                                {/* Order Shipped Out */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="border-2 border-themeColor bg-white flex items-center justify-center rounded-full w-10 h-10">
                                        <TbTruckDelivery
                                            size={25}
                                            className="text-themeColor"
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Shipped Out
                                    </span>
                                </div>
                                {/* Order Received */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="border-2 border-themeColor bg-white flex items-center justify-center rounded-full w-10 h-10">
                                        <LuPackageCheck
                                            size={25}
                                            className="text-themeColor"
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Received
                                    </span>
                                </div>
                                {/* Order Completed */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="border-2 border-themeColor bg-white flex items-center justify-center rounded-full w-10 h-10">
                                        <MdOutlineStarRate
                                            size={25}
                                            className="text-themeColor"
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Delivery Address
                        </h3>
                        <p className="text-sm text-gray-500">
                            [Delivery Address Details]
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Shipment Tracking
                        </h3>
                        <div className="overflow-auto">
                            <ul className="text-sm text-gray-500 space-y-4">
                                <li>
                                    <span className="text-green-500 font-semibold">
                                        Delivered:
                                    </span>{" "}
                                    22-06-2022 10:44 - Delivered to recipient
                                </li>
                                <li>
                                    <span className="text-blue-500 font-semibold">
                                        In transit:
                                    </span>{" "}
                                    22-06-2022 07:31 - Package is in transit to
                                    final destination
                                </li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Tracking Number:{" "}
                            <span className="text-gray-600">
                                TH4225287912815R
                            </span>
                        </p>
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

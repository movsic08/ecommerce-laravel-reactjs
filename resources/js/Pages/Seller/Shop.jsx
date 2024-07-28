import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Shop() {
    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Dashboard" />
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">
                        Seller Dashboard
                    </h1>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            Incoming Orders
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Pending Orders */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">
                                    Pending Orders
                                </h3>
                                <ul className="space-y-4">
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12345</span>
                                            <span className="text-gray-500">
                                                2 items
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Pending
                                        </div>
                                    </li>
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12346</span>
                                            <span className="text-gray-500">
                                                3 items
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Pending
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Processing Orders */}
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">
                                    Processing Orders
                                </h3>
                                <ul className="space-y-4">
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12347</span>
                                            <span className="text-gray-500">
                                                1 item
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Processing
                                        </div>
                                    </li>
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12348</span>
                                            <span className="text-gray-500">
                                                5 items
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Processing
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Completed Orders */}
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">
                                    Completed Orders
                                </h3>
                                <ul className="space-y-4">
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12349</span>
                                            <span className="text-gray-500">
                                                2 items
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Completed
                                        </div>
                                    </li>
                                    <li className="border-b pb-2">
                                        <div className="flex justify-between items-center">
                                            <span>Order #12350</span>
                                            <span className="text-gray-500">
                                                4 items
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            Completed
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import defaultProduct1 from "../../assets/img/product_1.png";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";

export default function Products() {
    const { products } = usePage().props;
    console.log(products);
    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Products" />
                <div>
                    <div className=" flex items-center justify-between px-4">
                        <div className=" flex items-center gap-1">
                            {" "}
                            <InputLabel
                                htmlFor="filterbyStatus"
                                value="Filter by Status"
                            />
                            <select
                                id="filterByStatus"
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="verified">Verified</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        <Link
                            href={route("seller.showAddProduct")}
                            className=" text-white bg-themeColor px-2 text-sm rounded-lg py-3"
                        >
                            Add prodcut
                        </Link>
                    </div>
                    {products.data == 0 ? (
                        <div className="flex justify-center w-full">
                            <div className="bg-white p-8  mt-10 rounded-lg shadow-lg text-center max-w-sm w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    No uploaded products yet
                                </h2>
                                <p className="text-gray-600">
                                    Click Add Products to start.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {products.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white shadow-md rounded-lg p-4 flex flex-col"
                                >
                                    <img
                                        src={
                                            item.images[0].image_path
                                                ? item.images[0].image_path
                                                : defaultProduct1
                                        }
                                        alt="Product"
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="mt-4 flex-grow">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {item.product_name}
                                        </h2>
                                        <p className="text-gray-700">
                                            Amount: Php {item.price}
                                        </p>
                                        <p className="text-gray-700">
                                            Status:{" "}
                                            <span className="text-green-500">
                                                Available
                                            </span>
                                        </p>
                                        <p className="text-gray-700">
                                            Date Created: 2024-07-20
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button className="bg-themeColor text-white px-4 py-2 rounded hover:bg-orange-500">
                                            View
                                        </button>

                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

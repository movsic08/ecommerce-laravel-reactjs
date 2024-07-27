import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import defaultProduct1 from "../../assets/img/product_1.png";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
    const { products, flash } = usePage().props;
    // console.log(products);\
    console.log(flash);
    const deleteSubmit = (e, id, name) => {
        e.preventDefault();
        if (
            !window.confirm(
                "Are you sure you want to delete this product '" + name + "'?"
            )
        ) {
            return;
        }
        router.delete(route("seller.destroy.product", id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Delete Success");
            },
            onError: () => {
                toast.error("Error deleting the product");
            },
        });
    };
    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Products" />
                <ToastContainer />
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
                                            Status:
                                            <span
                                                className={
                                                    item.is_verified == 0
                                                        ? "text-red-700"
                                                        : "text-green-700"
                                                }
                                            >
                                                {item.is_verified == 0
                                                    ? " Pending"
                                                    : " Available"}
                                            </span>
                                        </p>
                                        <p className="text-gray-700">
                                            Date Created: 2024-07-20
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <Link
                                            href={route(
                                                "seller.view.product",
                                                item.id
                                            )}
                                            className="bg-themeColor text-white px-4 py-2 rounded hover:bg-orange-500"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={(e) =>
                                                deleteSubmit(
                                                    e,
                                                    item.id,
                                                    item.product_name
                                                )
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
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

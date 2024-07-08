import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ViewSellersData({ auth }) {
    const { seller } = usePage().props;

    const [isEditing, setIsEditing] = useState(false);
    const [sellerData, setSellerData] = useState({ ...seller });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSellerData({ ...sellerData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Add logic to save changes, e.g., making an API call
    };

    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Seller data" />
                {/* <pre className="bg-gray-100 p-4 rounded-md">
                    {JSON.stringify(seller, null, 2)}
                </pre> */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-8">
                        <h2 className="text-2xl font-semibold leading-tight mb-6">
                            Seller Data
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="col-span-1 sm:col-span-2 text-center">
                                    <img
                                        // src={seller.photo}
                                        // alt={seller.first_name}
                                        className="w-24 h-24 rounded-full mx-auto"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={seller.first_name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${
                                            isEditing
                                                ? "border-gray-300"
                                                : "border-none bg-gray-100"
                                        }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={seller.last_name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${
                                            isEditing
                                                ? "border-gray-300"
                                                : "border-none bg-gray-100"
                                        }`}
                                    />
                                </div>

                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={seller.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${
                                            isEditing
                                                ? "border-gray-300"
                                                : "border-none bg-gray-100"
                                        }`}
                                    />
                                </div>

                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Joined
                                    </label>
                                    <input
                                        type="text"
                                        name="joined"
                                        // value={new Date(
                                        //     seller.joined
                                        // ).toLocaleDateString("en-US", {
                                        //     year: "numeric",
                                        //     month: "short",
                                        //     day: "numeric",
                                        // })}
                                        disabled
                                        className="mt-1 block w-full rounded-md bg-gray-100 border-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                {isEditing ? (
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}

import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import DefaultShopProfile from "../../assets/img/default_shop_profile.png";

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

    function formatDate(dateString) {
        const options = { month: "short", day: "numeric", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }

    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Seller data" />
                <pre className="bg-gray-100 p-4 rounded-md">
                    {JSON.stringify(seller, null, 2)}
                </pre>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-8">
                        <h2 className="text-2xl font-semibold leading-tight mb-6">
                            Seller Data
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="col-span-1 flex sm:col-span-2 text-center">
                                    <div className=" w-1/3">
                                        {" "}
                                        <img
                                            src={
                                                seller.seller
                                                    .profile_picture_path
                                                    ? seller.seller
                                                          .profile_picture_path
                                                    : DefaultShopProfile
                                            }
                                            // alt={seller.first_name}
                                            className=" w-40 h-40 rounded-full mx-auto"
                                        />
                                    </div>
                                    <div className="w-full flex gap-4">
                                        <div className=" w-full">
                                            <div className=" flex flex-col items-start">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Shop name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value="Shop name "
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className={`mt-1 block w-full rounded-md ${
                                                        isEditing
                                                            ? "border-gray-300"
                                                            : "border-none bg-gray-100"
                                                    }`}
                                                />
                                            </div>
                                            <div className=" flex flex-col items-start mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Shop Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value="Shop address "
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className={`mt-1 block w-full rounded-md ${
                                                        isEditing
                                                            ? "border-gray-300"
                                                            : "border-none bg-gray-100"
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-col">
                                            <div className=" flex flex-col items-start">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Status
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={
                                                        seller.seller
                                                            .is_verified
                                                    }
                                                    disabled={!isEditing}
                                                    className={`mt-1 block w-full rounded-md ${
                                                        isEditing
                                                            ? "border-gray-300"
                                                            : "border-none bg-gray-100"
                                                    }`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-start mt-2 text-sm font-medium text-gray-700">
                                                    Joined
                                                </label>
                                                <input
                                                    type="text"
                                                    name="joined"
                                                    value={formatDate(
                                                        seller.seller.created_at
                                                    )}
                                                    disabled
                                                    className="mt-1 block w-full rounded-md bg-gray-100 border-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                        Seller Address
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
                                <div className="flex gap-4 col-span-1 sm:col-span-2">
                                    {" "}
                                    <div className=" w-1/2">
                                        <div className="">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Years in selling
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={
                                                    seller.seller
                                                        .years_in_selling
                                                }
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`mt-1 block w-full rounded-md ${
                                                    isEditing
                                                        ? "border-gray-300"
                                                        : "border-none bg-gray-100"
                                                }`}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Motto
                                            </label>

                                            <textarea
                                                name="motto"
                                                value={seller.seller.motto}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`mt-1 block w-full rounded-md ${
                                                    isEditing
                                                        ? "border-gray-300"
                                                        : "border-none bg-gray-100"
                                                }`}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className=" w-1/2 flex gap-6">
                                        <div className="w-fit">
                                            <div className=" ">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Permit
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${
                                                        seller.seller.has_permit
                                                            ? "bg-green-300 text-green-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {seller.seller.has_permit
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>{" "}
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    DTI
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${
                                                        seller.seller.has_DTI
                                                            ? "bg-green-300 text-green-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {seller.seller.has_DTI
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Mayor's Business Permit
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${
                                                        seller.seller
                                                            .has_mayors_business_permit
                                                            ? "bg-green-300 text-green-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {seller.seller
                                                        .has_mayors_business_permit
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className=" ">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Permit file
                                                </label>
                                                <button className="ml-2 bg-blue-500 px-2 py-1 rounded text-white">
                                                    View Permit{" "}
                                                </button>
                                            </div>{" "}
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Paid Organizational Fee
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${
                                                        seller.seller
                                                            .has_paid_organizational_fee
                                                            ? "bg-green-300 text-green-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {seller.seller
                                                        .has_paid_organizational_fee
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Barangay Clearance
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${
                                                        seller.seller
                                                            .has_barangay_clearance
                                                            ? "bg-green-300 text-green-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {seller.seller
                                                        .has_barangay_clearance
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
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

import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import InputError from "@/Components/InputError"; // Import InputError if not already imported
import StarRating from "@/Components/StarRating";
import PermitPictureViewer from "@/Components/PermitPictureViewer";
import ModalImage from "react-modal-image";

export default function ViewEditProduct({ auth }) {
    const { product } = usePage().props;

    // State to manage editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the server)
        console.log("Updated Product Data:", editedProduct);
        // Here you can add your submission logic, like an API call
    };

    const isEditable = !product.is_verified; // Only allow editing if is_verified is false

    return (
        <SellerAuthenticatedLayout user={auth}>
            <Head title={"Product Name"} />
            <h1 className="-mb-4 text-xl font-bold text-mainText max-w-4xl mx-auto">
                <Link href={route("seller.products")}>Go Back</Link>
            </h1>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-6">
                <h2 className="text-mainText text-2xl font-semibold mb-4">
                    {isEditing ? "Editing " : `Viewing `}
                    {product.product_name}
                </h2>
                <div className="w-full pb-2 flex items-center justify-center">
                    <div
                        className={`text-center text-xs rounded flex p-2 w-[70%] ${
                            product.is_verified
                                ? "text-green-500 bg-green-50"
                                : "text-red-500 bg-red-50"
                        }`}
                    >
                        {product.is_verified ? (
                            <span>
                                The product is verified. You can only edit the
                                price, quantity, and description.
                            </span>
                        ) : (
                            <span>
                                The product is not yet verified. You can
                                customize all the details. Please note that once
                                it is verified by the admin, you will only be
                                able to edit the price, quantity, and
                                description.
                            </span>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <p className="mt-1 text-gray-900">
                            {product.product_name}
                        </p>
                    </div>

                    <div className="md:flex gap-4">
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            {isEditing && isEditable ? (
                                <input
                                    value={editedProduct.price}
                                    onChange={handleChange}
                                    name="price"
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">
                                    ${product.price}
                                </p>
                            )}
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            {isEditing && isEditable ? (
                                <input
                                    value={editedProduct.quantity}
                                    onChange={handleChange}
                                    name="quantity"
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">
                                    {product.quantity}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        {isEditing && isEditable ? (
                            <textarea
                                value={editedProduct.description}
                                name="description"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                                onChange={handleChange}
                            ></textarea>
                        ) : (
                            <p className="mt-1 text-gray-900">
                                {product.description}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <p className="mt-1 text-gray-900">
                                {product.category_id}
                            </p>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <p
                                className={`mt-1 text-gray-900 font-black ${
                                    product.is_verified
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {product.is_verified
                                    ? "Verified"
                                    : "Not Verified"}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Rating
                            </label>
                            <StarRating rating={product.rating} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Images
                        </label>
                        <div className="flex space-x-4 mt-2">
                            {product.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <ModalImage
                                        small={image.image_path}
                                        large={image.image_path}
                                        className="w-40 h-40 object-cover rounded shadow cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                        {isEditing && (
                            <button
                                type="submit"
                                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </SellerAuthenticatedLayout>
    );
}

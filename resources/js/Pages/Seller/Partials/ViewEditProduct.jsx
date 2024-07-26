import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import StarRating from "@/Components/StarRating";
import ModalImage from "react-modal-image";

export default function ViewEditProduct({ auth }) {
    const { product } = usePage().props;
    const { data, setData, processing, errors, patch } = useForm({
        product_name: product.product_name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        type: product.type,
        images: product.images,
        newUploadedImages: [],
    });

    const [isolatedImages, setIsolatedImages] = useState(product.images);
    const [originalImages, setOriginalImages] = useState(product.images); // Keep track of original images

    // State to manage editing mode
    const [isEditing, setIsEditing] = useState(true);

    const handleEditToggle = () => {
        if (isEditing) {
            setData({ ...data, images: originalImages });
        } else {
            setIsolatedImages(data.images);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleImageRemove = (index) => {
        const updatedImages = data.images.filter((_, i) => i !== index);
        setData({ ...data, images: updatedImages });
    };
    const handleImageRemoveNewUploaded = (index) => {
        const updatedImages = data.newUploadedImages.filter(
            (_, i) => i !== index
        );
        setData({ ...data, newUploadedImages: updatedImages });
    };

    const handleNewFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (
            data.images.length + data.newUploadedImages.length + files.length >
            5
        ) {
            alert("You can upload up to 5 images only.");
            return;
        }
        setData("newUploadedImages", [...data.newUploadedImages, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Product Data:", data);
    };

    const isEditable = !product.is_verified;

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
                        {isEditing && isEditable ? (
                            <input
                                value={data.product_name}
                                onChange={handleChange}
                                name="product_name"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        ) : (
                            <p className="mt-1 text-gray-900">
                                {product.product_name}
                            </p>
                        )}
                    </div>
                    {/* price and quantity */}
                    <div className="md:flex gap-4">
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            {isEditing && isEditable ? (
                                <input
                                    value={data.price}
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
                                    value={data.quantity}
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
                    {/* description and cetegory row */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        {isEditing && isEditable ? (
                            <textarea
                                value={data.description}
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
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Sold
                            </label>
                            <p className="mt-1 text-gray-900">{product.sold}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Rating
                            </label>
                            <StarRating rating={product.rating} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap gap-4 mb-4 mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Images
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {isEditing ? (
                                <div className=" flex space-x-4">
                                    {data.images.map((image, index) => (
                                        <div key={index} className=" relative">
                                            <ModalImage
                                                small={image.image_path}
                                                large={image.image_path}
                                                className="w-40 h-40 object-cover rounded shadow cursor-pointer"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleImageRemove(index)
                                                }
                                                className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {data.newUploadedImages.map(
                                        (image, index) => (
                                            <div
                                                key={index}
                                                className=" relative"
                                            >
                                                <ModalImage
                                                    small={URL.createObjectURL(
                                                        image
                                                    )}
                                                    large={URL.createObjectURL(
                                                        image
                                                    )}
                                                    className="w-40 h-40 object-cover rounded shadow cursor-pointer"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleImageRemoveNewUploaded(
                                                            index
                                                        )
                                                    }
                                                    className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                isolatedImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <ModalImage
                                            small={image.image_path}
                                            large={image.image_path}
                                            className="w-40 h-40 object-cover rounded shadow cursor-pointer"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                            {isEditing && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Add Another Images
                                    </label>

                                    <small className="text-gray-500">
                                        You can upload up to{" "}
                                        {5 - data.images.length} more images.
                                        Please ensure that each image has a 1:1
                                        aspect ratio or is in a square format.
                                    </small>
                                    <input
                                        // maxLength={5}
                                        type="file"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        multiple
                                        accept="image/*"
                                        onChange={handleNewFileChange}
                                        disabled={
                                            data.images.length +
                                                data.newUploadedImages.length >=
                                            5
                                        }
                                    />
                                </div>
                            )}
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
                    </div>
                </form>
            </div>
        </SellerAuthenticatedLayout>
    );
}

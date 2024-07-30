import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";
import ModalImage from "react-modal-image";

export default function Checkout({ auth }) {
    const { quantity, product } = usePage().props;
    console.log(product);

    const { data } = useForm({
        payment_method: "cod",
    });

    const items = [
        {
            product_id: 1,
            shop_name: "Shop A",
            product_name: "Product A1",
            category: "Category A",
            price: 100,
            quantity: 2,
        },
        {
            product_id: 2,
            shop_name: "Shop B",
            product_name: "Product B1",
            category: "Category B",
            price: 150,
            quantity: 1,
        },
    ];

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", data);
    };

    return (
        <UserAuthenticatedLayout user={auth}>
            <Head title="Checkout" />
            <div className="max-w-2xl mx-auto p-6 my-6 bg-white shadow-lg md:rounded-lg border border-gray-200">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Checkout
                </h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-2xl mb-2 flex items-center gap-2 font-semibold text-gray-700">
                            <FaLocationDot className="text-gray-600" /> Delivery
                            Address
                        </h2>
                        <div className="text-gray-600">
                            Elmer Tirao | 09668093199
                        </div>
                        <div className="text-gray-600">
                            Alaminos City, Pangasinan
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">
                        Product Details
                    </h2>
                    <div className="space-y-4 mt-4">
                        <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center bg-gray-50">
                            <div className="flex gap-2 items-center">
                                <ModalImage className="w-24 h-24" />
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        {product.product_name}
                                    </p>
                                    <p className="text-gray-500">
                                        Shop: {product.shop_name}
                                    </p>
                                    <p className="text-gray-500">
                                        Category: {product.category}
                                    </p>
                                    <p className="text-gray-700">
                                        Price: Php{product.price}
                                    </p>
                                    <p className="text-gray-500">
                                        Quantity: {quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-gray-800">
                                Php
                                {new Intl.NumberFormat().format(
                                    product.price * quantity
                                )}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">
                        Order Summary
                    </h2>
                    <div className="flex justify-between font-semibold mt-2 text-gray-700">
                        <span>Total Items:</span>
                        <span>{itemCount}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 text-gray-700">
                        <span>Total Price:</span>
                        <span>
                            Php
                            {new Intl.NumberFormat().format(
                                product.price * quantity
                            )}
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">
                        Payment Option
                    </h2>
                    <div className="flex flex-col mt-4">
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="payment_option"
                                value="cod"
                                checked={data.payment_method === "cod"}
                                // onChange={handleChange}
                                className="mr-1"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment_option"
                                value="gcash"
                                className="mr-2"
                            />
                            GCash
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </UserAuthenticatedLayout>
    );
}

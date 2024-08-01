import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";
import ModalImage from "react-modal-image";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";
import SpinnerLoading from "@/Components/SpinnerLoading";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Checkout({ auth }) {
    const { products } = usePage().props;
    const name = auth.user.first_name + " " + auth.user.last_name;
    const phone_no = auth.user.phone_no;
    const address = auth.user.address;
    console.log(products);
    console.log(auth);
    const dummy = [
        {
            product: {
                id: 4,
                product_name: "Lamps",
                rating: 0,
                sold: 0,
                quantity: 123,
                price: 100,
                description: "safdsgdfhfncgnc",
                is_verified: 1,
                category: "Accessories",
                type: null,
                created_at: "2024-07-31T08:45:33.000000Z",
                updated_at: "2024-07-31T08:51:39.000000Z",
            },
            images: {
                data: [
                    {
                        id: 2,
                        product_id: 4,
                        image_path:
                            "/storage/Photos/Product_Photos/Lamps_851.png",
                    },
                ],
            },
            buying_quantity: "3",
        },
        {
            product: {
                id: 3,
                product_name: "Shell Cahndelier",
                rating: 0,
                sold: 0,
                quantity: 12,
                price: 450,
                description: "this is created by the alaminians by hands",
                is_verified: 1,
                category: "Shells",
                type: null,
                created_at: "2024-07-31T08:38:52.000000Z",
                updated_at: "2024-07-31T08:51:37.000000Z",
            },
            images: {
                data: [
                    {
                        id: 1,
                        product_id: 3,
                        image_path:
                            "/storage/Photos/Product_Photos/Shell Cahndelier_304.png",
                    },
                ],
            },
            buying_quantity: "4",
        },
    ];
    const totalItems = dummy.reduce(
        (acc, item) => acc + parseInt(item.buying_quantity),
        0
    );

    const totalPrice = dummy.reduce(
        (acc, item) => acc + item.product.price * item.buying_quantity,
        0
    );
    const { data, setData, errors, post, processing } = useForm({
        name: name,
        address: address,
        phone_no: phone_no,
        total: totalPrice,
        payment_method: "cod",
        items: dummy.map((item) => ({
            product_id: item.id,
            quantity: item.buying_quantity,
            price: item.product.price,
            shop_name: "for retrieval",
            product_name: item.product.product_name,
            category: item.product.category,
        })),
    });

    // const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            payment_method: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted with data:", data);
        post(route("checkout.store", data), {
            onSuccess: () => {
                toast.success("chekout complete");
            },
            onError: () => [toast.error("ERROR in submitting")],
        });
    };
    console.log(dummy);

    return (
        <UserAuthenticatedLayout user={auth}>
            <Head title="Checkout" />
            <ToastContainer />
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
                            {name} | {phone_no}
                        </div>
                        <div className="text-gray-600">{address}</div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">
                        Product Details
                    </h2>
                    <div className="space-y-4 mt-4">
                        {/* list of checking out dummy */}

                        {dummy.map((item, index) => (
                            <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center bg-gray-50">
                                <div className="flex gap-3 items-center">
                                    <ModalImage
                                        className="w-24 h-24 object-cover"
                                        small={
                                            item.images.data.length == 0
                                                ? DefaultProductIcon
                                                : item.images.data[0].image_path
                                        }
                                        large={
                                            item.images.data.length == 0
                                                ? DefaultProductIcon
                                                : item.images.data[0].image_path
                                        }
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            {item.product.product_name}
                                        </p>
                                        <p className="text-gray-500">
                                            Shop: {item.product.shop_name}
                                        </p>
                                        <p className="text-gray-500">
                                            Category: {item.product.category}
                                        </p>
                                        <p className="text-gray-700">
                                            Price: Php{" " + item.product.price}
                                        </p>
                                        <p className="text-gray-500">
                                            Quantity: {item.buying_quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-800">
                                    Php
                                    {" " +
                                        new Intl.NumberFormat().format(
                                            item.product.price *
                                                item.buying_quantity
                                        )}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 text-gray-800">
                        Order Summary
                    </h2>
                    <div className="flex justify-between font-semibold mt-2 text-gray-700">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 text-gray-700">
                        <span>Total Price:</span>
                        <span>
                            Php
                            {" " + new Intl.NumberFormat().format(totalPrice)}
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
                                onChange={handleChange}
                                className="mr-1"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment_option"
                                value="gcash"
                                checked={data.payment_method === "gcash"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            GCash
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        {processing ? (
                            <div>
                                Placing Order <SpinnerLoading />
                            </div>
                        ) : (
                            "Place Order"
                        )}
                    </button>
                </form>
            </div>
        </UserAuthenticatedLayout>
    );
}

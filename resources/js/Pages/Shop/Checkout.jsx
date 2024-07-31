import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";
import ModalImage from "react-modal-image";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";

export default function Checkout({ auth }) {
    const { quantity, products } = usePage().props;
    console.log(products);

    const { data, setData, processing, errors } = useForm({
        payment_method: "cod",
    });

    // const total = items.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0
    // );
    const handleChange = (e) => {
        setData({
            ...data,
            payment_method: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", data);
    };

    const dummy = [
        {
            product: {
                id: 10,
                product_name: "Another test with 1 ome pic",
                rating: 0,
                sold: 0,
                quantity: 675,
                price: 477,
                description: "this that it has 1 pic only",
                is_verified: 1,
                category_id: 15,
                type: "15",
                created_at: "2024-07-25T15:15:25.000000Z",
                updated_at: "2024-07-28T05:13:01.000000Z",
            },
            images: {
                data: [
                    {
                        id: 7,
                        product_id: 10,
                        image_path:
                            "/storage/Photos/Product_Photos/Another test with 1 ome pic_654.jpg",
                    },
                ],
            },
            buying_quantity: "4",
        },
        {
            product: {
                id: 19,
                product_name: "nemo aut sunt",
                rating: 3.7,
                sold: 7,
                quantity: 76,
                price: 787,
                description: "Voluptatem qui praesentium itaque magnam aut.",
                is_verified: 0,
                category_id: 1,
                type: "digital",
                created_at: "2024-07-28T09:39:27.000000Z",
                updated_at: "2024-07-28T09:39:27.000000Z",
            },
            images: {
                data: [],
            },
            buying_quantity: "3",
        },
    ];
    const totalItems = products.reduce(
        (acc, item) => acc + parseInt(item.buying_quantity),
        0
    );

    const totalPrice = products.reduce(
        (acc, item) => acc + item.product.price * item.buying_quantity,
        0
    );
    console.log(dummy);
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
                        {/* list of checking out products */}

                        {products.map((item, index) => (
                            <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center bg-gray-50">
                                <div className="flex gap-3 items-center">
                                    <ModalImage
                                        className="w-24 h-24 object-cover"
                                        small={
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
                        Place Order
                    </button>
                </form>
            </div>
        </UserAuthenticatedLayout>
    );
}

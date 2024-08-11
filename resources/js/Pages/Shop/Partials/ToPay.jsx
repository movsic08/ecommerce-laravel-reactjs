import { Link } from "@inertiajs/react";
import { FaPhone, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import ModalImage from "react-modal-image";
export default function ToPay({ toPay }) {
    console.log(toPay[2].order_id);
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">To Pay</h2>
                {toPay.map((bulk) => {
                    return bulk.items.map((product) => (
                        <div className="bg-slate-50 shadow rounded-lg p-1 mb-6">
                            <Link
                                key={product.id}
                                href={route(
                                    "order.details",
                                    product.item_order_id
                                )}
                                className="p-4 border flex w-full gap-2 flex-col lg:flex-row lg:items-center items-start lg:justify-between  rounded-lg bg-white "
                            >
                                <div className=" flex flex-row gap-3  items-center">
                                    <ModalImage
                                        className="w-24 h-24 object-cover"
                                        // small={
                                        //     item.images.data.length == 0
                                        //         ? DefaultProductIcon
                                        //         : item.images.data[0].image_path
                                        // }
                                        // large={
                                        //     item.images.data.length == 0
                                        //         ? DefaultProductIcon
                                        //         : item.images.data[0].image_path
                                        // }
                                    />
                                    <div>
                                        <p className="text-gray-700">
                                            Product Name: {product.product_name}
                                        </p>
                                        <p className="text-gray-700">
                                            Category: {product.category}
                                        </p>
                                        <p className="text-gray-700">
                                            Price:{" " + product.price}
                                        </p>
                                        <p className="text-gray-700">
                                            Quantity: {product.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex gap-2 ">
                                    <h1>Order Total:</h1>
                                    <p className=" text-themeColor">
                                        ₱{" "}
                                        {new Intl.NumberFormat().format(
                                            product.quantity * product.price
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ));
                })}
            </div>
        </>
    );
}

import Checkbox from "@/Components/Checkbox";
import Quantity from "@/Components/Quantity";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import defaultImgIcon from "../../assets/img/Default-Product-Placeholder.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Cart({ auth }) {
    const { props } = usePage();
    const [items, setItems] = useState(props.cartsItem);
    const [checkedItems, setCheckedItems] = useState([]);

    const [totalAmount, setTotalAmount] = useState(0);

    const handleCheckout = () => {
        const selectedItems = items.filter((item) =>
            checkedItems.includes(item.id)
        );
        const checkoutData = selectedItems.map((item) => ({
            product_id: item.product.id,
            item_quantity: item.quantity,
            cart_id: item.id,
        }));

        router.get(route("checkout.show", { items: checkoutData }));
        // router.post(router("checkout.show"), { items: checkoutData });
    };

    const handleCheckboxChange = (itemId, isChecked) => {
        if (isChecked) {
            setCheckedItems((prevCheckedItems) => [
                ...prevCheckedItems,
                itemId,
            ]);
        } else {
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.filter((id) => id !== itemId)
            );
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            return items
                .filter((item) => checkedItems.includes(item.id))
                .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                )
                .toFixed(2);
        };

        setTotalAmount(calculateTotalAmount());
    }, [items, checkedItems]);

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`/cart/${id}`);

            if (response.status === 200) {
                toast.success("Item deleted successfully");
                setItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                );
                setCheckedItems((prevCheckedItems) =>
                    prevCheckedItems.filter((itemId) => itemId !== id)
                );
            } else {
                toast.error("Failed to delete item");
            }
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    return (
        <>
            <UserAuthenticatedLayout
                user={auth.user}
                cartNumber={auth.cartCount}
            >
                <ToastContainer />
                <Head title="Cart" />
                <div className="py-12 h-full -z-30">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 -z-30">
                        {props.cartsItem == 0 ? (
                            <div className="container mx-auto p-4 bg-slate-50 -z-50 rounded-lg drop-shadow-md">
                                Cart is empty.
                            </div>
                        ) : (
                            <div className="container mx-auto p-4 bg-slate-50 -z-50 rounded-lg shadow-md ">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center -z-50 justify-between p-4 border-b border-gray-200"
                                    >
                                        <div className="flex items-center">
                                            <Checkbox
                                                className=" mr-6"
                                                checked={checkedItems.includes(
                                                    item.id
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        item.id,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <img
                                                src={
                                                    item.product.img_path ??
                                                    defaultImgIcon
                                                }
                                                alt={item.product.product_name}
                                                className="w-16 h-16 mr-4"
                                            />

                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-semibold">
                                                    {item.product.product_name}
                                                </h2>
                                                <small>
                                                    Stock:{" "}
                                                    {item.product.quantity}
                                                </small>
                                                <small>
                                                    Price: {item.product.price}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-6">
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <Quantity
                                                        onQuantityChange={(
                                                            newQuantity
                                                        ) =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                newQuantity
                                                            )
                                                        }
                                                        quantity={item.quantity}
                                                        currentStock={
                                                            item.product
                                                                .quantity
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-lg mr-4 font-semibold whitespace-wrap">
                                                ₱{" "}
                                                {new Intl.NumberFormat().format(
                                                    item.product.price *
                                                        item.quantity
                                                )}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteItem(item.id)
                                                }
                                                className="text-lg  text-red-600 font-semibold"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className=" mt-4 px-4 flex w-full items-center justify-between  font-semibold">
                                    <p className="  text-lg">
                                        Total Amount{" "}
                                        <span className=" text-themeColor">
                                            ₱{" "}
                                            {new Intl.NumberFormat().format(
                                                totalAmount
                                            )}
                                        </span>
                                    </p>
                                    <button
                                        disabled={checkedItems == 0}
                                        className={`bg-themeColor ${
                                            checkedItems == 0
                                                ? ""
                                                : "duration-300 ease-in-out hover:bg-orange-500"
                                        } py-2 px-3 text-white rounded-lg`}
                                        onClick={handleCheckout}
                                    >
                                        Checkout ({checkedItems.length})
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

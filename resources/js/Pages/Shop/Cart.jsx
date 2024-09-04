import Checkbox from "@/Components/Checkbox";
import Quantity from "@/Components/Quantity";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import defaultImgIcon from "../../assets/img/Default-Product-Placeholder.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ auth }) {
    const { list, flash } = usePage().props;
    const [cartsItem, setCartsItem] = useState(list.data);
    const [checkedItems, setCheckedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCheckout = () => {
        const selectedItems = cartsItem.filter((item) =>
            checkedItems.includes(item.id)
        );
        const checkoutData = selectedItems.map((item) => ({
            product_id: item.product.id,
            item_quantity: item.quantity,
            cart_id: item.id,
        }));

        router.get(route("checkout.show", { items: checkoutData }));
    };

    const handleCheckboxChange = (itemId, isChecked) => {
        setCheckedItems((prevCheckedItems) =>
            isChecked
                ? [...prevCheckedItems, itemId]
                : prevCheckedItems.filter((id) => id !== itemId)
        );
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        // Update quantity and recalculate total amount
        setCartsItem((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            return cartsItem
                .filter((item) => checkedItems.includes(item.id))
                .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                )
                .toFixed(2);
        };

        setTotalAmount(calculateTotalAmount());
    }, [cartsItem, checkedItems]);

    const { processing, delete: deleteItemForm } = useForm({});

    const deleteItem = (e, id) => {
        e.preventDefault();
        deleteItemForm(route("cart.item.destroy", id), {
            method: "delete",
        });
    };

    useEffect(() => {
        if (flash?.status === "success") {
            toast.success(flash.message);
        } else if (flash?.status === "error") {
            toast.error(flash.message);
        }
    }, [flash]);

    return (
        <>
            <UserAuthenticatedLayout
                user={auth.user}
                cartNumber={auth.cartCount}
            >
                <ToastContainer />
                <Head title="Cart" />
                <div className="py-12 h-full">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {cartsItem.length === 0 ? (
                            <div className="container mx-auto p-4 bg-slate-50 rounded-lg drop-shadow-md">
                                Cart is empty.
                            </div>
                        ) : (
                            <div className="container mx-auto p-4 bg-slate-50 rounded-lg shadow-md">
                                {cartsItem.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4 w-full border-b border-gray-200"
                                    >
                                        <div className="flex items-center w-full">
                                            <Checkbox
                                                className="mr-6"
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

                                            <div className="flex w-full flex-col lg:flex-row gap-3 lg:items-center justify-between lg:justify-start">
                                                <div className="flex gap-1 items-center lg:justify-start max-w-[57.5rem] lg:min-w-[40.5rem]">
                                                    <img
                                                        src={
                                                            item.product
                                                                .images[0]
                                                                ?.image_path ??
                                                            defaultImgIcon
                                                        }
                                                        alt={
                                                            item.product
                                                                .product_name
                                                        }
                                                        className="w-16 h-16 mr-4"
                                                    />

                                                    <div className="flex flex-col">
                                                        <h2 className="text-lg font-semibold">
                                                            {
                                                                item.product
                                                                    .product_name
                                                            }
                                                        </h2>
                                                        <small>
                                                            Stock:{" "}
                                                            {
                                                                item.product
                                                                    .quantity
                                                            }
                                                        </small>
                                                        <small>
                                                            Price:{" "}
                                                            {item.product.price}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between w-full gap-2">
                                                    <div className="mt-1 mr-6 relative rounded-md shadow-sm">
                                                        <Quantity
                                                            onQuantityChange={(
                                                                newQuantity
                                                            ) =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    newQuantity
                                                                )
                                                            }
                                                            quantity={
                                                                item.quantity
                                                            }
                                                            currentStock={
                                                                item.product
                                                                    .quantity
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <p className="text-lg mr-4 font-semibold">
                                                            ₱{" "}
                                                            {new Intl.NumberFormat().format(
                                                                item.product
                                                                    .price *
                                                                    item.quantity
                                                            )}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                deleteItem(
                                                                    e,
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-lg text-red-600 font-semibold"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 px-4 flex w-full items-center justify-between font-semibold">
                                    <p className="text-lg">
                                        Total Amount{" "}
                                        <span className="text-themeColor">
                                            ₱{" "}
                                            {new Intl.NumberFormat().format(
                                                totalAmount
                                            )}
                                        </span>
                                    </p>
                                    <button
                                        disabled={
                                            checkedItems.length === 0 ||
                                            processing
                                        }
                                        className={`bg-themeColor ${
                                            checkedItems.length === 0
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

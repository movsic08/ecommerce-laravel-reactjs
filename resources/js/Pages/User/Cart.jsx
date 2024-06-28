import Checkbox from "@/Components/Checkbox";
import Quantity from "@/Components/Quantity";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import defaultImgIcon from "../../assets/img/Image-Placeholder.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ auth }) {
    const { props } = usePage();
    // console.log(props.cartsItem);
    const [checkedItems, setCheckedItems] = useState([]);
    // console.log(checkedItems);

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
    const calculateTotalAmount = () => {
        return items
            .filter((item) => checkedItems.includes(item.id))
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const calculateTotalChecked = () => {
        return checkedItems.length; // Count the number of checked items
    };

    const { setData } = useForm();
    const items = props.cartsItem;
    const handleQuantityChange = (newQuantity) => {
        setData("quantity", newQuantity);
    };

    const deleteItem = async (id) => {
        try {
            await Inertia.delete(`/cart/${id}`, {
                onSuccess: () => {
                    toast.success("Item removed successfully!");
                    // Optionally, update the state to reflect the deletion
                    // For example, you might want to fetch the updated cart items
                    // or remove the item from the local state
                    // setCheckedItems((prevCheckedItems) =>
                    //     prevCheckedItems.filter((itemId) => itemId !== id)
                    // );
                },
                onError: () => {
                    toast.error("Something went wrong, try again!");
                },
            });
        } catch (error) {
            toast.error("Failed to remove from cart.");
        }
    };

    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Cart" />
                <div className="py-12  h-full ">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {props.cartsItem == null ? (
                            <div className="container mx-auto p-4 bg-slate-50 rounded-lg drop-shadow-md">
                                Cart is empty.
                            </div>
                        ) : (
                            <div className="container mx-auto p-4 bg-slate-50 rounded-lg drop-shadow-md">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4 border-b border-gray-200"
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

                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    {item.product.product_name}
                                                </h2>
                                                <small>
                                                    Stock:{" "}
                                                    {item.product.quantity}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-6">
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <Quantity
                                                        onQuantityChange={
                                                            handleQuantityChange
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
                                                {item.product.price.toFixed(2)}
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
                                            ₱ {calculateTotalAmount()}
                                        </span>
                                    </p>
                                    <button className=" bg-themeColor py-2 px-3 text-white rounded-lg">
                                        Checkout ({calculateTotalChecked()})
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

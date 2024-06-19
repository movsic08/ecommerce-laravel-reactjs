import Checkbox from "@/Components/Checkbox";
import Quantity from "@/Components/Quantity";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Cart({ auth }) {
    const [checkedItems, setCheckedItems] = useState([]);
    console.log(checkedItems);

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

    const items = [
        {
            id: 1,
            name: "Wood Car",
            image: "https://my-test-11.slatic.net/p/7baf0d1de165ee94a44efc319a5798ea.jpg",
            quantity: 1,
            price: 230.0,
        },
        {
            id: 2,
            name: "Shell Chandeliers",
            image: "https://m.media-amazon.com/images/I/31fEusvQBML._AC_SY580_.jpg",
            quantity: 4,
            price: 230.0,
        },
    ];

    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Cart" />
                <div className="py-12  h-full ">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 mr-4"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {item.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-6">
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                {/* <input
                                                    type="number"
                                                    className="text-center w-12 border-gray-300 rounded-md"
                                                    defaultValue={item.quantity}
                                                    min="1"
                                                /> */}
                                                <Quantity
                                                    quantity={item.quantity}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-lg mr-4 font-semibold">
                                            ₱ {item.price.toFixed(2)}
                                        </div>
                                        <div className="text-lg  text-red-600 font-semibold">
                                            <FaTrash />
                                        </div>
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
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

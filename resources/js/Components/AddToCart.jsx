import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Quantity from "./Quantity";

export default function AddToCart({
    isOpen,
    onClose,
    name,
    stock,
    price,
    itemImage,
    rating,
    itemId,
}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, onClose]);

    const closeModal = () => {
        setIsVisible(false);
        onClose();
    };

    const [userQuantity, setUserQuantity] = useState(0);

    return (
        <>
            {isVisible && (
                <div
                    className={`fixed inset-0 flex items-center backdrop-blur-md justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity ${
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add to cart</h2>
                        <div className=" flex gap-2">
                            <img
                                src={itemImage}
                                alt="Sample Image"
                                className="rounded-md h-[12rem] w-[12rem]  cursor-pointer object-cover"
                            />
                            <div className=" grow px-3">
                                <h1 className=" text-slate-800 font-bold text-xl">
                                    {name}
                                </h1>
                                <StarRating rating={rating} />
                                <p>
                                    Stocks: <span>{stock}</span>
                                </p>
                                <Quantity
                                    quantity={userQuantity}
                                    currentStock={stock}
                                />
                                <p className=" text-2xl mt-1">
                                    Price:
                                    <span> Php {price}</span>
                                </p>
                            </div>
                        </div>
                        <div className=" w-full items-center flex mt-2 justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 mr-2 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Close
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

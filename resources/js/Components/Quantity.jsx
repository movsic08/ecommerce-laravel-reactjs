import { useState, React } from "react";

export default function Quantity({ quantity }) {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleAdd = () => {
        setCurrentQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleSubtract = () => {
        setCurrentQuantity((prevQuantity) =>
            prevQuantity > 0 ? prevQuantity - 1 : 0
        );
    };

    return (
        <>
            <strong className="text-lg">Quantity:</strong>
            <div className="flex items-center text-white ">
                <button
                    className="bg-thirdColor rounded-l-xl font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={handleSubtract}
                >
                    -
                </button>
                <span className="text-lg bg-thirdColor py-1 mx-1 px-4 font-semibold">
                    {currentQuantity}
                </span>
                <button
                    className="bg-thirdColor rounded-r-xl font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
        </>
    );
}

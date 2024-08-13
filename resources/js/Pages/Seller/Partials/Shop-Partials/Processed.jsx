import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { VscPackage } from "react-icons/vsc";

export default function Processed({ processedData }) {
    const { data, setData, processing, errors, patch } = useForm({
        itemId: "",
    });

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("activeTab") || "incomingOrders";
        setActiveTab(category);
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeTab", tabId);
        window.history.pushState({}, "", url);
    };
    // const submitProcessItem = (e) => {
    //     e.preventDefault();
    //     patch(router("seller.order.process"));
    //     router.patch("seller.order.process");
    // };
    const tabs = [
        { id: "processed", label: "Processed", icon: "<FaShippingFast />" },
        { id: "toReceive", label: "To Receive", icon: "<FaBoxOpen />" },
        { id: "delivered", label: "Delivered", icon: "<LuPackageCheck />" },
        { id: "cancelled", label: "Cancelled", icon: "<TbBasketCancel />" },
    ];

    return (
        <>
            <div className="mb-6">
                <ul className="flex justify-around border-b overflow-y-auto">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            className={`cursor-pointer p-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
                                activeTab === tab.id
                                    ? "border-b-2 border-themeColor text-themeColor"
                                    : "hover:text-themeColor"
                            }`}
                            onClick={() => handleTabChange(tab.id)}
                        >
                            {tab.icon}
                            <span className="whitespace-nowrap">
                                {tab.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedData.length == 0 ? (
                    <div className="flex flex-col items-center col-span-3 justify-center h-full text-center py-10">
                        <VscPackage size={80} className="text-themeColor" />
                        <h2 className="text-lg font-semibold text-gray-700">
                            No Pending Orders
                        </h2>
                        <p className="text-gray-500 mt-2">
                            You have no orders waiting to be processed.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    processedData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-slate-300 p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={
                                        item.images == null ||
                                        item.images.length == 0
                                            ? DefaultProductIcon
                                            : item.images[0].image_path
                                    }
                                    alt={item.product_name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.product_name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: Php{" "}
                                        {new Intl.NumberFormat().format(
                                            item.amount
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 text-slate-800">
                                <h4 className="font-semibold">Buyer:</h4>
                                <p>{item.buyer_data.name}</p>
                                <p>{item.buyer_data.address}</p>
                                <p>{item.buyer_data.phone_no}</p>
                                <div>
                                    <strong className="">Payment: </strong>
                                    <span className="uppercase">
                                        {" "}
                                        {item.buyer_data.payment_option}
                                    </span>{" "}
                                </div>
                                <p>
                                    {new Date(
                                        item.buyer_data.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-800 duration-200 ease-out text-white p-2 rounded-lg">
                                Process Order
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default function ToReceive({ ToReceiveData }) {
    return (
        <>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ToReceiveData.length == 0 ? (
                    <div>No Data</div>
                ) : (
                    ToReceiveData.map((item) => (
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

                            <button className="w-full bg-blue-600 text-white p-2 rounded-lg">
                                Process Order
                            </button>
                        </div>
                    ))
                )}
            </div> */}
        </>
    );
}

import StarRating from "@/Components/StarRating";
import { Link } from "@inertiajs/react";

export default function Items() {
    const products = {
        data: [
            {
                id: 1,
                product_name: "Product 1",
                price: 1500.0,
                quantity: 10,
                rating: 4.5,
                images: [
                    {
                        image_path: "https://via.placeholder.com/150",
                    },
                ],
            },
            {
                id: 2,
                product_name: "Product 2",
                price: 2500.0,
                quantity: 5,
                rating: 4.0,
                images: [
                    {
                        image_path: "https://via.placeholder.com/150",
                    },
                ],
            },
            {
                id: 3,
                product_name: "Product 3",
                price: 3500.0,
                quantity: 8,
                rating: 5.0,
                images: [
                    {
                        image_path: "https://via.placeholder.com/150",
                    },
                ],
            },
            {
                id: 4,
                product_name: "Product 4",
                price: 1200.0,
                quantity: 2,
                rating: 3.5,
                images: [
                    {
                        image_path: "https://via.placeholder.com/150",
                    },
                ],
            },
            {
                id: 5,
                product_name: "Product 5",
                price: 4500.0,
                quantity: 7,
                rating: 4.2,
                images: [
                    {
                        image_path: "https://via.placeholder.com/150",
                    },
                ],
            },
        ],
    };

    const layout = "grid"; // For demonstration purposes, set the layout to "grid"

    return (
        <>
            <div
                className={`grid ${
                    layout === "grid"
                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-1"
                } gap-5 mt-3 md:mt-6`}
            >
                {products.data.map((product) => (
                    <Link
                        key={product.id}
                        href="#"
                        className={`bg-gray-100 duration-700 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${
                            layout == "grid" ? "flex-col" : "flex-row h-[10rem]"
                        }`}
                    >
                        <div
                            className={` ${
                                layout == "grid"
                                    ? "pt-[100%] w-full"
                                    : "w-[10rem] h-full"
                            } relative`}
                        >
                            <img
                                src={
                                    product.images == null
                                        ? "https://via.placeholder.com/150"
                                        : product.images[0].image_path
                                }
                                alt={product.product_name + " Image"}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 text-center flex flex-col w-full h-full justify-between">
                            <p className="line-clamp-2 overflow-hidden">
                                {product.product_name}
                            </p>
                            <div
                                className={`flex flex-col w-full ${
                                    layout == "grid"
                                        ? "items-center"
                                        : "items-start"
                                }`}
                            >
                                <StarRating rating={product.rating} />
                                <div className="flex items-center w-full justify-between">
                                    <p className="font-semibold">
                                        Php{" "}
                                        {new Intl.NumberFormat().format(
                                            product.price
                                        )}
                                    </p>
                                    <small>Stock: {product.quantity}</small>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

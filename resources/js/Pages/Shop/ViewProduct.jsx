import StarRating from "@/Components/StarRating";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaFacebookSquare, FaTwitter, FaPinterest } from "react-icons/fa";
import AddToCart from "@/Components/AddToCart";
import Quantity from "@/Components/Quantity";

export default function ViewProduct({ auth }) {
    const { product } = usePage().props;

    const [currentPhoto, setCurrentPhoto] = useState(
        product.images[0].image_path
    );
    const changePhoto = (src) => {
        setCurrentPhoto(src);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [buyingQuantity, setBuyingQuantity] = useState(1);
    const handleQuantityChange = (newQuantity) => {
        setBuyingQuantity(newQuantity);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleBuyNow = (id) => {
        const item = {
            product_id: id,
            item_quantity: buyingQuantity,
        };
        console.log(item);
        router.post(route("checkout.show", { items: [item] }));
    };

    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title={product.product_name} />

                {/* Modal */}
                <AddToCart
                    isOpen={modalOpen}
                    onClose={toggleModal}
                    itemImage={product.images[0].image_path}
                    price={product.price}
                    stock={product.quantity}
                    product_id={product.id}
                    name={product.product_name}
                    rating={product.rating}
                />

                <div className="py-2 md:py-12 bg-slate-50 min-h-screen">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="container mx-auto p-4">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full lg:w-[40%]">
                                    <div className="p-3 rounded-md bg-slate-200">
                                        <div className="aspect-w-1 aspect-h-1 w-full">
                                            <img
                                                src={currentPhoto}
                                                alt={`${product.product_name} Image`}
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2 overflow-x-auto">
                                        {product.images.map((image) => (
                                            <img
                                                onClick={() =>
                                                    changePhoto(
                                                        image.image_path
                                                    )
                                                }
                                                src={image.image_path}
                                                alt="Sample Image"
                                                className={`rounded-md h-20 w-20 ${
                                                    currentPhoto ==
                                                    image.image_path
                                                        ? "bg-secondaryColor"
                                                        : "cursor-pointer"
                                                }  object-cover p-2 `}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full md:w-[60%] px-4 md:px-10 mt-4 md:mt-0">
                                    <h1 className="text-3xl font-semibold">
                                        {product.product_name}
                                    </h1>
                                    <p className="mt-2 text-2xl text-green-600">
                                        Php {product.price}
                                    </p>
                                    <StarRating rating={product.rating} />
                                    <p className="text-lg mt-2 text-gray-700">
                                        {product.description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="font-semibold">
                                            Stocks:
                                        </span>{" "}
                                        {product.quantity}
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Sold:
                                        </span>{" "}
                                        {product.sold}
                                    </div>
                                    <div className="flex gap-2 items-center mt-4">
                                        <button
                                            onClick={toggleModal}
                                            className="text-white px-4 py-2 rounded-md bg-secondaryColor hover:bg-secondaryColor-dark transition duration-200"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div className="">
                                        <Quantity
                                            currentStock={product.quantity}
                                            quantity={1}
                                            onQuantityChange={
                                                handleQuantityChange
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleBuyNow(
                                                    product.id,
                                                    product.product_name,
                                                    product.price,
                                                    1
                                                )
                                            }
                                            disabled={product.quantity === 0}
                                            className="text-white bg-thirdColor hover:bg-thirdColor-dark font-medium rounded-md px-4 py-2 mt-4 transition duration-200 disabled:opacity-50"
                                        >
                                            Buy It Now
                                        </button>
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <small>Share</small>
                                        <div className="flex gap-2 items-center">
                                            <FaFacebookSquare
                                                size={30}
                                                className="text-blue-600"
                                            />
                                            <FaTwitter
                                                size={30}
                                                className="text-blue-400"
                                            />
                                            <FaPinterest
                                                size={30}
                                                className="text-red-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

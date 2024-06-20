import StarRating from "@/Components/StarRating";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { GoHeart } from "react-icons/go";
import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Quantity from "@/Components/Quantity";
import AddToCart from "@/Components/AddToCart";

export default function ViewProduct({ auth }) {
    const { product } = usePage().props;

    //photo carnival
    const [currentPhoto, setCurrentPhoto] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
    );
    const changePhoto = (src) => {
        setCurrentPhoto(src);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title={product.product_name} />

                {/* Modal */}
                <AddToCart
                    isOpen={modalOpen}
                    onClose={toggleModal}
                    itemImage={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                    }
                    price={product.price}
                    stock={product.quantity}
                    name={product.product_name}
                    rating={product.rating}
                />
                <div className="py-12 bg-slate-50 h-full ">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="container mx-auto p-4">
                            <div className="flex  flex-col w-full md:flex-row">
                                <div className="w-[40%] h-full ">
                                    <div className=" p-3 rounded-md bg-slate-200">
                                        <img
                                            src={currentPhoto}
                                            alt={product.product_name + "Image"}
                                            className="rounded-md h-[25rem] w-full object-cover"
                                        />
                                    </div>
                                    <div className=" flex gap-2 mt-2">
                                        <img
                                            onClick={() => {
                                                changePhoto(
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                                                );
                                            }}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                                            alt="Sample Image"
                                            className="rounded-md h-[7rem] w-[7rem]  cursor-pointer object-cover p-2  bg-secondaryColor"
                                        />
                                        <img
                                            onClick={() => {
                                                changePhoto(
                                                    "https://p.globalsources.com/IMAGES/PDT/B1186575162/lady-handbag.jpg"
                                                );
                                            }}
                                            src="https://p.globalsources.com/IMAGES/PDT/B1186575162/lady-handbag.jpg"
                                            alt="Sample Image"
                                            className="rounded-md h-[7rem] w-[7rem]  cursor-pointer object-cover"
                                        />
                                        <img
                                            onClick={() => {
                                                changePhoto(
                                                    "https://m.media-amazon.com/images/I/31fEusvQBML._AC_SY580_.jpg"
                                                );
                                            }}
                                            src="https://m.media-amazon.com/images/I/31fEusvQBML._AC_SY580_.jpg"
                                            alt="Sample Image"
                                            className="rounded-md h-[7rem] w-[7rem]  cursor-pointer object-cover"
                                        />
                                        <img
                                            onClick={() => {
                                                changePhoto(
                                                    "https://my-test-11.slatic.net/p/7baf0d1de165ee94a44efc319a5798ea.jpg"
                                                );
                                            }}
                                            src="https://my-test-11.slatic.net/p/7baf0d1de165ee94a44efc319a5798ea.jpg"
                                            alt="Sample Image"
                                            className="rounded-md h-[7rem] w-[7rem]  cursor-pointer object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="px-10 w-[60%] ">
                                    <h1 className=" text-3xl">
                                        {product.product_name}
                                    </h1>
                                    <p className="mt-2 text-2xl">
                                        Php {product.price}
                                    </p>
                                    <StarRating rating={product.rating} />
                                    <p className=" text-lg mt-2">
                                        {product.description}
                                    </p>
                                    <div className=" mt-4">
                                        <Quantity quantity={product.quantity} />
                                    </div>
                                    <div className=" flex gap-2 items-center mt-4 ">
                                        <button
                                            onClick={toggleModal}
                                            className=" text-white px-2 py-1 rounded-md bg-secondaryColor "
                                        >
                                            Add to cart
                                        </button>
                                        <GoHeart size={30} />
                                    </div>
                                    <button className=" text-white bg-thirdColor font-medium rounded-md px-4 mt-4 py-2">
                                        Buy it now
                                    </button>
                                    <div className=" flex flex-col mt-4">
                                        <small>Share</small>
                                        <span className=" flex gap-2 items-center">
                                            <FaFacebookSquare size={30} />
                                            <FaTwitter size={30} />
                                            <FaPinterest size={30} />
                                        </span>
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

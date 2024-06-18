import StarRating from "@/Components/StarRating";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

export default function ViewProduct({ auth }) {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleSubtract = () => {
        setQuantity((prevQuantity) =>
            prevQuantity > 0 ? prevQuantity - 1 : 0
        );
    };

    //photo carnival
    const [currentPhoto, setCurrentPhoto] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
    );
    const changePhoto = (src) => {
        setCurrentPhoto(src);
    };

    return (
        <>
            <UserAuthenticatedLayout
                user={auth.user}
                // header={
                //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                //         Dashboard
                //     </h2>
                // }
            >
                <Head title="Product name" />
                <div className="py-12 bg-slate-50 h-full ">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="container mx-auto p-4">
                            <div className="flex  flex-col w-full md:flex-row">
                                <div className="w-[40%] h-full ">
                                    <div className=" p-3 rounded-md bg-slate-200">
                                        <img
                                            src={currentPhoto}
                                            alt="Sample Image"
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
                                        Nasa Cowrie Shell Chandelier
                                    </h1>
                                    <p className="mt-2 text-2xl">Php 300.00</p>
                                    <StarRating rating={4.5} />
                                    <p className=" text-lg mt-2">
                                        Nasa Cowrie Shell Chandelier (30") This
                                        beautiful hanging Chandelier is made of
                                        thousands of shells of 4 different
                                        species in the islands the money cowrie
                                        is a symbol of good luck that will bring
                                        you fortune. These baskets are a
                                        complement to any patio or garden and
                                        gives a illusion of being by the sea.
                                    </p>
                                    <div className=" mt-4">
                                        <strong className=" text-lg">
                                            Quantity:{" "}
                                        </strong>
                                        <div className="flex items-center text-white ">
                                            <button
                                                className=" bg-thirdColor rounded-l-xl  font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 "
                                                onClick={handleSubtract}
                                            >
                                                -
                                            </button>
                                            <span className="text-lg bg-thirdColor py-1 mx-1 px-4  font-semibold">
                                                {quantity}
                                            </span>
                                            <button
                                                className=" bg-thirdColor rounded-r-xl  font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 "
                                                onClick={handleAdd}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" flex gap-2 items-center mt-4 ">
                                        <button className=" text-white px-2 py-1 rounded-md bg-secondaryColor ">
                                            View cart
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

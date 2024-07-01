import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import shopImage from "../../assets/shop_page_asset.jpg";
import StarRating from "@/Components/StarRating";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { Link, Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect, React, useRef } from "react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { FaSearch } from "react-icons/fa";
import SelectInput from "@/Components/SelectInput";

export default function Shop({ auth, queryParams = null }) {
    const { products = [] } = usePage().props;
    queryParams = queryParams || {};

    const searchFieldProduct = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("shop"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key == "Enter") {
            searchFieldProduct(name, e.target.value);
        }
    };

    return (
        <UserAuthenticatedLayout user={auth.user}>
            <Head title="Shop" />
            <img
                className="  object-cover  h-36 w-full "
                src={shopImage}
                alt="Shop Page Asset"
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col md:flex-row h-screen">
                            <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 overflow-y-auto">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold text-lg mb-2">
                                        Categories
                                    </h2>
                                    <ul className=" text-mainText">
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Category 1
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Category 2
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Category 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold text-lg mb-2">
                                        Vendors
                                    </h2>
                                    <ul className=" text-mainText">
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Vendor 1
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Vendor 2
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Vendor 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold text-lg mb-2">
                                        Product Type
                                    </h2>
                                    <ul className=" text-mainText">
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Type 1
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Type 2
                                            </a>
                                        </li>
                                        <li className=" mb-1">
                                            <a
                                                href="#"
                                                className="  hover:underline"
                                            >
                                                Type 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="w-full md:w-2/3 lg:w-3/4 bg-white px-4 pb-4 ">
                                <div className="w-full flex items-center mb-3 gap-2">
                                    <span className=" font-bold">Search</span>{" "}
                                    <TextInput
                                        defaultValue={queryParams.name}
                                        onKeyPress={(e) => {
                                            onKeyPress("name", e);
                                        }}
                                        className="w-full "
                                        placeholder="Enter to search product..."
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className=" bg-secondaryColor text-white p-3 rounded-lg duration-300 hover:bg-orange-500"
                                    >
                                        <FaSearch />
                                    </button> */}
                                </div>

                                <div className=" flex w-full  justify-between items-center mb-2">
                                    <div className="  flex items-center gap-2">
                                        <BsGrid3X3GapFill size={30} />
                                        <TbListDetails size={30} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className="text-gray-500 whitespace-nowrap"
                                            onChange={(e) => {
                                                searchFieldProduct(
                                                    "filterProducts",
                                                    e.target.value
                                                );
                                            }}
                                        >
                                            Sort by:
                                        </span>

                                        <SelectInput
                                            className="w-full"
                                            defaultValue={
                                                queryParams.filterProducts
                                            }
                                            onChange={(e) =>
                                                searchFieldProduct(
                                                    "filterProducts",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option
                                                className="text-slate-900"
                                                value="product-posted"
                                            >
                                                Product Posted
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="top-selling"
                                            >
                                                Top Selling
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="highest-rating"
                                            >
                                                Highest Rating
                                            </option>
                                        </SelectInput>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 py-4 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                    {products.data.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "view-product",
                                                product.id
                                            )}
                                            className="bg-gray-100  duration-700 hover:bg-gray-200 ease-in-out hover:-top-2 drop-shadow-lg rounded relative overflow-hidden"
                                        >
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                                                alt={
                                                    product.product_name +
                                                    " Image"
                                                }
                                                className="mx-auto h-48 w-full object-cover"
                                            />
                                            <div className="p-4 text-center h-fit flex flex-col">
                                                <p className="line-clamp-2 h-[5vw] grow ">
                                                    {product.product_name}
                                                </p>
                                                <div className="flex  flex-none flex-col ">
                                                    <StarRating
                                                        rating={product.rating}
                                                    />
                                                    <p className="font-semibold">
                                                        Php {product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Pagination
                                    links={products.links}
                                    className="pb-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
}

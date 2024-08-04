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
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";

export default function Shop({ auth, queryParams = null }) {
    const { products = [], categories } = usePage().props;
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
                className="object-cover h-36 w-full"
                src={shopImage}
                alt="Shop Page Asset"
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 overflow-y-auto md:overflow-hidden">
                                <div className="mb-4">
                                    <h2 className="font-semibold text-lg mb-1">
                                        Categories
                                    </h2>
                                    <div className="flex md:block overflow-x-scroll md:overflow-x-hidden space-x-2 md:space-x-0 md:space-y-2">
                                        <ul className="flex md:flex-col gap-2 lg:gap-0 text-mainText">
                                            {categories.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className="mb-1 whitespace-nowrap hover:bg-themeColor duration-200 ease-in-out hover:text-slate-100 cursor-pointer p-2 lg:bg-gray-50 bg-gray-50 rounded-lg"
                                                >
                                                    <a href="#">
                                                        {category.category_name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-2/3 lg:w-3/4 bg-white px-4 pb-4">
                                <div className="w-full flex items-center mb-3 gap-2">
                                    <span className="font-bold">Search</span>
                                    <TextInput
                                        defaultValue={queryParams.name}
                                        onKeyPress={(e) => {
                                            onKeyPress("name", e);
                                        }}
                                        className="w-full"
                                        placeholder="Enter to search product..."
                                    />
                                </div>

                                <div className="flex w-full justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <BsGrid3X3GapFill size={30} />
                                        <TbListDetails size={30} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 whitespace-nowrap">
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
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 md:mt-6">
                                    {products.data.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "view-product",
                                                product.id
                                            )}
                                            className="bg-gray-100 duration-700 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg rounded relative overflow-hidden"
                                        >
                                            <div className="w-full pt-[100%] relative">
                                                <img
                                                    src={
                                                        product.images == null
                                                            ? DefaultProductIcon
                                                            : product.images[0]
                                                                  .image_path
                                                    }
                                                    alt={
                                                        product.product_name +
                                                        " Image"
                                                    }
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 text-center flex flex-col">
                                                <p className="line-clamp-2 overflow-hidden">
                                                    {product.product_name}
                                                </p>
                                                <div className="flex flex-col">
                                                    <StarRating
                                                        rating={product.rating}
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">
                                                            Php {product.price}
                                                        </p>
                                                        <small>
                                                            Stock:{" "}
                                                            {product.quantity}
                                                        </small>
                                                    </div>
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

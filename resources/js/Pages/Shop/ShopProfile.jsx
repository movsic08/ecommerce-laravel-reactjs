import React from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsGrid3X3GapFill, BsStarFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StarRating from "@/Components/StarRating";

const fakeShop = {
    name: "Shop Name",
    address: "1234 Shop St, City, Country",
    categories: ["Category 1", "Category 2", "Category 3"],
    products: [
        {
            id: 1,
            name: "Product 1",
            price: 100,
            rating: 4,
            image: null,
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            rating: 5,
            image: null,
        },
        {
            id: 3,
            name: "Product 3",
            price: 300,
            rating: 3,
            image: null,
        },
        // Add more fake products as needed
    ],
};

const ShopProfile = ({ auth }) => {
    return (
        <UserAuthenticatedLayout user={auth}>
            <Head title="Profile" />
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row mb-8 md:gap-2 lg:gap-6">
                    {/* Shop Profile Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0">
                        <div className="text-center mb-4">
                            <img
                                className="w-24 h-24 rounded-full mx-auto"
                                src={DefaultProductIcon}
                                alt="Shop Profile"
                            />
                            <h2 className="text-2xl font-semibold mt-2">
                                {fakeShop.name}
                            </h2>
                            <p className="text-gray-600 flex items-center justify-center mt-1">
                                <FaMapMarkerAlt className="mr-2" />
                                {fakeShop.address}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h2 className="font-semibold text-lg mb-1">
                                Categories
                            </h2>
                            <div className="flex md:block overflow-x-scroll md:overflow-x-hidden space-x-2 md:space-x-0 md:space-y-2">
                                <ul className="flex md:flex-col gap-2 lg:gap-0 text-mainText">
                                    {fakeShop.categories.map(
                                        (category, index) => (
                                            <li
                                                key={index}
                                                className="mb-1 whitespace-nowrap p-2 bg-gray-50 rounded-lg"
                                            >
                                                <a
                                                    href="#"
                                                    className="hover:underline"
                                                >
                                                    {category}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4 bg-white px-4 pb-4 rounded-lg shadow-md">
                        <div className="w-full flex items-center mb-3 gap-2">
                            <span className="font-bold">Search</span>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter to search product..."
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
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
                                <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="product-posted">
                                        Product Posted
                                    </option>
                                    <option value="top-selling">
                                        Top Selling
                                    </option>
                                    <option value="highest-rating">
                                        Highest Rating
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {fakeShop.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-100 duration-700 hover:bg-gray-200 ease-in-out hover:-top-2 drop-shadow-lg rounded relative overflow-hidden"
                                >
                                    <div className="w-full h-48 relative">
                                        <img
                                            src={
                                                product.image ||
                                                DefaultProductIcon
                                            }
                                            alt={product.name + " Image"}
                                            className="w-full h-full object-cover absolute"
                                        />
                                    </div>
                                    <div className="p-4 text-center h-fit flex flex-col">
                                        <p className="line-clamp-2 h-[5vw] grow">
                                            {product.name}
                                        </p>
                                        <div className="flex flex-none flex-col">
                                            <StarRating
                                                rating={product.rating}
                                            />
                                            <div className=" flex items-center justify-between">
                                                <p className="font-semibold">
                                                    Php {product.price}
                                                </p>
                                                <small>Stock: {20}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Add Pagination Component Here if Needed */}
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
};

export default ShopProfile;

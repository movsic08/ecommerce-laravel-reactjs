import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import shopImage from "../../assets/shop_page_asset.jpg";
import StarRating from "@/Components/StarRating";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { Link } from "@inertiajs/react";

export default function Shop({ auth }) {
    return (
        <UserAuthenticatedLayout
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
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

                            <div className="w-full md:w-2/3 lg:w-3/4 bg-white p-4 overflow-y-auto">
                                <div className=" flex w-full  justify-between items-center mb-2">
                                    <div className="  flex items-center gap-2">
                                        <BsGrid3X3GapFill size={30} />
                                        <TbListDetails size={30} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">
                                            Sort by:
                                        </span>
                                        <select
                                            className="appearance-none rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300 w-auto"
                                            defaultValue="trending"
                                        >
                                            <option value="trending">
                                                Trending
                                            </option>
                                            <option value="a-z">A-Z</option>
                                            <option value="new">New</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <Link
                                        href={route("view-product", 123)}
                                        className="bg-gray-100 drop-shadow-lg rounded relative overflow-hidden"
                                    >
                                        <a href="#">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                                                alt="Sample Image"
                                                className="mx-auto h-48 w-full object-cover"
                                            />
                                        </a>
                                        <div className="p-4 text-center">
                                            <p className="  line-clamp-2 ">
                                                Pullout Bags LV Pullout Bags LV
                                                Pullout Bags LV Pullout Bags LV
                                                Pullout Bags LV Pullout Bags LV
                                            </p>
                                            <StarRating rating={10} />
                                            <p className="font-semibold">
                                                Php 400.00
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
}

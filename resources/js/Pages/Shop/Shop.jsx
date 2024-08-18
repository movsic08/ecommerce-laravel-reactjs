import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import shopImage from "../../assets/shop_page_asset.jpg";
import StarRating from "@/Components/StarRating";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { Link, Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";

export default function Shop({ auth, queryParams = null }) {
    const { products = [], categories } = usePage().props;
    queryParams = queryParams || {};

    const [currentCategory, setCurrentCategory] = useState();
    const [layout, setLayout] = useState("grid"); // State for layout type

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        setCurrentCategory(category);
    }, []);

    const searchFieldProduct = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("shop"), queryParams);
    };

    const findByCategory = (category, value) => {
        setCurrentCategory(value);
        if (value && value !== "all") {
            queryParams[category] = value;
        } else {
            delete queryParams[category];
        }
        router.get(route("shop"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key == "Enter") {
            searchFieldProduct(name, e.target.value);
        }
    };

    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
    };

    console.log(products);
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
                                            <li
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    findByCategory(
                                                        "category",
                                                        "all"
                                                    );
                                                }}
                                                className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${
                                                    currentCategory == "all"
                                                        ? "bg-themeColor text-slate-100"
                                                        : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                                }`}
                                            >
                                                All
                                            </li>
                                            {categories.map((category) => (
                                                <li
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        findByCategory(
                                                            "category",
                                                            category.category_name
                                                        );
                                                    }}
                                                    key={category.id}
                                                    className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${
                                                        currentCategory ==
                                                        category.category_name
                                                            ? "bg-themeColor text-slate-100"
                                                            : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                                    }`}
                                                >
                                                    {category.category_name}
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
                                        <BsGrid3X3GapFill
                                            className={`cursor-pointer ${
                                                layout == "grid"
                                                    ? "text-themeColor"
                                                    : "text-slate-800"
                                            }`}
                                            size={30}
                                            onClick={toggleLayout}
                                        />
                                        <TbListDetails
                                            className={`cursor-pointer ${
                                                layout == "list"
                                                    ? "text-themeColor"
                                                    : "text-slate-800"
                                            }`}
                                            size={30}
                                            onClick={toggleLayout}
                                        />
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
                                                value="a-z"
                                            >
                                                A-Z
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="z-a"
                                            >
                                                Z-A
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
                                            href={route(
                                                "view-product",
                                                product.id
                                            )}
                                            className={`bg-gray-100 duration-700 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${
                                                layout == "grid"
                                                    ? "flex-col"
                                                    : "flex-row h-[10rem]"
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
                                                        product.images.length ==
                                                        0
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

                                                {/* Overlay for Out of Stock */}
                                                {product.quantity === 0 && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                        <span className="text-white text-lg font-semibold">
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}
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
                                                    <StarRating
                                                        rating={product.rating}
                                                    />
                                                    <div className="flex items-center w-full justify-between">
                                                        <p className="font-semibold">
                                                            Php{" "}
                                                            {new Intl.NumberFormat().format(
                                                                product.price
                                                            )}
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

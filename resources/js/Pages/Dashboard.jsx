import StarRating from "@/Components/StarRating";
import AuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import frame_1 from "../assets/img/Frame_1.png";
import { useState } from "react";
import { FaShop } from "react-icons/fa6";

export default function Dashboard({ auth }) {
    const { sellerData, sellerProducts } = usePage().props;
    console.log(sellerData, sellerProducts);
    const [layout, setLayout] = useState("grid"); // State for layout type
    return (
        <AuthenticatedLayout user={auth.user} cartNumber={auth.cartCount}>
            <Head title="Home" />
            {/* first page full*/}
            <div className="lg:-mt-[5rem] h-screen w-full overflow-hidden -z-20 flex items-center justify-center ">
                <div className=" absolute left-[2rem] md:left-[5rem] lg:left-[10rem]  flex items-center ">
                    <div className="flex-col text-4xl md:text-6xl lg:text-8xl flex text-[#403E3E]">
                        <h1>Shell </h1>
                        <h1> Chandeliers</h1>
                        <Link
                            href={route("shop")}
                            className="text-3xl mt-4 hover:bg-slate-800 duration-300 rounded-full px-3 capitalize font-bold py-2 bg-[#403E3E] w-fit text-white"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <img
                    className=" w-full h-full object-cover"
                    src={frame_1}
                    alt=""
                />
            </div>
            {/* 2nd page */}
            <div className="bg-white w-full h-full p-6 flex flex-col items-center ">
                <h1 className=" font-bold text-4xl py-8">
                    Artist of the Month
                </h1>
                <div className="flex-col md:flex-row flex items-start justify-center ">
                    <img
                        src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                        className=" rounded-full object-cover h-52 w-52"
                        alt=""
                    />
                    <div className=" ml-8">
                        <Link
                            href={route("shop.profile", sellerData.id)}
                            className="mt-4 flex items-center text-xl text-themeColor gap-1 font-bold "
                        >
                            <FaShop size={30} className="text-themeColor" />
                            {sellerData.shop_name}
                        </Link>

                        <table className="min-w-full overflow-hidden">
                            <tr className="text-left">
                                <td className=" font-bold pr-6 pt-2">Name</td>
                                <td className="pt-2 font-italic">
                                    {sellerData.user.first_name +
                                        " " +
                                        sellerData.user.last_name}
                                </td>
                            </tr>
                            <tr>
                                <td className=" font-bold pr-6 pt-2">
                                    Location
                                </td>
                                <td className="pt-2 font-italic">
                                    {sellerData.shop_address}
                                </td>
                            </tr>
                            <tr>
                                <td className=" font-bold pr-6 pt-2">Join</td>
                                <td className="pt-2 font-italic">
                                    {new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                    }).format(new Date(sellerData.created_at))}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 md:mt-6 grid max-w-5xl ">
                    {sellerProducts.data.map((product) => (
                        <Link
                            key={product.id}
                            href={route("view-product", product.id)}
                            className={`bg-gray-100 duration-300 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${
                                layout == "grid"
                                    ? "flex-col"
                                    : "flex-row h-[10rem]"
                            }`}
                        >
                            <div
                                className={` ${
                                    layout == "grid"
                                        ? "pt-[100%] w-full"
                                        : "w-[10rem] h-full aspect-1"
                                } relative`}
                            >
                                <img
                                    src={
                                        product.images.length == 0
                                            ? DefaultProductIcon
                                            : product.images[0].image_path
                                    }
                                    alt={product.product_name + " Image"}
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
            </div>
        </AuthenticatedLayout>
    );
}

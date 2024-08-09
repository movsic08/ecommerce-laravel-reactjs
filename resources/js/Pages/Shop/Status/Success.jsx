import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Items from "../Partials/Items";
import { IoBagCheckOutline } from "react-icons/io5";

export default function Success({ auth }) {
    const { orderId, products } = usePage().props;
    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title={orderId + ` Success`} />
                <div className="my-4 mx-auto max-w-5xl">
                    <div className="bg-slate-50 shadow-lg rounded-lg flex items-center justify-center flex-col p-8 w-full text-center">
                        <IoBagCheckOutline
                            size={50}
                            className="text-green-600"
                        />
                        <h1 className="text-2xl font-bold text-green-700 mb-2">
                            Purchase Successful!
                        </h1>
                        <p className="text-gray-500 mb-6">
                            Thank you for your purchase. Your order has been
                            successfully placed.
                        </p>
                        <div className="gap-4 flex flex-col lg:flex-row w-full items-center justify-center">
                            <Link href={route("shop")} className="block">
                                <button className="w-full bg-themeColor hover:bg-themeDark text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ">
                                    Shop
                                </button>
                            </Link>
                            <Link
                                href={route("user.myPurchases")}
                                className="block"
                            >
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                    My Purchases
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Items products={products} />
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

import AdminPagination from "@/Components/AdminPagination";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PermissionPanel({ auth }) {
    const { products, flash } = usePage().props;

    const [isVerified, setIsVerified] = useState("product.verified");
    const [isDeleting, setIsDeleting] = useState(null);

    const toggleVerification = () => {
        setIsVerified(!isVerified);
        // You can add a call to your API here to update the verification status in your backend.
    };

    useEffect(() => {
        if (flash.status == "error") {
            toast.error(flash.message);
        } else {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleDelete = (e, id, name) => {
        e.preventDefault();

        if (
            !window.confirm(
                "Are you sure you want to delete this seller named " +
                    name +
                    "?"
            )
        ) {
            return;
        }
        setIsDeleting(id);
        router.delete(route("admin.destroy.product", { id: id, name: name }), {
            onFinish: () => {
                setIsDeleting(null);
            },
            onError: () => {
                setIsDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin permission" />
                <ToastContainer />

                <h2
                    className=" text-center uppercase font-bold bg-header  p-4 rounded-lg
                "
                >
                    Permission List
                </h2>

                <div className="mt-3 flex flex-col gap-6">
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-slate-100 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? product.images[0].image_path
                                        : ""
                                }
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">
                                    {product.product_name}
                                </h2>
                                <p className="text-gray-500">
                                    Seller: {product.sellerName}
                                </p>
                                <p className="text-gray-500">
                                    Date Created: {product.created_at}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleVerification}
                                    className={`px-4 py-2 text-sm rounded ${
                                        product.is_verified
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-yellow-500 hover:bg-yellow-600"
                                    } text-white`}
                                >
                                    {product.is_verified
                                        ? "Mark as Unverified"
                                        : "Mark as Verified"}
                                </button>
                                <button
                                    onClick={(e) =>
                                        handleDelete(
                                            e,
                                            product.id,
                                            product.product_name
                                        )
                                    }
                                    disabled={isDeleting !== null}
                                    className={`px-4 py-2 text-sm bg-red-500  text-white rounded ${
                                        isDeleting !== null
                                            ? "cursor-wait"
                                            : "hover:bg-red-600 cursor-pointer"
                                    }`}
                                >
                                    {isDeleting === product.id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {products.links !== null ? (
                    ""
                ) : (
                    <div className=" mt-2 mb-6">
                        <AdminPagination links={products.links} />
                    </div>
                )}
            </AdminAuthenticatedLayout>
        </>
    );
}

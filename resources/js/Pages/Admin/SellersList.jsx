import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Index from "./Index";
import DefaultPicture from "../../assets/img/default_user_profile.png";
import { MdRemoveRedEye } from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";

export default function SellersList({ auth }) {
    const { users = [] } = usePage().props;

    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Sellers List" />
                <h2
                    className=" text-center uppercase font-bold bg-header  p-4 rounded-lg
                "
                >
                    Sellers list admin page
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Profile</th>
                                <th className="px-4 py-2">Seller Name</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Joined</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="text-center border-t"
                                >
                                    <td className="px-4 py-2">
                                        <img
                                            src={DefaultPicture}
                                            alt={user.first_name}
                                            className="w-12 h-12 rounded-full mx-auto"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">
                                        {user.address}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.created_at}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className=" p-2 text-white rounded bg-blue-800 hover:bg-blue-900 mr-2 duration-200 ease-in-out">
                                            <BsTrash2Fill />
                                        </button>
                                        <button className=" p-2 text-white rounded bg-red-800 hover:bg-red-900  duration-200 ease-in-out">
                                            <MdRemoveRedEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}

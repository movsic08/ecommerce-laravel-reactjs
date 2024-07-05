import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Index from "./Index";

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
                                            // src={seller.profile}
                                            // alt={seller.name}
                                            className="w-12 h-12 rounded-full mx-auto"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.first_name}
                                    </td>
                                    <td className="px-4 py-2">address</td>
                                    <td className="px-4 py-2">joined</td>
                                    <td className="px-4 py-2">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            action
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

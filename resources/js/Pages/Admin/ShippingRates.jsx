import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { HiPencilSquare } from "react-icons/hi2";
import { BsTrash2Fill } from "react-icons/bs";

export default function ShippingRates({ auth }) {
    const { shipping_data } = usePage().props;
    return <>
        <AdminAuthenticatedLayout user={auth}>
            <Head title="Shipping Rates" />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Weight
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                NCR
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Luzon
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Visayas
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Mindanao
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Island
                            </th>
                            <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shipping_data ?
                                shipping_data?.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`${(data.weight_min * 1000).toFixed(0)}g (${data.weight_min}kg) - ${(data.weight_max * 1000).toFixed(0)}g (${data.weight_max}kg)`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.ncr}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.luzon}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.visayas}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.mindanao}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.island}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">

                                            <button className="p-2 mr-1 text-white duration-200 ease-in-out bg-blue-800 rounded hover:bg-blue-900">
                                                <HiPencilSquare />
                                            </button>

                                            <button
                                                type="button"

                                                className="p-2 text-white duration-200 ease-in-out bg-red-800 rounded hover:bg-red-900"
                                            >
                                                <BsTrash2Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <div>Something went wrong. Server error.</div>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </AdminAuthenticatedLayout>
    </>
}

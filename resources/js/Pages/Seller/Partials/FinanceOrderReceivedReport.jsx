import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";

export default function FinanceOrderReceivedReport({ data }) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr className="text-sm">
                            <th className="w-1/5 py-2 px-4">Order Ref No.</th>
                            <th className="w-1/5 py-2 px-4">Product Name</th>
                            <th className="w-1/5 py-2 px-4">Release Date</th>
                            <th className="w-1/5 py-2 px-4">Payment Method</th>
                            <th className="w-1/5 py-2 px-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((list) => (
                            <tr
                                key={list.id}
                                className="border-b text-sm bg-gray-50"
                            >
                                <td className="py-2 px-4">
                                    {list.reference_number}
                                </td>
                                <td className="py-2 px-4">
                                    {list.product_name}
                                </td>
                                <td className="py-2 px-4">
                                    {formatDistanceToNow(
                                        new Date(list.created_at),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    {list.payment_method}
                                </td>
                                <td className="py-2 px-4">
                                    PHP{" "}
                                    {new Intl.NumberFormat().format(
                                        list.amount
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr className=" text-center ">
                            <td className=" pt-1.5">
                                <Link
                                    href={route("seller.order-receipt-report")}
                                    className="duration-200 ease-out hover:text-themeColor"
                                >
                                    View all order receipt list
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

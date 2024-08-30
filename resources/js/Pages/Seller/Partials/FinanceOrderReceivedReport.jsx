import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";

export default function FinanceOrderReceivedReport({ data }) {
    return (
        <>
            {data.map((list) => (
                <tr key={list.id} className="border-b text-sm bg-gray-50">
                    <td className="py-2 px-4">{list.reference_number}</td>
                    <td className="py-2 px-4">{list.product_name}</td>
                    <td className="py-2 px-4">
                        {formatDistanceToNow(new Date(list.created_at), {
                            addSuffix: true,
                        })}
                    </td>
                    <td className="py-2 px-4">{list.payment_method}</td>
                    <td className="py-2 px-4">
                        PHP {new Intl.NumberFormat().format(list.amount)}
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
        </>
    );
}

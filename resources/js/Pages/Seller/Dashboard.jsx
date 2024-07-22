import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    const data = [
        {
            name: "January",
            sales: 4000,
            amt: 2400,
        },
        {
            name: "February",
            sales: 3000,
            amt: 2210,
        },
        {
            name: "March",
            sales: 2000,
            amt: 2290,
        },
        {
            name: "April",
            sales: 2780,
            amt: 2000,
        },
        {
            name: "May",
            sales: 1890,
            amt: 2181,
        },
        {
            name: "June",
            sales: 2390,
            amt: 2500,
        },
        {
            name: "July",
            sales: 3490,
            amt: 2100,
        },
    ];

    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Dashboard" />

                <div className="flex gap-4">
                    <div className=" w-full flex gap-4 flex-col">
                        <div className=" flex gap-6">
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    New orders
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    23
                                </h1>
                            </div>
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Total sold
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    23
                                </h1>
                            </div>
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Products
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    23
                                </h1>
                            </div>
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Total Review
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    23
                                </h1>
                            </div>
                        </div>
                        <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                            <div>
                                <div className=" mb-1 flex flex-col">
                                    <small>Total Sales Revenue</small>
                                    <strong>PHP 23,000</strong>
                                </div>
                            </div>
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorUv"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#8884d8"
                                            strokeWidth={3}
                                            fill="url(#colorUv)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Date Created
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src="product_image_url"
                                                    alt="Product"
                                                    className="w-16 h-16 object-cover"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Product Name
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Amount
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Status
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Date Created
                                            </td>
                                        </tr>
                                        {/* Repeat <tr> for more products */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                            right
                        </div>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

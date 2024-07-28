import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { ImArrowUpRight } from "react-icons/im";
import { ImUser } from "react-icons/im";
import DefaultPicture from "../../assets/img/default_shop_profile.png";

import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Modal from "@/Components/Modal";
import ModalImage from "react-modal-image";

export default function Index({ auth }) {
    const { products, totalSellers, totalCustomer } = usePage().props;
    const [dataProduct, setDataProduct] = useState([products.data]);
    console.log(Array.isArray(dataProduct));
    const data = [
        {
            name: "January",
            users: 4000,
            sales: 2400,
            amt: 2400,
        },
        {
            name: "PFebruary",
            users: 3000,
            sales: 1398,
            amt: 2210,
        },
        {
            name: "March",
            users: 2000,
            sales: 9800,
            amt: 2290,
        },
        {
            name: "April",
            users: 2780,
            sales: 3908,
            amt: 2000,
        },
        {
            name: "May",
            users: 1890,
            sales: 4800,
            amt: 2181,
        },
        {
            name: "June",
            users: 2390,
            sales: 3800,
            amt: 2500,
        },
        {
            name: "July",
            users: 3490,
            sales: 4300,
            amt: 2100,
        },
    ];
    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin - Dashboard" />

                <div className="flex gap-4 flex-col">
                    {/* bar chart container */}
                    <div className="flex gap-2 bg-[#222222] w-full p-6 text-slate-50 rounded-xl drop-shadow">
                        <div>
                            <h1 className="tracking-widest">INCOMES</h1>
                            <div className="py-4">
                                <h1 className="font-thin flex gap-1 items-center tracking-widest">
                                    <IoAnalyticsSharp />
                                    This Month
                                </h1>
                                <p className="font-bold text-3xl">Php 12,000</p>
                                <small className="flex gap-1 items-center text-green-400">
                                    <ImArrowUpRight />
                                    +100 (50%)
                                </small>
                            </div>
                            <div className="py-4 border-t-2 border-slate-700">
                                <h1 className="font-thin flex gap-1 items-center tracking-widest">
                                    <ImUser />
                                    New Customers
                                </h1>
                                <p className="font-bold text-3xl">
                                    500 Customers
                                </p>
                                <small className="flex gap-1 items-center text-green-400">
                                    <ImArrowUpRight /> +100 (50%)
                                </small>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={700}
                                    height={280}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        wrapperStyle={{
                                            backgroundColor: "#443434",
                                            color: "black",
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        barSize={15}
                                        dataKey="users"
                                        fill="#D9D9D9"
                                        activeBar={<Rectangle fill="blue" />}
                                    />
                                    <Bar
                                        barSize={15}
                                        dataKey="sales"
                                        fill="#676767"
                                        activeBar={<Rectangle fill="green" />}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="gap-4 flex flex-col lg:flex-row">
                        {/* top selling product container */}
                        <div className="p-6 rounded-xl bg-[#EDEDED]  w-full lg:w-[60%]">
                            <h1 className="font-semibold">
                                Top Selling Products
                            </h1>

                            <div className="mt-2 flex gap-5 flex-col">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex gap-4 items-center"
                                    >
                                        <ModalImage
                                            className="w-10 h-10 object-cover"
                                            small={product.images[0].image_path}
                                            large={product.images[0].image_path}
                                            alt="product_img"
                                        />
                                        <h1>{product.product_name}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* sellers and customer count container */}
                        <div className="flex gap-4 flex-col w-full lg:w-[40%] ">
                            <div className="p-6 rounded-xl text-center w-full  text-white bg-[#FFA800]">
                                <div className=" flex items-center justify-center gap-6">
                                    <FaUsers size={80} />
                                    <div>
                                        <strong className=" text-4xl">
                                            {totalSellers}
                                        </strong>
                                        <div>
                                            Seller
                                            {totalSellers.length < 1 ? "" : "s"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl text-center w-full text-white bg-[#FF7575]">
                                <div className="flex items-center justify-center gap-6">
                                    <FaUser size={60} />
                                    <div>
                                        <strong className=" text-4xl">
                                            {totalCustomer}
                                        </strong>
                                        <div>
                                            Customer
                                            {totalCustomer.length < 1
                                                ? ""
                                                : "s"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}

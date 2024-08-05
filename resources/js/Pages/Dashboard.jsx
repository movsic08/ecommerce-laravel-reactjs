import StarRating from "@/Components/StarRating";
import AuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import frame_1 from "../assets/img/Frame_1.png";

export default function Dashboard({ auth }) {
    const images = [
        {
            url: "https://i.ytimg.com/vi/wy7-Y-C3P34/maxresdefault.jpg",
            alt: "Random Image 1",
            caption: "Caption for Random Image 1",
        },
        {
            url: "https://media-cdn.socastsrm.com/wordpress/wp-content/blogs.dir/1050/files/2022/02/diy-capiz-lamp.png",
            alt: "Random Image 2",
            caption: "Caption for Random Image 2",
        },
        // Add more images as needed
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />
            <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute left-10 md:left-16 lg:left-20 flex items-center z-10">
                    <div className="flex-col text-5xl md:text-6xl lg:text-8xl flex text-[#403E3E]">
                        <h1>Shell</h1>
                        <h1>Chandeliers</h1>
                        <Link
                            href={route("shop")}
                            className="text-lg md:text-2xl lg:text-3xl mt-4 hover:bg-slate-800 duration-300 rounded-full px-3 py-2 bg-[#403E3E] text-white font-bold w-fit"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <img
                    className="w-full h-full object-cover"
                    src={frame_1}
                    alt="Frame 1"
                />
            </div>
            <div className="bg-[#FEF3F0] flex flex-col items-center justify-center min-h-screen p-2 md:p-6">
                <h1 className="font-bold text-3xl md:text-4xl py-2 lg:py-8">
                    Artist of the Month
                </h1>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
                    <img
                        src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                        className="rounded-full object-cover h-32 w-32 md:h-52 md:w-52"
                        alt="Artist"
                    />
                    <div className="mt-4 md:mt-0 md:ml-8">
                        <h2 className="font-semibold text-center text-xl md:text-3xl">
                            Seller Name
                        </h2>
                        <div className="mt-4 text-center">Store name</div>
                        <table className="min-w-full mt-4 md:mt-0">
                            <tbody>
                                <tr className="text-left">
                                    <td className="font-bold pr-6 pt-2">
                                        Name
                                    </td>
                                    <td className="pt-2 font-italic">
                                        John Doe
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold pr-6 pt-2">
                                        Location
                                    </td>
                                    <td className="pt-2 font-italic">
                                        Lucap Wharf
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold pr-6 pt-2">
                                        Join
                                    </td>
                                    <td className="pt-2 font-italic">
                                        March 24, 2002
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    <Link
                        href=""
                        className="bg-[#ECECEC] drop-shadow-lg rounded relative overflow-hidden w-full"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                            alt="Product"
                            className="mx-auto h-48 w-full object-cover"
                        />
                        <div className="p-4 text-center flex flex-col">
                            <p className="line-clamp-2 h-10 grow">name</p>
                            <div className="flex flex-col mt-2">
                                <StarRating rating={4} />
                                <p className="font-semibold">Php 200</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href=""
                        className="bg-[#ECECEC] drop-shadow-lg rounded relative overflow-hidden w-full"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                            alt="Product"
                            className="mx-auto h-48 w-full object-cover"
                        />
                        <div className="p-4 text-center flex flex-col">
                            <p className="line-clamp-2 h-10 grow">name</p>
                            <div className="flex flex-col mt-2">
                                <StarRating rating={4} />
                                <p className="font-semibold">Php 200</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

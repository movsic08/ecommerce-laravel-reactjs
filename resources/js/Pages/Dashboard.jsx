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
            <div className="-mt-[5rem] h-screen w-full overflow-hidden -z-20 flex items-center justify-center ">
                <div className=" absolute left-[10rem]  flex items-center h-full">
                    <div className="flex-col text-8xl flex text-[#403E3E]">
                        <h1>Shell </h1>
                        <h1> Chandeliers</h1>
                        <Link
                            href={route("shop")}
                            className="text-3xl mt-4 hover:bg-slate-800 duration-300 rounded-full px-3 capitalize font-bold py-2 bg-[#403E3E] w-fit text-white"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <img
                    className=" w-full h-full object-cover"
                    src={frame_1}
                    alt=""
                />
            </div>
            <div className=" bg-[#FEF3F0] flex flex-col items-center justify-center h-screen w-full p-6s">
                <h1 className=" font-bold  text-4xl py-8">
                    Artist of the Month
                </h1>
                <div className=" flex items-start justify-center ">
                    <img
                        src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                        className=" rounded-full object-cover h-52 w-52"
                        alt=""
                    />
                    <div className=" ml-8">
                        <h2 className=" font-semibold text-3xl">Seller Name</h2>
                        <div className="mt-4">Store name</div>

                        <table className="min-w-full overflow-hidden">
                            <tr className="text-left">
                                <td className=" font-bold pr-6 pt-2">Name</td>
                                <td className="pt-2 font-italic">John Doe</td>
                            </tr>
                            <tr>
                                <td className=" font-bold pr-6 pt-2">
                                    Location
                                </td>
                                <td className="pt-2 font-italic">
                                    Lucap Wharf
                                </td>
                            </tr>
                            <tr>
                                <td className=" font-bold pr-6 pt-2">Join</td>
                                <td className="pt-2 font-italic">
                                    March 24, 2002
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    {" "}
                    <Link
                        href=""
                        className="bg-[#ECECEC] drop-shadow-lg rounded relative overflow-hidden"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                            alt=""
                            className="mx-auto h-48 w-full object-cover"
                        />
                        <div className="p-4 text-center h-fit flex flex-col">
                            <p className="line-clamp-2 h-[5vw] grow ">name</p>
                            <div className="flex  flex-none flex-col ">
                                <StarRating rating={4} />
                                <p className="font-semibold">Php 200</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href=""
                        className="bg-[#ECECEC] drop-shadow-lg rounded relative overflow-hidden"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEWvj-brrQLo63rYQe-vQ8sUi5495fskgQw&s"
                            alt=""
                            className="mx-auto h-48 w-full object-cover"
                        />
                        <div className="p-4 text-center h-fit flex flex-col">
                            <p className="line-clamp-2 h-[5vw] grow ">name</p>
                            <div className="flex  flex-none flex-col ">
                                <StarRating rating={4} />
                                <p className="font-semibold">Php 200</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* <div className=" h-screen w-screen bg-white text-gray-900">
                You're logged in!
            </div> */}
        </AuthenticatedLayout>
    );
}

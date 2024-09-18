import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Messages({ auth }) {
    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Messages" />
                <div className="flex flex-col flex-grow h-full md:flex-row">
                    <div className="w-full p-6 bg-white md:w-1/3 lg:w-1/4">
                        <h2 className="mb-4 text-3xl font-bold text-themeColor">
                            Chat
                        </h2>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <ul>
                            <li className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 mr-2 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold">
                                            Handyjohn
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Hi, welcome to our...
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    30mins
                                </span>
                                <span className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded-full">
                                    1
                                </span>
                            </li>
                            <li className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 mr-2 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold">
                                            BambooDeer
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Okay thank you...
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    04/12/2024
                                </span>
                            </li>
                            <li className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 mr-2 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold">
                                            Joansea...
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            We have a new sales...
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    50mins
                                </span>
                                <span className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded-full">
                                    2
                                </span>
                            </li>
                            <li className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 mr-2 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold">
                                            Thekey...
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Hi, enjoy our vou...
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    3hours
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center flex-grow bg-slate-50">
                        <div className="text-center">
                            <div className="mb-4 text-6xl text-gray-400">
                                💬
                            </div>
                            <p className="text-xl font-semibold">
                                Welcome to MadeByHands
                            </p>
                        </div>
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

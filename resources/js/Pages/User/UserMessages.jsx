import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserMessages({ auth }) {
    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Messages" />
                <div className="flex flex-col md:flex-row flex-grow h-full">
                    <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6">
                        <h2 className="text-3xl font-bold mb-4 text-themeColor">
                            Chat
                        </h2>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <ul>
                            <li className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
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
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                                    1
                                </span>
                            </li>
                            <li className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
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
                            <li className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
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
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                                    2
                                </span>
                            </li>
                            <li className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
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
                    <div className="flex-grow bg-slate-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl text-gray-400 mb-4">
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

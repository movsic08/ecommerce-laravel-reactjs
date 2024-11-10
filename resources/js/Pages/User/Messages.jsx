import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import SelectedConversation from "./Partials/SelectedConversation";

export default function Messages({ auth }) {
    const { conversations } = usePage().props;
    const [selectedConvo, setSelectedConvo] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("currentConvo") || null;
        setSelectedConvo(param);
    }, []);

    const handleSelectedConversation = (tabId) => {
        setSelectedConvo(tabId);
        const url = new URL(window.location);
        url.searchParams.set("currentConvo", tabId);
        window.history.pushState({ selectedConvo }, "", url);
    };

    return (
        <UserAuthenticatedLayout user={auth.user}>
            <Head title="Messages" />
            <div className="flex flex-grow w-full h-full bg-slate-200">
                <div className="w-1/3 border-r bg-slate-100 border-slate-200">
                    <header className="flex flex-col items-center justify-between p-4 text-white border-b border-gray-300 bg-slate-100">
                        <div className="mb-4 text-xl font-bold text-orange-600">Chat</div>
                        {/* Search Box */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-orange-600"
                        />
                    </header>

                    {/* Convo list */}
                    <div className="p-1.5 max-h-[calc(100vh-14.800rem)] space-y-1 overflow-y-auto mb-9">
                        {conversations.map((data, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-2 rounded-md ${selectedConvo == data.id ? "bg-slate-300" : "hover:bg-gray-200"
                                    }`}
                                onClick={() => handleSelectedConversation(data.id)}
                            >
                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg text-white bg-yellow-500 rounded-full">
                                    {data.user1.seller.shop_picture_path ? (
                                        <img
                                            src={`/storage/${data.user1.seller.shop_picture_path}`}
                                            alt="Shop Picture"
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    ) : (
                                        data.user1.seller?.shop_name?.charAt(0)
                                    )}
                                </div>
                                <div className="flex-grow ml-4">
                                    <p className="font-semibold text-gray-800">{data.user1.seller.shop_name}</p>
                                    <p className="text-sm text-gray-500">{data.last_message.message}</p>
                                    <div className="ml-auto text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(data.updated_at), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex flex-col w-full bg-slate-50">
                    <header className="p-4 text-gray-700 bg-white drop-shadow-sm">
                        <h1 className="text-2xl font-semibold">Alice</h1>
                    </header>
                    <div className="max-h-[calc(100vh-12.65rem)] pb-2 pt-4 px-4 bottom overflow-y-auto">
                        <div className="flex mb-4 cursor-pointer">
                            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                                <img
                                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                            <div className="flex gap-3 p-3 bg-white rounded-lg drop-shadow-md max-w-96">
                                <p className="text-gray-700">Hey Bob, how's it going?</p>
                            </div>
                        </div>

                        <div className="flex justify-end mb-4 cursor-pointer">
                            <div className="flex gap-3 p-3 text-white rounded-lg drop-shadow-md bg-themeColor max-w-96">
                                <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                            </div>
                            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                                <img
                                    src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                    alt="My Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    <footer className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300 ">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            <button className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md">Send</button>
                        </div>
                    </footer>
                </div>
            </div>

        </UserAuthenticatedLayout>
    );
}

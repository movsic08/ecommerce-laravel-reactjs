import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import SelectedConversation from "./Partials/SelectedConversation";

export default function Messages({ auth }) {
    const { conversations } = usePage().props;
    const [selectedConvo, setSelectedConvo] = useState();
    const [selectedName, setSelectedName] = useState();

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
                <div className="border-r min-w-[30%] bg-slate-100 border-slate-200">
                    <header className="flex flex-col items-center justify-between p-4 text-white border-b border-gray-300 bg-slate-100">
                        <div className="mb-2 text-xl font-bold text-orange-600">Chat</div>
                        {/* Search Box */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-600"
                        />
                    </header>

                    {/* Convo list */}
                    <div className="p-1.5 max-h-[calc(100vh-14.800rem)] space-y-1 overflow-y-auto mb-9">
                        {conversations.map((data, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-2 rounded-md ${selectedConvo == data.id ? "bg-slate-300 cursor-default" : "hover:bg-gray-200 cursor-pointer"
                                    }`}
                                onClick={() => {
                                    handleSelectedConversation(data.reference);
                                    setSelectedName(data.user1.seller.shop_name);
                                }}
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
                <SelectedConversation
                    currentConvoParam={selectedConvo}
                />
            </div>

        </UserAuthenticatedLayout>
    );
}

import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";

export default function Messages({ auth }) {
    const { conversations } = usePage().props;
    console.log(conversations)

    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Messages" />
                <div className="flex flex-col min-h-[39.010rem] max-h-screen md:flex-row">
                    <div className="w-full p-4 overflow-y-auto bg-gray-100 border-r md:w-1/3 lg:w-1/4">
                        <h2 className="mb-4 text-xl font-bold text-orange-600">Chat</h2>

                        {/* Search Box */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-orange-600"
                        />

                        {/* Conversation List */}
                        <div className="flex flex-col space-y-4 overflow-y-auto">
                            {conversations.map((data, index) => (
                                <div key={index} className="flex items-center p-2 rounded-md hover:bg-gray-200">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg text-white bg-yellow-500 rounded-full">
                                        {/* Conditionally render image or first letter */}
                                        {data.user1.seller.shop_picture_path ? (
                                            <img
                                                src={`/storage/${data.user1.seller.shop_picture_path}`}
                                                alt="Shop Picture"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            data.user1.seller?.shop_name?.charAt(0)
                                        )}
                                    </div>
                                    <div className="flex-grow ml-4">
                                        <p className="font-semibold text-gray-800">{data.user1.seller.shop_name}</p>
                                        <p className="text-sm text-gray-500">
                                            {data.last_message.message}
                                        </p>
                                        <div className="ml-auto text-xs text-gray-500">
                                            {formatDistanceToNow(new Date(data.updated_at), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-grow p-4 bg-gray-50">
                        <p className="text-lg font-semibold text-gray-600">
                            Welcome to MadeByHands
                        </p>
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}

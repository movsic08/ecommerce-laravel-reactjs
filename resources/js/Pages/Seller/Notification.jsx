import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Notification() {
    const initialNotifications = [
        {
            id: 1,
            title: "New Message",
            description: "You have received a new message.",
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: false,
        },
        {
            id: 2,
            title: "System Update",
            description: "System update completed successfully.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            read: true,
        },
        {
            id: 3,
            title: "New Comment",
            description: "Someone commented on your post.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            read: false,
        },
    ];

    const [notifications, setNotifications] = useState(initialNotifications);

    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const handleMarkAsUnread = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: false }
                    : notification
            )
        );
    };

    const handleDelete = (id) => {
        setNotifications(
            notifications.filter((notification) => notification.id !== id)
        );
    };
    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Notification" />
                <div className="max-w-2xl mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                    <div className="space-y-4">
                        {notifications.length === 0 && (
                            <p className="text-gray-500 text-center">
                                No notifications available.
                            </p>
                        )}

                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded shadow-lg ${
                                    notification.read
                                        ? " bg-white text-mainText"
                                        : "bg-themeColor text-white"
                                }`}
                            >
                                <h3 className="text-lg font-semibold">
                                    {notification.title}
                                </h3>
                                <p className="0">{notification.description}</p>

                                <div className="mt-2 flex items-center justify-between space-x-2">
                                    <div className="flex space-x-2">
                                        {notification.read ? (
                                            <button
                                                onClick={() =>
                                                    handleMarkAsUnread(
                                                        notification.id
                                                    )
                                                }
                                                className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
                                            >
                                                Mark as Unread
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification.id
                                                    )
                                                }
                                                className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleDelete(notification.id)
                                            }
                                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <small className="text-sm">
                                        {formatDistanceToNow(
                                            new Date(notification.timestamp),
                                            { addSuffix: true }
                                        )}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

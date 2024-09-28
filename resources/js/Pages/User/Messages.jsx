import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ChatLayout from "../ChatLayout";

export default function Messages({ auth }) {
    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title="Messages" />
                <ChatLayout>
                    chtaltyout
                </ChatLayout>
            </UserAuthenticatedLayout>
        </>
    );
}

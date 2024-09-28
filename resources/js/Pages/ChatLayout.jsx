import { Head, usePage } from "@inertiajs/react"
import UserAuthenticatedLayout from "../Layouts/UserAuthenticatedLayout";
import { useEffect } from "react";

export default function ChatLayout({ children }) {
    const page = usePage();
    const users = page.props.auth;


    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log('conversation:', conversations);
    console.log('selected convo:', selectedConversation);



    return <>
        <div>
            <UserAuthenticatedLayout user={page.props.auth.user}>
                ChatLayout
                <div>
                    {children}
                </div>
            </UserAuthenticatedLayout>
        </div>
    </>
}

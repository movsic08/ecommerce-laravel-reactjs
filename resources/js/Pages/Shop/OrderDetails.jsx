import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function OrderDetais({ auth }) {
    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title="No. - Order Details" />
            </UserAuthenticatedLayout>
        </>
    );
}

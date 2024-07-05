import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function SellersList({ auth }) {
    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Sellers List" />
                <h2>Sellers list admin page</h2>
            </AdminAuthenticatedLayout>
        </>
    );
}

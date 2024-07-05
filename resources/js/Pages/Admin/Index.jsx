import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin" />
                yes
            </AdminAuthenticatedLayout>
        </>
    );
}

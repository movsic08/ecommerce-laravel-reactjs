import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function PermissionPanel({ auth }) {
    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin permission" />
                <h2>permision list</h2>
            </AdminAuthenticatedLayout>
        </>
    );
}

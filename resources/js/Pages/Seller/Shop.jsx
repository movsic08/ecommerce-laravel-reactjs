import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Shop() {
    return (
        <>
            <SellerAuthenticatedLayout>
                <Head title="Seller - Dashboard" />
                <h1>Seller pages here</h1>
            </SellerAuthenticatedLayout>
        </>
    );
}

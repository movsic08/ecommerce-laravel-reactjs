import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UpdateSellerProfileForm from "./Partials/UpdateSellerProfileForm";

export default function SellerProfile({ auth }) {
    return (
        <>
            <SellerAuthenticatedLayout user={auth}>
                <Head title="Seller Profile" />

                <UpdateSellerProfileForm />
            </SellerAuthenticatedLayout>
        </>
    );
}

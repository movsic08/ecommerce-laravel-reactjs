import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UpdateSellerProfileForm from "./Partials/UpdateSellerProfileForm";
import UpdateSellerPasswordForm from "./Partials/UpdateSellerPasswordForm";

export default function SellerProfile({ auth }) {
    return (
        <>
            <SellerAuthenticatedLayout user={auth}>
                <Head title="Seller Profile" />
                <div className="flex gap-4 md:gap-6 lg:gap-8 py-2 flex-col md:px-4 lg:px-8">
                    <UpdateSellerProfileForm />
                    <UpdateSellerPasswordForm />
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}

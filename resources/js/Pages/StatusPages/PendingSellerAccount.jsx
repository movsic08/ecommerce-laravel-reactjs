import SellerGuestLayout from "@/Layouts/SellerGuestLayout";
import { Head, Link } from "@inertiajs/react";
import { GrLinkPrevious } from "react-icons/gr";

export default function PendingSellerAccount({}) {
    return (
        <>
            <SellerGuestLayout>
                <Head title="Pending account" />
                <div className=" text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Account Pending
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your account as a seller is currently under review by
                        our administrative team. We appreciate your patience
                        during this process. Please try again later.
                    </p>
                    <div className="flex items-center justify-center">
                        <Link
                            className="px-3 flex duration-300 hover:bg-orange-500 items-center gap-1 w-fit py-2 bg-themeColor rounded-md text-white"
                            href={route("login")}
                        >
                            <GrLinkPrevious />
                            Go back
                        </Link>
                    </div>
                </div>
            </SellerGuestLayout>
        </>
    );
}

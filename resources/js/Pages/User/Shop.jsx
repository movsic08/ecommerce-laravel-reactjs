import AuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import shopImage from "../../assets/shop_page_asset.jpg";

export default function Shop({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Shop" />
            <img
                className="  object-cover  h-36 w-full "
                src={shopImage}
                alt="Shop Page Asset"
            />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            SHOPPING CONTENT
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

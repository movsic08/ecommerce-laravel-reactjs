import { Link } from "@inertiajs/react";
import GuestHeader from "./GuestHeader";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <GuestHeader />
            <main className="flex-grow flex flex-col justify-center items-center bg-gray-100">
                <div className="w-full flex flex-col items-center justify-center sm:max-w-md mt-6 px-8 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </main>
        </div>
    );
}

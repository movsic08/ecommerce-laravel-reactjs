import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import UserChatIcon from "@/assets/icons/UserChatIcon.svg";
import { TbLogout } from "react-icons/tb";
import Logo from "@/assets/icons/Logo.svg";
import { IoNotifications } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";

export default function SellerAuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="  shadow drop-shadow-md border-b bg-white border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="shrink-0 flex items-center">
                            <Link href="/" className=" flex items-center gap-1">
                                <img className=" h-12" src={Logo} alt="Logo" />
                                <h1>MADEBYHANDS</h1>
                            </Link>
                        </div>

                        <div className="hidden uppercase space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route("seller.dashboard")}
                                active={route().current("seller.dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("seller.shop")}
                                active={route().current("seller.shop")}
                            >
                                Your Shop
                            </NavLink>
                            <NavLink
                                href={route("seller.products")}
                                active={route().current("seller.products")}
                            >
                                Products
                            </NavLink>
                        </div>

                        <div className="hidden  gap-2 md:flex sm:items-center sm:ms-6">
                            <div className="relative flex items-center justify-center">
                                <NavLink
                                    href={route("seller.showNotification")}
                                >
                                    <IoNotifications size={20} />
                                </NavLink>
                                {/* <div className="absolute -top-1 -right-1 p-0.5 bg-slate-600 rounded-full text-xs text-white">
                                    23
                                </div> */}
                            </div>
                            <NavLink href={route("user-messages")}>
                                <img
                                    className=" h-6 "
                                    src={UserChatIcon}
                                    alt="chat icon"
                                />
                            </NavLink>
                            <NavLink href={route("seller.profile")}>
                                <FaUserGear size={20} />
                            </NavLink>
                            <NavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                <TbLogout size={22} />
                            </NavLink>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            {/* <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div> */}
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("seller.profile")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main
                className="mx-auto
            container p-4 -z-20"
            >
                {children}
            </main>
        </div>
    );
}

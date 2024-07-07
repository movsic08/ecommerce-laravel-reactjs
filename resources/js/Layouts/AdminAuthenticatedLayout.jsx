import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Logo from "@/assets/icons/Logo.svg";

export default function AdminAuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <div className="min-h-screen bg-white">
                <nav className="  shadow drop-shadow-md border-b bg-white border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className=" flex items-center gap-6">
                                <div className="shrink-0 flex items-center">
                                    <Link
                                        href="/"
                                        className=" flex items-center gap-1"
                                    >
                                        <img
                                            className=" h-12"
                                            src={Logo}
                                            alt="Logo"
                                        />
                                        <h1>MADEBYHANDS</h1>
                                    </Link>
                                </div>

                                <div className="hidden uppercase space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("admin.index")}
                                        active={route().current("admin.index")}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        href={route("admin.sellers")}
                                        active={route().current(
                                            "admin.sellers"
                                        )}
                                    >
                                        Sellers
                                    </NavLink>{" "}
                                    <NavLink
                                        href={route("admin.permission")}
                                        active={route().current(
                                            "admin.permission"
                                        )}
                                    >
                                        Permission
                                    </NavLink>
                                </div>
                            </div>
                            <div className=" gap-3 flex sm:items-center sm:ms-6">
                                <div className=" relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {/* {user.first_name} */}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content className="z-40">
                                            <Dropdown.Link
                                                className="z-40"
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                className="z-40"
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
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
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {/* {user.first_name == null
                                        ? user.first_name
                                        : "Admin"} */}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {/* {user.email} */}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink> */}
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

                <main className=" mx-auto container p-4">{children}</main>
            </div>
        </>
    );
}

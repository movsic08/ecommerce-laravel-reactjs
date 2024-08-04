import React, { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";
import TextInput from "@/Components/TextInput"; // Assuming you have a TextInput component
import { toast } from "react-toastify"; // For notifications
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import DeleteUserProfileForm from "./Partials/DeleteUserProfileForm";

const UserProfile = ({ auth }) => {
    const { user } = usePage().props.auth;

    return (
        <UserAuthenticatedLayout user={user}>
            <Head title="Update Profile" />
            <div className="container mx-auto p-4 flex gap-4 md:gap-5 lg:gap-6 flex-col">
                <div className="flex flex-col items-center mb-4">
                    <FaUserCircle className="text-6xl text-gray-400 mb-2" />
                    <h1 className="text-2xl font-semibold">Update Profile</h1>
                </div>

                <div className=" bg-slate-50 shadow-lg p-6 rounded-md">
                    <div className="max-w-3xl">
                        <div className="mt-4 flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* delete form */}
                <DeleteUserProfileForm />
            </div>
        </UserAuthenticatedLayout>
    );
};

export default UserProfile;

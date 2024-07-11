import { useState } from "react";

export default function PermitPictureViewer({ imageUrl, onClose }) {
    const closeModal = () => {
        onClose(); // This will set isPermitViewerOpen to false in the parent component
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50`}
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full md:max-w-md mx-auto">
                <div className="flex justify-end px-4 py-2">
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="px-4 py-2">
                    <img
                        src={imageUrl}
                        alt="Permit"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}

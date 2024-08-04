export default function UpdateUserProfileForm() {
    return (
        <>
            <div className=" bg-slate-50 shadow-lg p-6 rounded-md">
                <div className="max-w-3xl">
                    <h2 className="text-lg font-medium text-gray-900">
                        Update Account
                    </h2>
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
        </>
    );
}

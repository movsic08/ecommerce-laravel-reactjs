export default function ToShip() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">To Ship</h2>
            <div class="flex items-center justify-center p-6 bg-gray-50">
                <div class="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-12 h-12 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h18M3 12h18m-9 9h9"
                        />
                    </svg>
                    <h2 class="mt-4 text-2xl font-semibold text-gray-800">
                        No Orders Yet
                    </h2>
                    <p class="mt-2 text-gray-600">
                        Looks like you haven't placed any orders.
                    </p>
                    <button class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

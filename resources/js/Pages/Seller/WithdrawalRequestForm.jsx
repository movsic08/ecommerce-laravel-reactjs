import InputError from "@/Components/InputError";
import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";
import "tailwindcss/tailwind.css";

const WithdrawalRequestForm = ({ auth }) => {
    const { balance } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
    });

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        if (!isNaN(value)) {
            setData("amount", value);
        }
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat().format(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("seller.store.withdraw"), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                // Handle error (e.g., display a notification)
            },
        });
    };

    return (
        <SellerAuthenticatedLayout user={auth}>
            <Head title="Request withdraw" />
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-mainText mb-4">
                    Request Withdrawal
                </h2>

                <div className="w-full text-xl text-gray-800 font-bold flex items-center justify-end">
                    PHP {new Intl.NumberFormat().format(balance)}
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount
                        </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formatAmount(data.amount)}
                            onChange={handleAmountChange}
                            onFocus={(e) => (e.target.value = data.amount)}
                            onBlur={(e) =>
                                (e.target.value = formatAmount(data.amount))
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                            placeholder="0"
                        />
                    </div>
                    {errors.amount && (
                        <InputError
                            className="w-full mt-2 mb-4"
                            message={errors.amount}
                        />
                    )}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-2 my-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                    >
                        {processing ? "Submitting..." : "Submit Request"}
                    </button>
                </form>
            </div>
        </SellerAuthenticatedLayout>
    );
};

export default WithdrawalRequestForm;

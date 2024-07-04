import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import GuestFooter from "@/Layouts/GuestFooter";
import GuestLayout from "@/Layouts/GuestLayout";
import SellerGuestLayout from "@/Layouts/SellerGuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function SellerSignup() {
    const { data, processing, setData, errors, post } = useForm({});

    return (
        <>
            <SellerGuestLayout>
                <Head title="Become a seller" />
                <h1 className=" font-bold text-3xl text-center py-4 uppercase text-mainText">
                    Become a Seller
                </h1>
                <div className=" flex flex-col w-full">
                    <h1 className=" font-bold text-xl text-slate-800 py-2 border-b-2  border-gray-200 w-full">
                        Personal Details
                    </h1>
                    <form action="" method="post">
                        <div className=" flex w-full flex-col lg:flex-row gap-2 mt-3">
                            <div className=" w-full">
                                <InputLabel
                                    className="text-xl"
                                    htmlFor="fname"
                                    value="First name"
                                />

                                <TextInput
                                    id="fname"
                                    name="fname"
                                    // value={data.fname}
                                    className="mt-1 block w-full"
                                    autoComplete="fname"
                                    isFocused={true}
                                    // onChange={(e) =>
                                    //     setData("fname", e.target.value)
                                    // }
                                    required
                                />

                                <InputError message="" className="mt-1" />
                            </div>
                            <div className=" w-full">
                                <InputLabel
                                    className=" text-xl"
                                    htmlFor="lname"
                                    value="Last name"
                                />

                                <TextInput
                                    id="lname"
                                    name="lname"
                                    // value={data.lname}
                                    className="mt-1 block w-full"
                                    autoComplete="lname"
                                    isFocused={true}
                                    // onChange={(e) =>
                                    //     setData("lname", e.target.value)
                                    // }
                                    required
                                />
                                <InputError message="" className="mt-1" />
                            </div>
                        </div>
                        <div className=" w-full mt-4">
                            <InputLabel
                                className=" text-xl"
                                htmlFor="adddress"
                                value="Address"
                            />

                            <TextInput
                                id="adddress"
                                name="adddress"
                                // value={data.adddress}
                                className="mt-1 block w-full"
                                autoComplete="adddress"
                                isFocused={true}
                                // onChange={(e) =>
                                //     setData("lname", e.target.value)
                                // }
                                required
                            />
                            <InputError message="" className="mt-1" />
                        </div>
                        <div className=" mt-4">
                            <h1 className=" font-bold text-xl text-slate-800">
                                How many years have you been selling?
                            </h1>
                            <SelectInput>
                                <option
                                    className="text-slate-900"
                                    value="product-posted"
                                >
                                    Product Posted
                                </option>
                            </SelectInput>
                            <InputError message="" className="mt-1" />
                        </div>
                        <div className="mt-4 flex flex-col lg:flex-row items-center w-full gap-2">
                            <div className=" w-full">
                                <h1 className=" font-bold text-xl text-slate-800 whitespace-nowrap">
                                    Do you have permit?
                                </h1>
                                <div className=" flex w-full items-center gap-2 mt-1">
                                    <Checkbox id="hasPermit" />
                                    <InputLabel
                                        className="cursor-pointer"
                                        value=", I have"
                                        htmlFor="hasPermit"
                                    />
                                </div>
                                <InputError message="" className="mt-1" />
                            </div>
                            <div className=" w-full">
                                <h1 className=" font-bold text-xl text-slate-800">
                                    Proof of membership
                                </h1>
                                <div className=" flex w-full items-center gap-2 mt-1">
                                    <input type="file" name="" id="" />
                                </div>
                                <InputError message="" className="mt-1" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h1 className=" font-bold text-xl text-slate-800 whitespace-nowrap">
                                Check all the requirement if completed.
                            </h1>
                            <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                                <div className="">
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox id="dti" />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="DTI"
                                            htmlFor="dti"
                                        />
                                    </div>
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox id="mayorsbusinesspermit" />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Mayor's Business Permit"
                                            htmlFor="mayorsbusinesspermit"
                                        />
                                    </div>
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox id="paidOrganizationalFee" />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Paid Organizational Fee"
                                            htmlFor="paidOrganizationalFee"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox id="barangayClearance" />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Barangay Clearance"
                                            htmlFor="barangayClearance"
                                        />
                                    </div>
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox id="BIRRegistration" />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="BIR Registration"
                                            htmlFor="BIRRegistration"
                                        />
                                    </div>
                                </div>
                            </div>
                            <InputError message="" className="mt-1" />
                        </div>
                        <div className=" py-3 mt-4 flex items-center justify-start lg:justify-end gap-2 border-t-2 border-slate-200 w-full">
                            <Link
                                className="px-2  py-1 border-slate-500 text-slate-500 hover:bg-slate-500 duration-200 hover:text-white border rounded"
                                href="/"
                            >
                                Cancel
                            </Link>
                            <button
                                className=" px-2 py-1 duration-200 hover:bg-orange-600 text-white bg-themeColor rounded"
                                type="submit"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>
            </SellerGuestLayout>
            <GuestFooter></GuestFooter>
        </>
    );
}

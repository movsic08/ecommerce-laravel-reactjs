import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestFooter from "@/Layouts/GuestFooter";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        fname: "",
        lname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <>
            <GuestLayout>
                <Head title="Register" />
                <h1 className=" font-bold text-3xl py-4 uppercase text-mainText">
                    Create account
                </h1>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="fname" value="First name" />

                        <TextInput
                            id="fname"
                            name="fname"
                            value={data.fname}
                            className="mt-1 block w-full"
                            autoComplete="fname"
                            isFocused={true}
                            onChange={(e) => setData("fname", e.target.value)}
                            required
                        />

                        <InputError message={errors.fname} className="mt-2" />
                    </div>
                    <div className=" mt-2">
                        <InputLabel htmlFor="lname" value="Last name" />

                        <TextInput
                            id="lname"
                            name="lname"
                            value={data.lname}
                            className="mt-1 block w-full"
                            autoComplete="lname"
                            isFocused={true}
                            onChange={(e) => setData("lname", e.target.value)}
                            required
                        />

                        <InputError message={errors.lname} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-2">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-2">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>

                    <div className=" text-mainText text-sm  border-t-2 border-gray-200 flex items-center justify-center w-full mt-6 pt-4 ">
                        <Link className="hover:text-slate-700 duration-200 ease-in-out hover:font-medium">
                            Become a seller
                        </Link>
                    </div>
                </form>
            </GuestLayout>
            <GuestFooter />
        </>
    );
}

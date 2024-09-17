import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestFooter from "@/Layouts/GuestFooter";
import { regions, provinces, cities, barangays, regionByCode, provincesByCode, provinceByName } from "select-philippines-address";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        address: "",
        phone_no: "",
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

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");

    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        setRegionAddr(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        setProvinceAddr(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        setCityAddr(e.target.selectedOptions[0].text);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        setBarangayAddr(e.target.selectedOptions[0].text);
    }

    useEffect(() => {
        region()
    }, [])
    return (
        <>
            <GuestLayout>
                <Head title="Register" />
                <h1 className="py-4 text-3xl font-bold uppercase text-mainText">
                    Create account
                </h1>
                <form onSubmit={submit} className="w-full">
                    <div>
                        <InputLabel htmlFor="fname" value="First name" />

                        <TextInput
                            id="fname"
                            name="first_name"
                            value={data.first_name}
                            className="block w-full mt-1"
                            autoComplete="first_name"
                            isFocused={true}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2 ">
                        <InputLabel htmlFor="lname" value="Last name" />

                        <TextInput
                            id="lname"
                            name="last_name"
                            value={data.last_name}
                            className="block w-full mt-1"
                            autoComplete="last_name"
                            isFocused={true}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
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
                            className="block w-full mt-1"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="phone_no" value="Phone Number" />

                        <TextInput
                            id="phone_no"
                            type="number"
                            name="phone_no"
                            value={data.phone_no}
                            className="block w-full mt-1"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("phone_no", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.phone_no}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2 ">
                        <InputLabel htmlFor="address" value="Address" />

                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="block w-full mt-1"
                            autoComplete="address"
                            isFocused={true}
                            onChange={(e) => setData("address", e.target.value)}
                            required
                        />

                        <InputError message={errors.lname} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1"
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
                            className="block w-full mt-1"
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

                    <div className="flex flex-col items-center justify-end gap-3 mt-2">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="w-full ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center justify-center w-full pt-4 mt-6 text-sm border-t-2 border-gray-200 text-mainText">
                        <Link
                            href="/create-seller-account"
                            className="duration-200 ease-in-out hover:text-slate-700 hover:font-medium"
                        >
                            Become a seller
                        </Link>
                    </div>
                </form>
            </GuestLayout>
            <GuestFooter />
        </>
    );
}

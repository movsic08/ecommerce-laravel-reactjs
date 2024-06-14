import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="w-full flex items-center justify-center p-4  text-mainText bg-header">
                <img src="LOGO.svg" alt="logo" className=" mr-1" />
                <h1 className="text-4xl font-medium">MadeByHands</h1>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center bg-gray-100">
                <div className="w-full flex flex-col items-center justify-center sm:max-w-md mt-6 px-8 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </main>
            <footer className="w-full flex flex-col text-slate-50 items-center justify-center p-4 bg-footer">
                <h1 className="text uppercase  tracking-widest ">
                    MadeByHands
                </h1>
                <span className=" text-xs  font-light text-slate-50">
                    Copyright © Louis All Right Reserved.
                </span>
            </footer>
        </div>
    );
}

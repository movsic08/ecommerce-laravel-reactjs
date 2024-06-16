import Logo from "@/assets/icons/Logo.svg";

export default function GuestHeader() {
    return (
        <header className="w-full flex items-center justify-center p-4  text-mainText bg-header">
            <img className=" h-12" src={Logo} alt="Logo" />
            <h1 className="text-4xl font-medium">MadeByHands</h1>
        </header>
    );
}

import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex items-center justify-center my-8">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.url}
                                className={`px-3 py-2 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ${
                                    link.active
                                        ? " bg-slate-900 text-white"
                                        : "bg-white text-gray-900"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

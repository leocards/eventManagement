import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-center ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-slate-100 hover:border-slate-300 focus:text-slate-800 focus:bg-slate-50 focus:border-gray-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}

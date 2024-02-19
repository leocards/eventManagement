import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-blue-100/60 text-blue-600 focus:border-indigo-700 '
                    : 'text-[#012970] hover:text-blue-800 hover:bg-[#f6f9ff] focus:text-blue-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs 
                text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none 
                disabled:opacity-25 disabled:hover:bg-white transition ease-in-out duration-150 ${
                    disabled && 'opacity-40'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

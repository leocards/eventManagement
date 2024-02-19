export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs
                text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none disabled:hover:bg-red-600 transition ease-in-out duration-150 ${
                    disabled && 'opacity-40'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

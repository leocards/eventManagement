export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-5 py-2.5 bg-blue-800 border border-transparent rounded-md font-semibold text-xs 
                text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none 
                transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

import { PrinterIcon } from "@heroicons/react/24/outline";

export default function PrintButton({ isPrintable = false }) {
    return (
        <button
            disabled={!isPrintable}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                    transition duration-150 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
        >
            <PrinterIcon className="w-5 h-5" />
            <div>Print</div>
        </button>
    );
}

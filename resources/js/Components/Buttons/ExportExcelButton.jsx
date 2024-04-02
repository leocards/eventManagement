import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ExportButton({ exportRoute, className, eportType = 'excel', disabled = false }) {
    return (
        <a 
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 transition duration-150 
            ${disabled?'bg-gray-200 text-gray-400 pointer-events-none':'bg-blue-600 text-white hover:bg-blue-600/90'} ${className}`}
            href={exportRoute}
        >
            <ArrowUpTrayIcon className="w-5 h-5" /> Export to {eportType}
        </a>
    )
}
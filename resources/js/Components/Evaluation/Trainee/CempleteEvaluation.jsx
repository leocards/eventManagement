import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function CompletedEvaluation({ name, completed }) {

    return (
        <div className="bg-white ring-1 ring-slate-200 rounded-lg overflow-hidden">
            <div className="font-gotham p-4 bg-green-700 text-white">
                Your response has been recorded!
            </div>

            <div className="p-4">
                <div className="uppercase font-semibold text-center">Daghang salamat</div>
                <div className="text-center font-medium">Your attendance for time out has been recorded</div>

                <div className="mt-4 mb-2">
                    <img src="/storage/thankyou.jpg" alt="" className="rounded-lg w-[80%] h-[70%] mx-auto" />
                </div>
            </div>

            <Link as="button" href={route('dashboard')} className="flex items-center gap-3 p-3 px-5 rounded m-4 mx-auto hover:bg-blue-700 hover:text-white">
                <HomeIcon className="w-5 h-5" />
                Back home
            </Link>
        </div>
    )
}
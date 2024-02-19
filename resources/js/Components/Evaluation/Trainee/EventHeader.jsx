import { convertDate } from "@/js/DateFormatter";
import { CalendarIcon, LinkIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function EventHeader({ user, event }) {
    return (
        <>
            <div className="bg-white ring-1 ring-slate-200 rounded-lg">
                <div className="w-full min-h-[8rem] rounded-lg shad ow-md ring-1 ring-slate-200 /50 shadow-md overflow-hidden p-3 bg-gray-700 text-white">
                    <div className="font-gotham text-xl flex">
                        <div className="w-16 h-16 shrink-0 mr-3">
                            <img src="/storage/logo.png" className="w-full h-full" alt="" />
                        </div>
                        {event.title}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" /> {convertDate(event.dateStart, event.dateEnd)}
                    </div>
                    {
                        event.platform == "Face-to-face" ? (
                            <div className="mt-1 flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5" /> {event.venue}
                            </div>
                        ) : (
                            <div className="mt-1 flex items-center gap-2">
                                <LinkIcon className="w-5 h-5" /> {event.venue}
                            </div>
                        )
                    }
                </div>

                <div className="p-3 pt-4">
                    <div className="mb-2">
                        Hello <span className="font-semibold">{user.first_name} {user.last_name}</span>!
                    </div>

                    Please provide us with your feedback by completing this evaluation form. This is a vital tool in our organization as it helps us to continuously improve our delivery of learning and development interventions to our program implementers. We hope that you will be very candid in your responses as this will translate into accurate data and analyses towards better service. Please feel free to share your thoughts. Thank you.
                </div>
            </div>
        </>

    )
}
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Head, router, usePage } from "@inertiajs/react";
import moment from "moment";
import styled from "styled-components";

export default function Notifications({ auth, notifications, event, unread }) {
    const { url } = usePage();

    const convertDate = (
        start = null,
        end = null,
        time_in = null,
        time_out = null
    ) => {
        if (start && !end && !time_in && !time_out) {
            return moment(start).format("LL");
        } else if (start && end && !time_in && !time_out) {
            if (
                moment(start).format("YYYY") == moment(end).format("YYYY") &&
                moment(start).format("MMMM") == moment(end).format("MMMM")
            ) {
                return (
                    moment(start).format("MMMM D") +
                    " - " +
                    moment(end).format("D YYYY")
                );
            } else {
                return (
                    moment(start).format("MMMM D YYYY") +
                    " - " +
                    moment(end).format("MMMM D YYYY")
                );
            }
        } else if (!start && !end && time_in && time_out) {
            return (
                moment(time_in).format("LT") +
                " - " +
                moment(time_out).format("LT")
            );
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Notifications" />
            <div className="text-2xl font-medium text-blue-900">
                Notifications
            </div>
            {!url.startsWith("/trainee/all-notifications?event") ? (
                <div className="!max-w-2xl mx-auto container p-4 mt-5">
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => router.get(route("trainee.allNotification"))}
                            className={"py-1.5 transition duration-150 w-24 rounded  " + (
                            !url.includes('unread') ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                        )}>
                            All
                        </button>
                        <button
                            className={"py-1.5 transition duration-150 w-24 rounded  " + (
                                url.includes('unread') ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                            )}
                            onClick={() =>
                                router.get(
                                    route("trainee.allNotification", {
                                        _query: {
                                            unread: true,
                                        },
                                    })
                                )
                            }
                        >
                            Unread
                        </button>
                    </div>
                    {(notifications.length === 0 && unread) && <div className="my-2 text-center">You have no {unread && "unread"} notification</div>}
                    {notifications.map((notif, index) => (
                        <NotificationCard
                            onClick={() =>
                                router.get(
                                    route("trainee.allNotification", {
                                        _query: {
                                            event: notif.event_id,
                                            id: notif.id,
                                        },
                                    })
                                )
                            }
                            key={index}
                            $unread={!notif.seen}
                        >
                            <div className="text-lg mb-2">
                                You have an upcoming event:
                            </div>
                            <div>
                                Date:{" "}
                                <span className="font-medium">
                                    {convertDate(
                                        notif.event_select.dateStart,
                                        notif.event_select.dateEnd
                                    )}
                                </span>
                            </div>
                            <div className="flex">
                                Title:{" "}
                                <div className="font-medium ml-1">
                                    {notif.event_select.title}
                                </div>
                            </div>
                            <div className="mt-2 text-sm">
                                {moment(notif.created_at).fromNow()}
                            </div>
                        </NotificationCard>
                    ))}
                </div>
            ) : (
                <OpenedNotification event={event} convertDate={convertDate} />
            )}
        </Authenticated>
    );
}

const OpenedNotification = ({ event, convertDate = () => {} }) => {
    return (
        <div className="!max-w-2xl mx-auto container p-4 mt-5">
            <div className="flex items-center mb-7">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center hover:text-blue-500"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                </button>
                <div className="text-sm ml-auto">
                    {moment(event.created_at).fromNow()}
                </div>
            </div>
            <div className="mb-7">
                <LabelText>Title</LabelText>
                <div className="">{event.title}</div>
            </div>
            <div className="mb-7">
                <LabelText>Objective</LabelText>
                <div className="whitespace-pre-wrap break-words">
                    {event.objective}
                </div>
            </div>
            <div className="mb-7">
                <LabelText>Venue / Link</LabelText>
                {event.platform == "Face-to-face" ? (
                    <div className="">{event.venue}</div>
                ) : (
                    <a href={event.venue} className="hover:text-blue-500">
                        {event.venue}
                    </a>
                )}
            </div>

            <div className="">
                <LabelText>Event schedule</LabelText>

                <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 mr-1.5" />
                    {event.is_range
                        ? convertDate(
                              event.event_code[0].time_in,
                              event.event_code[0].time_out
                          )
                        : convertDate(event.event_code[0].time_in)}
                    <ClockIcon className="h-5 w-5 ml-3 mr-1.5" />
                    {convertDate(
                        null,
                        null,
                        event.event_code[0].time_in,
                        event.event_code[0].time_out
                    )}
                </div>
            </div>
        </div>
    );
};

const LabelText = styled.div.attrs((props) => ({
    className: `uppercase text-xs text-gra y-600/80 font-gotham p-1 bg-gray-200 w-fit px-2 rounded mb-1`,
}))``;

const NotificationCard = styled.div.attrs((props) => ({
    className: `${
        props.$unread
            ? "bg-green-100 border-green-500 font-semibold"
            : "hover:bg-gray-200/80 hover:border-gray-400 border-gray-300 bg-gray-100/70"
    } px-4 border-l-4 transition duration-all p-2 cursor-pointer mb-1`,
}))``;

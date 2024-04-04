import { Transition } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

export default function Notifications({ show = false, getUnread = () => {} }) {
    const [notifications, setNotifications] = useState(null);
    const [unreads, setUnreads] = useState(0)

    function getNotification() {
        axios.get(route("trainee.allNotification.json")).then((res) => {
            let data = res.data
            setNotifications(data.notifications);
            setUnreads(data.unseen)
        });
    }

    function markAsRead(notif) {
        if(unreads > 0)
            setUnreads(unreads-1)

        router.get(route("trainee.allNotification", {
            _query: {
                event: notif.event_id,
                id: notif.id,
            },
        }))
    }

    useEffect(() => {
        getNotification();
    }, [show]);

    useEffect(() => {
        getUnread(unreads)
    }, [unreads])

    return (
        <>
            <Transition
                show={show}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div className="p-3 px-0 bg-white shadow-lg absolute md:right-0 -right-36 ring-1 ring-slate-200/50 rounded-md sm:w-[23rem] w-[18rem] c">
                    <div className="px-3 font-gotham text-left flex">
                        Notifications
                        <span
                            onClick={() =>
                                router.get(route("trainee.allNotification"))
                            }
                            className="font-sans ml-auto cursor-pointer hover:underline"
                        >
                            Show all
                        </span>
                    </div>

                    <div className="max-h-[30rem] mt-3 overflow-y-auto">
                        {(unreads && unreads !== 0) ? <div className="mb-2 px-3">You have {unreads} unread notifications</div> : ""}
                        {notifications ? (
                            notifications.map((item, index) => (
                                <Card key={index} onClick={()=>markAsRead(item)} as="button" $active={!item.seen}>
                                    <div className="p-3 h-fit text-green-700 rounded-full bg-green-300/30">
                                        <CalendarDaysIcon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <div>
                                            You have an upcoming event:
                                            <div
                                                className={
                                                    "font-semibold line-clamp-2"
                                                }
                                            >
                                                {item.event_select?.title}
                                            </div>
                                        </div>

                                        <div className="text-sm mt-2">
                                            {moment(item.created_at).fromNow()}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </>
                        )}
                    </div>
                </div>
            </Transition>
        </>
    );
}

const Card = styled.div.attrs((props) => ({
    className: ` ${
        props.$active
            ? "border-green-500 bg-green-50 hover:bg-green-100"
            : "hover:bg-gray-100 border-transparent"
    } border-l-4 p-2 pr-3 flex gap-2.5 w-full`,
}))``;

const LoadingCard = () => (
    <Card className="bg-gray-100/70 animate-pulse">
        <div className="p-7 h-fit text-green-700 rounded-full bg-gray-200">
        </div>
        <div className="text-left w-full py-2">
            <div className="w-full">
                <div className="h-2 bg-gray-200 w-full rounded-full"></div>
                <div className="h-2 bg-gray-200 w-1/2 rounded-full mt-3"></div>
                <div className="h-2 bg-gray-200 w-1/2 rounded-full mt-1"></div>
            </div>
        </div>
    </Card>
);

import {
    ChatBubbleBottomCenterIcon,
    ChatBubbleBottomCenterTextIcon,
    ExclamationCircleIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Paginate from "../Paginate";
import { router, useForm } from "@inertiajs/react";
import ViewEvent from "./ViewEvent";
import styled from "styled-components";
import DeleteConfirmation from "../DeleteConfirmation";
import AddRemarks from "./AddRemarks";

export default function EventList({
    MySwal,
    initialList = {},
    search = "",
    showDelete,
    sortAndOrderByAndFilter,
    loadingSearch,
    setLoadingSearch,
    onCloseDelete,
}) {
    const { post, processing } = useForm({});
    const { sortBy, orderBy, filterEvent, dirty } = sortAndOrderByAndFilter;
    const [pages, setPages] = useState(null);
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [eventPageList, setEventPageList] = useState(null);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [showEventRemarks, setShowEventRemarks] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const setEventData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setEventPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of resource person list
        setEvents(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendRequest = (pageNumber) => {
        return axios.get(
            route("event.search", {
                _query: {
                    search: search,
                    filterEvent: filterEvent,
                    sort: sortBy,
                    order: orderBy,
                    page: pageNumber
                },
            })
        );
    };

    const getNextAndPrevPages = async (pageNumber) => {
        setLoadingSearch(true);
        const response = await sendRequest(pageNumber);
        setEventData(response.data);
        setLoadingSearch(false);
    };

    const getDateStatus = (
        { dateStart, dateEnd, is_range, event_code },
        returnValue = false
    ) => {
        const currentDate = new Date();
        const currentDateTime = new Date();
        const endDate = new Date(dateEnd);
        const startDate = new Date(dateStart);
        const timeOut = new Date(event_code[0].time_out);

        startDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (!is_range) {
            if (startDate.getTime() > currentDate.getTime()) {
                return !returnValue ? (
                    <EventStatus $status="bg-orange-100 text-orange-600">
                        upcoming
                    </EventStatus>
                ) : (
                    1
                );
            } else if (
                startDate.getTime() == currentDate.getTime() &&
                timeOut.getTime() >= currentDateTime.getTime()
            ) {
                return !returnValue ? (
                    <EventStatus $status="bg-green-100 text-green-600">
                        active
                    </EventStatus>
                ) : (
                    1
                );
            } else {
                return (
                    <EventStatus $status="bg-red-100 text-red-600">
                        ended
                    </EventStatus>
                );
            }
        } else {
            if (startDate.getTime() > currentDate.getTime())
                return !returnValue ? (
                    <EventStatus $status="bg-orange-100 text-orange-600">
                        upcoming
                    </EventStatus>
                ) : (
                    1
                );
            else if (
                currentDate.getTime() >= startDate.getTime() &&
                currentDate.getTime() <= endDate.getTime() &&
                timeOut.getTime() <= currentDateTime.getTime()
            )
                return !returnValue ? (
                    <EventStatus $status="bg-green-100 text-green-600">
                        active
                    </EventStatus>
                ) : (
                    2
                );
            else
                return !returnValue ? (
                    <EventStatus $status="bg-red-100 text-red-600">
                        ended
                    </EventStatus>
                ) : (
                    3
                );
        }
    };

    const getEventCode = ({ event_code }) => {
        let activeCode = event_code.find((code) => {
            const codeDate = new Date(code.time_in);
            const currentDate = new Date();

            currentDate.setHours(0, 0, 0, 0);
            codeDate.setHours(0, 0, 0, 0);

            if (codeDate >= currentDate || codeDate == currentDate) {
                return code;
            }
        });

        if (activeCode) {
            if (
                new Date() <= new Date(activeCode.time_in) ||
                new Date() < new Date(activeCode.time_out)
            )
                return activeCode.time_in_code;
            else if (
                new Date() >= new Date(activeCode.time_out) ||
                new Date() <= new Date(activeCode.time_out_cutoff)
            ) {
                return activeCode.time_out_code;
            }
        } else {
            return <div className="text-red-600">Ended</div>;
        }
    };

    async function getSearches() {
        let response = await sendRequest(1);

        let data = response.data;
        setEventData(data);
        setLoadingSearch(false);
    }

    useEffect(() => {
        // sends request when search has value

        if (search) {
            setLoadingSearch(true);

            getSearches();
        }

        if (!search && !dirty) {
            setEventData(initialList);
        }

        if (dirty) {
            setLoadingSearch(true);

            getSearches();
        }

        if (!pages) {
            setEventData(initialList);
        }
    }, [search, sortAndOrderByAndFilter]);

    return (
        <>
            <div className="grid grid-cols-[7rem,8rem,1fr] border-b mt-3">
                <div className="font-bold font-open p-1.5 px-3">Code</div>
                <div className="font-bold font-open p-1.5 px-3">Status</div>
                <div className="font-bold font-open p-1.5 px-3">Name</div>
            </div>

            <div className="h-[calc(100vh-17rem)] pt-2 overflow-y-auto overscroll-contain">
                {loadingSearch ? (
                    <LoadingList />
                ) : events.length === 0 ? (
                    <Empty />
                ) : (
                    events.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[7rem,8rem,1fr] h-14 rounded-md hover:bg-slate-100/50 ring-1 ring-inset ring-transparent 
                            hover:ring-slate-200/90 transition-all duration-150 mb-1 cursor-default group"
                            onClick={() => setSelected(item)}
                        >
                            <div className="px-3 py-1.5 flex items-center text-sm font-semibold">
                                <div className="whitespace-pre-wrap break-words max-w-[14rem]">
                                    {getEventCode(item)}
                                </div>
                            </div>
                            <div className="px-3 py-1.5 flex items-center">
                                {getDateStatus(item)}
                            </div>
                            <div className="px-3 py-1.5 flex items-center">
                                <div className="line-clamp-1">{item.title}</div>
                                <div className="hidden ml-auto gap-2 group-hover:flex pl-3">
                                    <button
                                        className="rounded-md p-2 shrink-0 hover:bg-slate-200 text-"
                                        title="View"
                                        onClick={() => {
                                            setShowEventDetails(true);
                                        }}
                                    >
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="rounded-md p-2 shrink-0 hover:bg-slate-200 text -green-700"
                                        title="Edit"
                                        onClick={() =>
                                            router.get(
                                                route("event"),
                                                {
                                                    event: "event",
                                                    event_id: item.id,
                                                },
                                                {
                                                    replace: true,
                                                }
                                            )
                                        }
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="rounded-md p-2 shrink-0 hover:bg-slate-200 text -green-700"
                                        title="Remarks"
                                        onClick={() => {
                                            setShowEventRemarks(true);
                                        }}
                                    >
                                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirmation(true)
                                        }
                                        className="rounded-md p-2 shrink-0 hover:bg-slate-200 text -red-600"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {pages?.last_page > 1 && (
                <Paginate
                    disabled={{
                        next: pages?.next_page_url ? true : false,
                        previous: pages?.prev_page_url ? true : false,
                    }}
                    contentList={pages}
                    onPrevious={() =>
                        getNextAndPrevPages(pages.current_page - 1)
                    }
                    onNext={() => getNextAndPrevPages(pages.current_page + 1)}
                />
            )}

            <ViewEvent
                show={showEventDetails}
                eventToView={selected}
                onClose={() => setShowEventDetails(false)}
            />

            <DeleteConfirmation
                show={showDeleteConfirmation}
                processing={processing}
                onCancel={setShowDeleteConfirmation}
                onConfirmDelete={() => {
                    post(route("event.delete", [selected?.id]));
                }}
            >
                <div className="font-semibold text-lg text-red-700 flex items-center gap-2 justify-center">
                    <ExclamationCircleIcon className="w-5 h-5 stroke-2" />
                    Delete Event
                </div>

                {!processing && (
                    <div className={"mb-10 mt-2 text-center "}>
                        <span className="font-semibold">{selected?.title}</span>
                        <br />
                        <br />
                        Are you sure you want to delete this event?
                        <br />
                        This action cannot be undone and all associated data
                        will removed.
                    </div>
                )}
                {processing && (
                    <div
                        className={
                            "font-semibold text-lg text-red-600 mb-12 mt-2 text-center "
                        }
                    >
                        Deleting...
                    </div>
                )}
            </DeleteConfirmation>

            <AddRemarks
                show={showEventRemarks}
                event={selected}
                onClose={() => setShowEventRemarks(false)}
                onSuccess={(message, remark, eventId) => {
                    let updateEvent = events.map((event) => {
                        if(event.id == eventId) {
                            return {
                                ...event, 
                                remarks: remark
                            }
                        }
                        return event
                    })
                    setEvents(updateEvent)
                    setShowEventRemarks(false)
                    MySwal.fire({
                        text: message,
                        icon: "success",
                        toast: true,
                        position: "top-right",
                        timerProgressBar: true,
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }}
            />
        </>
    );
}

const LoadingList = () => {
    return (
        <div>
            {["delay-100", "delay-200", "delay-300"].map((delay, index) => (
                <div
                    key={index}
                    className={
                        "grid grid-cols-[7rem,8rem,1fr] h-12 rounded-md bg-gray-100/40 animate-pulse items-center mb-1 " +
                        delay
                    }
                >
                    <div className="flex items-center p-2">
                        <div className="rounded-full bg-gray-300 h-2 w-full"></div>
                    </div>
                    <div className="flex items-center p-2">
                        <div className="rounded-full bg-gray-300 h-2 w-full"></div>
                    </div>
                    <div className="flex items-center p-2">
                        <div className="rounded-full bg-gray-300 h-2 w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Empty = () => {
    return <div className="p-3 w-full text-center">No records</div>;
};

const EventStatus = styled.div.attrs((props) => ({
    className: `${props.$status} rounded text-xs font-gotham uppercase p-1 px-1.5`,
}))``;

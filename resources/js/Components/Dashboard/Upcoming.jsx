import { useEffect, useState } from "react";
import Paginate from "../Paginate";
import SearchInput from "../SearchInput";
import moment from "moment";
import LoadingSearch, { LoadingList } from "../LoadingSearch";
import styled from "styled-components";
import ActiveEvent from "./ActiveEvents";
import {
    CalendarDaysIcon,
    CalendarIcon,
    LinkIcon,
    MapPinIcon,
} from "@heroicons/react/20/solid";

export default function Upcoming({ initialList, active }) {
    const [upcomingPageList, setUpcomingPageList] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState(initialList.data);
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [tabs, setTabs] = useState(false);

    const setUpcomingData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setUpcomingPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of event list
        setUpcomingEvents(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        setLoadingSearch(true);
        const response = await axios.get(
            route("event.upcoming.search", {
                _query: {
                    search: search,
                    page: pageNumber,
                },
            })
        );
        setUpcomingData(response.data);
        setLoadingSearch(false);
    };

    const convertDate = (
        start = null,
        end = null,
        time_in = null,
        time_out = null
    ) => {
        if (start && !end && !time_in && !time_out) {
            return moment(start).format("ll");
        } else if (start && end && !time_in && !time_out) {
            if (
                moment(start).format("YYYY") == moment(end).format("YYYY") &&
                moment(start).format("MMMM") == moment(end).format("MMMM")
            ) {
                return (
                    moment(start).format("MMM D") +
                    " - " +
                    moment(end).format("D YYYY")
                );
            } else {
                return (
                    moment(start).format("MMM D YYYY") +
                    " - " +
                    moment(end).format("MMM D YYYY")
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

    const onSearchUpcoming = (searchValue) => {
        axios
            .get(
                route("event.upcoming.search", {
                    _query: {
                        search: searchValue,
                    },
                })
            )
            .then((res) => {
                setUpcomingData(res.data);
                setLoadingSearch(false);
            });
    };

    useEffect(() => {
        if (!search) {
            setUpcomingData(initialList);
        }
    }, [search]);

    return (
        <div className="h-full rounded-md ring-1 ring-slate-200/40 bg-white p-4 grow">
            <div className="mb-4 flex gap-3">
                <Tabs $active={!tabs} onClick={() => setTabs(false)}>
                    {" "}
                    Upcoming{" "}
                </Tabs>
                <Tabs $active={tabs} onClick={() => setTabs(true)}>
                    {" "}
                    Active{" "}
                </Tabs>
            </div>
            {!tabs ? (
                <>
                    <div className="flex sm:flex-row flex-col sm:items-center">
                        <div className="text-blue-800 font-semibold lg:text-lg sm:text-base text-sm">
                            Upcoming Cap Dev Training
                        </div>
                        <div className="flex border h-9 rounded-md overflow-hidden sm:ml-auto mt-3 sm:mt-0">
                            <div className="sm:w-56">
                                <SearchInput
                                    onSearch={(value) =>
                                        onSearchUpcoming(value)
                                    }
                                    onInput={(input) =>
                                        input && setLoadingSearch(true)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 h-full">
                        <div className="overflow-y-auto overscroll-contain sm: h-[18rem] pt-1">
                            {loadingSearch ? (
                                <LoadingList
                                    column={1}
                                    grid="grid-cols-[1fr]"
                                />
                            ) : upcomingEvents.length === 0 ? (
                                <Empty />
                            ) : (
                                upcomingEvents.map((list, index) => (
                                    <div
                                        key={index}
                                        className="rounded-md overflow-hidden ring-1 ring-inset ring-slate-200 bg-slate-100/80 mb-1 p-1.5 px-2.5 cursor-default"
                                    >
                                        <div className="font-bold">
                                            {list.title}
                                        </div>
                                        <div className="flex md:flex-row flex-col md:gap-5">
                                            <div className="text-sm opacity-80 flex items-center gap-1 shrink-0">
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                {convertDate(
                                                    list.dateStart,
                                                    list.dateEnd,
                                                    null,
                                                    null,
                                                    true
                                                )}{" "}
                                                |
                                                {" "}
                                                {convertDate(
                                                    null,
                                                    null,
                                                    list.event_code[0].time_in,
                                                    list.event_code[0].time_out
                                                )}
                                            </div>
                                            {list.platform == "Face-to-face" ? (
                                                <div className="text-sm opacity-80 flex items-center gap-1">
                                                    <MapPinIcon className="w-4 h-4 shrink-0" />
                                                    <div className="line-clamp-1">
                                                        {list.venue}
                                                    </div>
                                                </div>
                                            ) : (
                                                <a
                                                    href={list.venue}
                                                    target="_blank"
                                                    className="hover:text-blue-500 cursor-pointer line-clamp-1 text-sm flex items-center gap-1"
                                                >
                                                    <LinkIcon className="w-4 h-4 shrink-0" />
                                                    <div className="line-clamp-1">
                                                        {list.venue} 
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {pages?.last_page > 1 && (
                            <Paginate
                                disabled={{
                                    next: pages?.next_page_url ? true : false,
                                    previous: pages?.prev_page_url
                                        ? true
                                        : false,
                                }}
                                contentList={pages}
                                onPrevious={() =>
                                    getNextAndPrevPages(pages.current_page - 1)
                                }
                                onNext={() =>
                                    getNextAndPrevPages(pages.current_page + 1)
                                }
                            />
                        )}
                    </div>
                </>
            ) : (
                <ActiveEvent active={active} />
            )}
        </div>
    );
}

const Empty = () => {
    return <div className="p-3 w-full text-center">No records</div>;
};

const Tabs = styled.button.attrs(({ $active }) => ({
    type: "button",
    className: `px-3 h-8 rounded-md ${
        $active ? "bg-blue-500/20 text-blue-600" : "hover:bg-blue-600/5"
    }`,
}))``;

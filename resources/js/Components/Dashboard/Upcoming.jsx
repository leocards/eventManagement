import { useEffect, useState } from "react";
import Paginate from "../Paginate";
import SearchInput from "../SearchInput";
import moment from "moment";
import LoadingSearch, { LoadingList } from "../LoadingSearch";

export default function Upcoming({ initialList }) {
    const [upcomingPageList, setUpcomingPageList] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState(initialList.data);
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);

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
        const response = await axios.get(route('event.upcoming.search', {
            _query: {
                search: search,
                page: pageNumber
            }
        }));
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
        axios.get(route('event.upcoming.search', {
            _query: {
                search: searchValue
            }
        }))
        .then(res => {
            setUpcomingData(res.data)
            setLoadingSearch(false)
        })
    }

    useEffect(() => {
        if(!search) {
            setUpcomingData(initialList);
        }
    }, [search])

    return (
        <div className="h-full rounded-md ring-1 ring-slate-200/40 bg-white p-4 grow">
            <div className="flex">
                <div className="text-blue-800 font-semibold text-lg">
                    Upcoming Cap Dev Training
                </div>
                <div className="flex w-fit border h-9 rounded-md overflow-hidden ml-auto">
                    <div className="w-56">
                        <SearchInput onSearch={(value) => onSearchUpcoming(value)} onInput={(input) => input && setLoadingSearch(true)} />
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="grid grid-cols-[7rem,7rem,12rem,1fr] font-open font-bold border-b pb-2">
                    <div className="px-2">Date</div>
                    <div className="px-2">Time</div>
                    <div className="px-2">Venue/Link</div>
                    <div className="px-2">Cap Dev Training</div>
                </div>

                <div className="overflow-y-auto overscroll-contain h-[18rem] pt-1">
                    
                    { 
                        loadingSearch ? (
                            <LoadingList column={4} grid="grid-cols-[7rem,7rem,12rem,1fr]" />
                        ) : upcomingEvents.length === 0 ? (
                            <Empty />
                        ) : (
                            upcomingEvents.map((list, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[7rem,7rem,12rem,1fr] h-14 cursor-default rounded-md overflow-hidden list-hover mb-1"
                                >
                                    <div className="px-2 flex items-center text-sm">
                                        {convertDate(list.dateStart,list.dateEnd)}
                                    </div>
                                    <div className="px-2 flex items-center text-sm !lowercase">
                                        {convertDate(null,null,list.event_code[0].time_in, list.event_code[0].time_out)}
                                    </div>
                                    <div className="px-2 flex items-center">
                                        {list.platform == "Face-to-face" ? (
                                            <div className="line-clamp-1">{list.venue}</div>
                                        ) : (
                                            <a
                                                href={list.venue}
                                                target="_blank"
                                                className="hover:text-blue-500 cursor-pointer line-clamp-2 text-sm"
                                            >
                                                {list.venue}
                                            </a>
                                        )}
                                    </div>
                                    <div className="px-2 flex items-center">
                                        <div className="line-clamp-1">{list.title}</div>
                                    </div>
                                </div>
                            ))
                        )
                    
                    }
                </div>
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
                    onNext={() =>
                        getNextAndPrevPages(pages.current_page + 1)
                    }
                />
            )}
        </div>
    );
}

const Empty = () => {
    return <div className="p-3 w-full text-center">No records</div>;
};

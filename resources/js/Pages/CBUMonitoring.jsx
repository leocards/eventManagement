import { SelectByYear } from "@/Components/Event/PopOver";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import PrintEvaluations from "@/Components/Reports/Print/PrintEvaluations";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CBUMonitoring({ auth, cbu_summary, years }) {
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearEvents, setYearEvents] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [CBUs, setCBUs] = useState([]);
    const [cbuPageList, setCbuPageList] = useState(null);
    const [pages, setPages] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(null);
    const [search, setSearch] = useState("");
    const [isPrint, setIsPrint] = useState(false)

    const setCBUData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setCbuPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of cbu list
        setCBUs(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendRequest = (pageNumber) => {
        return axios.get(
            route("cbu-monitoring.json", {
                _query: {
                    page: pageNumber,
                    search: search,
                    year: selectedYear,
                },
            })
        );
    };

    async function getCbu() {
        setLoadingSearch(true);
        let response = await sendRequest(1);
        let data = response.data;
        setCBUData(data);
        setLoadingSearch(false);
    }

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        // when clicking next or previous pages or when the persist is true
        // request data in the current page
        if (!cbuPageList.hasOwnProperty(pageNumber) || persist) {
            setLoadingSearch(true);
            const response = sendRequest(pageNumber);
            setCBUData(response.data);
            setLoadingSearch(false);
        } else {
            setCBUData(rpPageList[pageNumber]);
        }
    };

    useEffect(() => {
        if (search) {
            getCbu()
        } else if(selectedYear) getCbu()
        else setCBUData(cbu_summary)
    }, [search]);

    useEffect(() => {
        getCbu();
    }, [selectedYear]);

    useEffect(() => {
        axios.get(route('cbu-monitoring.events'))
            .then(res => {
                setYearEvents(res.data)
            }) 
    }, [])

    return (
        <Authenticated user={auth.user}>
            <Head title="CBU" />

            <PageHeader
                title="CBU Training Monitoring"
                links={["CBU Training Monitoring"]}
            />

            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg text-blue-800">
                    Summary
                </div>

                <button
                    disabled={!selectedYear}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                    transition duration-150 hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => { setIsPrint(true)/* window.open(route('print.cbu', {_query: { year: selectedYear}})) */}}
                >
                    <PrinterIcon className="w-5 h-5" />
                    <div>Print</div>
                </button>
            </div>

            <div className="container">
                <div className="p-2 flex gap-2 ml-auto">
                    {selectedYear && (
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="bg-gray-100 text-gray-700 cursor-pointer px-2.5 shrink-0 whitespace-nowrap rounded"
                        >
                            {showMore ? "Hide" : "Show"} Events for the year {selectedYear}
                        </button>
                    )}
                    <div className="ml-auto">
                        <SelectByYear
                            eventYears={years}
                            onSelectYear={setSelectedYear}
                            selectedYear={selectedYear}
                        />
                    </div>
                </div>

                {selectedYear && (
                    <div className={showMore ? "p-2 pt-0" : ""}>
                        {showMore && (
                            <div className="overflow-y-auto overscroll-contain max-h-[13rem] px-2">
                                {yearEvents.map((event, index) => (
                                    event.year == selectedYear && <EventListItem
                                        key={index}
                                        title={event.title}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="container p-3 h-[calc(100vh-6rem)] mt-3">
                <div className="flex w-fit border h-9 rounded-md overflow-hidden ml-auto">
                    <div className="w-56">
                        <SearchInput onSearch={(value) => setSearch(value)} onInput={(input) => input && setLoadingSearch(input)} />
                    </div>
                </div>

                <div className="grid grid-cols-[7rem,1fr,15rem,14rem] font-bold font-open mt-3 pb-2 border-b">
                    <div className="px-2">No.</div>
                    <div className="px-2">Trainee</div>
                    <div className="px-2 text-center">Remarks</div>
                    <div className="px-2 text-center">
                        Total Trainings Attended
                    </div>
                </div>
                <div className="overflow-y-auto pt-2 pb-1">
                    {loadingSearch ? (
                        <LoadingList
                            column={4}
                            grid="grid-cols-[7rem,1fr,15rem,14rem]"
                        />
                    ) : !loadingSearch && search && CBUs.length === 0 ? (
                        <div className="text-center my-5">No results found for "{search}"</div>
                    ) : !loadingSearch && !search && CBUs.length === 0 ? (
                        <div className="text-center my-5">No records</div>
                    ) : (
                        CBUs.map((cbu, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[7rem,1fr,15rem,14rem] h-12 mb-1 rounded-md list-hover cursor-default"
                            >
                                <div className="px-4 flex items-center">
                                    {index + 1}
                                </div>
                                <div className="px-2 flex items-center">
                                    <div className="line-clamp-1">
                                        {cbu.first_name} {cbu.last_name}
                                    </div>
                                </div>
                                <div className="px-2 flex items-center justify-center">
                                    {cbu.status !== "Active" ? cbu.status : ""}
                                </div>
                                <div className="px-2 flex items-center justify-center">
                                    {cbu.trainings_attended_count ||
                                        "0"}
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
                        onNext={() =>
                            getNextAndPrevPages(pages.current_page + 1)
                        }
                    />
                )}
            </div>

            {selectedYear && <PrintEvaluations show={isPrint} onCancel={() => setIsPrint(false)} src={route('print.cbu', { _query: { year:  selectedYear} })} />}
        </Authenticated>
    );
}

const EventListItem = ({ title }) => (
    <div className="flex">
        <div className="list-item list-inside"></div>
        <div>{title}</div>
    </div>
);

// className={

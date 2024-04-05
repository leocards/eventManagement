import ExportButton from "@/Components/Buttons/ExportExcelButton";
import { FilterByQuarter, SelectByYear } from "@/Components/Event/PopOver";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import PrintEvaluations from "@/Components/Reports/Print/PrintEvaluations";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { PrinterIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Head, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export default function CBUMonitoring({ auth, cbu_summary, inactiveUser, years, remarks }) {
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearEvents, setYearEvents] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [CBUs, setCBUs] = useState([]);
    const [cbuPageList, setCbuPageList] = useState(null);
    const [pages, setPages] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(null);
    const [search, setSearch] = useState("");
    const [isPrint, setIsPrint] = useState(false)
    const [filterRemarks, setFilterRemarks] = useState("All")
    const windowSize = useSelector(state => state.windowWidth.size);
    //const [inactives, setInactives] = useState([])

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
                    filter: filterRemarks
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
            const response = await sendRequest(pageNumber);
            setCBUData(response.data);
            setLoadingSearch(false);
        } else {
            setCBUData(cbuPageList[pageNumber]);
        }
    };

    const onSelectYearCbu = year => {
        setCbuPageList(null)
        setSelectedYear(year)
    }

    useEffect(() => {
        if (search) {
            getCbu()
        } else if(selectedYear) getCbu()
        else {
            setCBUData(cbu_summary)
            //setInactives(inactiveUser)
        }
    }, [search]);

    useEffect(() => {
        getCbu();
    }, [selectedYear, filterRemarks]);

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

            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                <div className="font-semibold text-lg text-blue-800">
                    Summary
                </div>

                <div className="flex ml-auto mt-3 sm:mt-0">
                    <ExportButton exportRoute={route('export.cbu', {year: selectedYear??moment().format('YYYY')})} className={`${!selectedYear ? 'opacity-50 pointer-events-none':'hover:shadow-md'}`} />

                    <button
                        disabled={!selectedYear}
                        className="flex items-center gap-2 rounded-md px-3 py-1.5 sm:pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                        transition duration-150 hover:shadow-md disabled:opacity-50 disabled:pointer-events-none ml-3"
                        onClick={() => { setIsPrint(true)/* window.open(route('print.cbu', {_query: { year: selectedYear}})) */}}
                    >
                        <PrinterIcon className="w-5 h-5" />
                        <div className="sm:block hidden">Print</div>
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="p-2 flex gap-2 ml-auto">
                    {selectedYear && (
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="bg-gray-100 text-gray-700 cursor-pointer px-2.5 shrink-0 whitespace-nowrap rounded sm:text-base text-sm"
                        >
                            {showMore ? "Hide" : "Show"} Events
                        </button>
                    )}
                    <div className="ml-auto">
                        <SelectByYear
                            eventYears={years}
                            onSelectYear={onSelectYearCbu}
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

            <div className="container p-3 mt-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <FilterByQuarter size="w-52" list={remarks} selectedQuarter={filterRemarks} onSelect={setFilterRemarks} />
                    <div className="flex xs:w-fit border h-9 rounded-md overflow-hidden xs:ml-auto mt-3 md:mt-0">
                        <div className="xs:w-56 w-full">
                            <SearchInput onSearch={(value) => setSearch(value)} onInput={(input) => input && setLoadingSearch(input)} />
                        </div>
                    </div>
                </div>

                <div className="max-xs:overflow-x-auto">
                    <div className="grid grid-cols-[5rem,1fr,1fr] sm:text-base text-sm md:grid-cols-[5rem,1fr,15rem,14rem] font-bold font-open mt-3 pb-2 border-b">
                        <div className="px-2">No.</div>
                        <div className="px-2">Trainee</div>
                        <div className="px-2 text-center md:block hidden">Remarks</div>
                        <div className="px-2 text-center">
                            Total Trainings Attended
                        </div>
                    </div>

                    <div className="overflow-y-auto h-[calc(100vh-15rem)] pt-2 pb-1">
                        {loadingSearch ? (
                            <LoadingList
                                column={windowSize < 768 ? 3:4}
                                grid="grid-cols-[5rem,1fr,1fr] md:grid-cols-[5rem,1fr,15rem,14rem]"
                            />
                        ) : !loadingSearch && search && CBUs.length === 0 ? (
                            <div className="text-center my-5">No results found for "{search}"</div>
                        ) : !loadingSearch && !search && CBUs.length === 0 ? (
                            <div className="text-center my-5">No records</div>
                        ) : (
                            CBUs.map((cbu, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[5rem,1fr,1fr] md:grid-cols-[5rem,1fr,15rem,14rem] h-12 mb-1 rounded-md list-hover cursor-default"
                                >
                                    <div className="px-4 flex items-center">
                                        {pages.from + index}
                                    </div>
                                    <div className="px-2 flex items-center">
                                        <div className="line-clamp-1">
                                            {cbu.first_name} {cbu.last_name}
                                        </div>
                                    </div>
                                    <div className="px-2 hidden items-center justify-center md:flex">
                                        {cbu.status != "Active" ?cbu.status:""}
                                    </div>
                                    <div className="px-2 flex items-center justify-center">
                                        {cbu.trainings_attended?(cbu.trainings_attended[0]?.trainings||"0") : "0"}
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

            </div>

            {selectedYear && <PrintEvaluations show={isPrint} withLayout onCancel={() => setIsPrint(false)} src={route('print.cbu', { _query: { year:  selectedYear} })} />}
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

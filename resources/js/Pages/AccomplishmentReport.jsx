import ViewAccomplishment from "@/Components/Evaluation/Admin/ViewAccomplishment";
import { FilterByQuarter, SelectByYear } from "@/Components/Event/PopOver";
import { LoadingList } from "@/Components/LoadingSearch";
import Reports from "@/Components/Reports/Reports";
import SearchInput from "@/Components/SearchInput";
import { PrinterIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { convertDate } from "@/js/DateFormatter";
import { useEffect, useState } from "react";

export default function AccomplishmentReport({ auth, report, years }) {
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null)
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [yearSelected, setYearSelected] = useState(2024);
    const [quarterSelected, setQuarterSelected] = useState("All");
    const [accomplishments, setAccomplishments] = useState([]);
    const [showViewAccomplishment, setShowViewAccomplishment] = useState(false);
    const [accomplishmentPageList, setAccomplishmentsPageList] = useState(null);
    const byQuarter = {
        "1st Quarter": 1,
        "2nd Quarter": 2,
        "3rd Quarter": 3,
        "4th Quarter": 4,
        "This month": "month",
    }

    const setAccomplishmentData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setAccomplishmentsPageList((prev) => ({
            ...prev,
            [currentPage]: initial,
        }));

        // set the current data of accomplishment list
        setAccomplishments(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendRequest = (pageNumber = null, quarter = null) => {
        setLoadingSearch(true)
        return axios.get(route("reports.accomplishment.data"), {
            params: {
                year: yearSelected,
                quarter: quarter[quarterSelected],
                page: pageNumber,
                search: search
            }
        });
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        // when clicking next or previous pages or when the persist is true
        // request data in the current page
        setLoadingSearch(true);
        const response = await sendRequest(pageNumber);
        setAccomplishmentData(response.data);
        setLoadingSearch(false);
    };

    useEffect(() => {
        if (yearSelected) {
            const quarter = {
                All: null,
                "1st Quarter": 1,
                "2nd Quarter": 2,
                "3rd Quarter": 3,
                "4th Quarter": 4,
                "This month": "month",
            }
            
            sendRequest(null, quarter).then((res) => {
                let { data } = res;
                let er = data.data[0]
                if(er?.evaluation_rates) {
                    er.evaluation_rates = er.evaluation_rates.map((rate) => {
                        return {
                            percent: ((rate.rates/er.participant_count) * 100).toFixed(2) + '%',
                            count: rate.rates,
                            level: (rate.q12 == 5 ? "Excellent" : (rate.q12 == 4?"Very Satisfied":(rate.q12 == 3?"Satisfied":(rate.q12==2?"Fair":"Poor"))))
                        }
                    }) 
                }
                setAccomplishmentData(data);
                setLoadingSearch(false)
            });
        }
    }, [quarterSelected, yearSelected, search]);

    return (
        <Reports auth={auth} report={report}>
            <div className="container p-3 mt-3">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg text-blue-900">
                        Institutional Development and Capability Building (IDCB)
                        Accomplishment Report
                    </div>

                    <button
                        disabled={quarterSelected == "All"}
                        className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                        transition duration-150 hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => window.open(route('print.accomplishment', {_query: { year: yearSelected, quarter: byQuarter[quarterSelected]}}))}
                    >
                        <PrinterIcon className="w-5 h-5" />
                        <div>Print</div>
                    </button>
                </div>

                <div className="flex items-center my-3">
                    <div className="flex gap-2">
                        <SelectByYear
                            eventYears={years}
                            selectedYear={yearSelected}
                            onSelectYear={setYearSelected}
                        />
                        {years.length > 0 && <FilterByQuarter
                            selectedQurter={quarterSelected}
                            onSelect={setQuarterSelected}
                        />}
                    </div>
                    <div className="flex w-fit border h-9 rounded-md overflow-hidden ml-auto">
                        <div className="w-56">
                            <SearchInput
                                onSearch={(value) => setSearch(value)}
                                onInput={(input) => input && setLoadingSearch(input)}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="grid grid-cols-[5vw,15vw,1fr,9vw,12vw] font-bold font-open pb-2 border-b">
                        <div className="px-2 self-center text-center">No.</div>
                        <div className="px-2 self-center">Title</div>
                        <div className="px-2 self-center">Objectives</div>
                        <div className="px-2 self-center">Date</div>
                        <div className="px-2 self-center break-words">
                            Evaluation results
                        </div>
                    </div>

                    <div className="h-[calc(100vh-17rem)] pt-2 overflow-y-auto overscroll-contain">
                        {
                            loadingSearch ? (
                                <LoadingList column={5} grid="grid-cols-[5vw,15vw,1fr,9vw,12vw]" />
                            ) : !loadingSearch && search && accomplishments.length === 0 ? (
                                <div className="my-2 text-center">No records found for "{search}"</div>
                            ) : accomplishments.length === 0 ? (
                                <div className="my-2 text-center">No records found</div>
                            ) : (
                                accomplishments.map((acc, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setShowViewAccomplishment(true)
                                            setSelected(acc)
                                        }}
                                        className="grid grid-cols-[5vw,15vw,1fr,9vw,12vw] py-2 mb-1 rounded-md list-hover cursor-pointer hover:bg-blue-100/50 hover:ring-blue-100"
                                    >
                                        <div className="px-2 self-center text-center">{pages.current_page+index}</div>
                                        <div className="px-2 self-center line-clamp-3">{acc.title}</div>
                                        <div className="px-2 self-center line-clamp-3">{acc.objective}</div>
                                        <div className="px-2 self-center">{convertDate(acc.dateStart, acc.dateEnd, null,null, true)}</div>
                                        <div className="px-2 self-center break-words text-sm">
                                            {
                                                acc.evaluation_rates.map((rates, index) => (
                                                    <div key={index}>{rates.level}: <span className="font-bold"><span className="font-gotham">{rates.count}</span> ({rates.percent})</span></div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            )
                        }
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
                </div>
            </div>

            <ViewAccomplishment
                show={showViewAccomplishment}
                onClose={() => setShowViewAccomplishment(false)}
                event_accomplishment={selected}
            />
        </Reports>
    );
}

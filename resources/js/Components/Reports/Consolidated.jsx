import {
    PrinterIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Paginate from "../Paginate";
import SearchInput from "../SearchInput";
import { useEffect, useRef, useState } from "react";
import ReferenceQuestion from "./ReferenceQuestion";
import { LoadOnSubmit, LoadingList } from "../LoadingSearch";
import PrintConsolidatedModal from "./Print/PrintEvaluations";

export default function Consolidated({ isPrintable = false, eventId, initialData }) {
    const [pages, setPages] = useState(null)
    const [isPrint, setIsPrint] = useState(false)
    const [loading, setLoading] = useState(false)
    const [consolidated, setConsolidated] = useState([])
    const [consolidatedPageList, setConsolidatedPageList] = useState(null)
    const [showReferenceQuestion, setShowReferenceQuestion] = useState(false)

    const setConsolidatedData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setConsolidatedPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of resource person list
        setConsolidated(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        // when clicking next or previous pages or when the persist is true
        // request data in the current page
        if (!consolidatedPageList.hasOwnProperty(pageNumber) || persist) {
            setLoading(true);
            const response = await axios.get(route("report.consolidated", [eventId], { _query: { rateOnly:true, page: pageNumber } }))
            
            setConsolidatedData(response.data);
            setLoading(false);
        } else {
            setConsolidatedData(consolidatedPageList[pageNumber]);
        }
    };

    useEffect(() => {
        if(initialData) {
            setConsolidatedData(initialData)
        }
    }, [initialData])

    return (
        <div className="container p-3 mt-3">
            <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-lg text-blue-800">
                    Feedback Report Consolidation
                </div>

                <button
                    disabled={!isPrintable}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                    transition duration-150 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    onClick={() => setIsPrint(true)}
                >
                    <PrinterIcon className="w-5 h-5" />
                    <div>Print</div>
                </button>
            </div>

            <div className="flex items-center py-3">
                <button onClick={() => setShowReferenceQuestion(true)} className="flex items-center hover:text-blue-600 ml-auto">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    <div className="ml-3">Reference Questions</div>
                </button>
            </div>

            <div className="grid grid-cols-[5rem,6rem,repeat(12,1fr)] font-bold font-open mt-3 pb-2 border-b">
                <div className="px-2">No.</div>
                <div className="px-2">Sex</div>
                <div className="px-2 text-center">1</div>
                <div className="px-2 text-center">2</div>
                <div className="px-2 text-center">3</div>
                <div className="px-2 text-center">4</div>
                <div className="px-2 text-center">5</div>
                <div className="px-2 text-center">6</div>
                <div className="px-2 text-center">7</div>
                <div className="px-2 text-center">8a</div>
                <div className="px-2 text-center">8b</div>
                <div className="px-2 text-center">8c</div>
                <div className="px-2 text-center">8d</div>
                <div className="px-2 text-center">Overall</div>
            </div>
            <div className="overflow-y-auto pt-2 pb-1">
                {
                    loading ? (
                        <LoadingList column={14} grid="grid-cols-[5rem,6rem,repeat(12,1fr)]" />
                    ) : consolidated?.length == 0 && !eventId ? (
                        <div className="text-center py-2">No event selected</div>
                    ) : consolidated?.length == 0 && eventId ? (
                        <div className="text-center py-2">No ratings</div>
                    ) : (
                        consolidated?.map((item, index) => (
                            <div key={index} className="grid grid-cols-[5rem,6rem,repeat(12,1fr)] mb-1 rounded-md list-hover cursor-default">
                                <div className="px-2 py-2">{++index}</div>
                                <div className="px-2 py-2">{item.gender.gender}</div>
                                <div className="px-2 py-2 text-center">{item.q1}</div>
                                <div className="px-2 py-2 text-center">{item.q2}</div>
                                <div className="px-2 py-2 text-center">{item.q3}</div>
                                <div className="px-2 py-2 text-center">{item.q4}</div>
                                <div className="px-2 py-2 text-center">{item.q5}</div>
                                <div className="px-2 py-2 text-center">{item.q6}</div>
                                <div className="px-2 py-2 text-center">{item.q7}</div>
                                <div className="px-2 py-2 text-center">{item.q8}</div>
                                <div className="px-2 py-2 text-center">{item.q9}</div>
                                <div className="px-2 py-2 text-center">{item.q10}</div>
                                <div className="px-2 py-2 text-center">{item.q11}</div>
                                <div className="px-2 py-2 text-center">{item.q12}</div>
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

            <ReferenceQuestion type="consolidated" show={showReferenceQuestion} onClose={() => setShowReferenceQuestion(false)} />
            <PrintConsolidatedModal src={"/print/consolidated/"+eventId} show={isPrint} onCancel={() => setIsPrint(false)} />
        </div>
    );
}

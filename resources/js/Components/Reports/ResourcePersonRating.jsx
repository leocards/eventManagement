import {
    PrinterIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Paginate from "../Paginate";
import { useEffect, useState } from "react";
import { ResourcePersonList } from "../Event/PopOver";
import { LoadingList } from "../LoadingSearch";
import ReferenceQuestion from "./ReferenceQuestion";
import PrintEvaluations from "./Print/PrintEvaluations";

export default function ResourcePersonRating({
    isPrintable = false,
    rp_list = [],
    initialData,
    eventId,
    onSelectRp = () => {},
}) {
    const [pages, setPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPrint, setIsPrint] = useState(false);
    const [selectedRp, setSelectedRp] = useState(null);
    const [rpEvaluations, setRpEvaluations] = useState([]);
    const [rpEvaluationsPageList, setRpEvaluationsPageList] = useState(null);
    const [showReferenceQuestion, setShowReferenceQuestion] = useState(false);

    const setRpEvaluationsData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setRpEvaluationsPageList((prev) => ({
            ...prev,
            [currentPage]: initial,
        }));

        // set the current data of resource person list
        setRpEvaluations(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        // when clicking next or previous pages or when the persist is true
        // request data in the current page
        if (!rpEvaluationsPageList.hasOwnProperty(pageNumber) || persist) {
            setLoading(true);
            const response = await axios.get(
                route(
                    "report.rp_evaluation",
                    [eventId, selectedRp ?? rp_list[0].id],
                    { _query: { rateOnly: true, page: pageNumber } }
                )
            );

            setRpEvaluationsData(response.data);
            setLoading(false);
        } else {
            setRpEvaluationsData(rpEvaluationsPageList[pageNumber]);
        }
    };

    useEffect(() => {
        if (selectedRp) {
            setLoading(true);
            onSelectRp(selectedRp);
        }
    }, [selectedRp]);

    useEffect(() => {
        initialData && setRpEvaluationsData(initialData);
        if (initialData) setLoading(false);
    }, [initialData]);

    return (
        <div className="container p-3 mt-3">
            <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-lg text-blue-800">
                    Resource Person
                </div>

                <button
                    disabled={!isPrintable}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white 
                    hover:bg-blue-600/90 transition duration-150 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    onClick={() => setIsPrint(true)}
                >
                    <PrinterIcon className="w-5 h-5" />
                    <div>Print</div>
                </button>
            </div>

            <div className="">
                <ResourcePersonList
                    disabled={!isPrintable}
                    resource_persons={rp_list}
                    onSelect={setSelectedRp}
                />
            </div>

            <div className="flex items-center py-3">
                <button
                    onClick={() => setShowReferenceQuestion(true)}
                    className="flex items-center hover:text-blue-600 ml-auto"
                >
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    <div className="ml-3">Reference Questions</div>
                </button>
            </div>

            <div className="grid grid-cols-[5rem,6rem,repeat(7,1fr),20rem] font-bold font-open mt-3 pb-2 border-b">
                <div className="px-2 text-center">No.</div>
                <div className="px-2">Sex</div>
                <div className="px-2 text-center">1</div>
                <div className="px-2 text-center">2</div>
                <div className="px-2 text-center">3</div>
                <div className="px-2 text-center">4</div>
                <div className="px-2 text-center">5</div>
                <div className="px-2 text-center">6</div>
                <div className="px-2 text-center">7</div>
                <div className="px-2">Comment/Suggestion</div>
            </div>

            <div className="overflow-y-auto pt-2 pb-1">
                {loading ? (
                    <LoadingList
                        column={10}
                        grid="grid-cols-[5rem,6rem,repeat(7,1fr),20rem]"
                    />
                ) : rpEvaluations.length == 0 && !eventId ? (
                    <div className="text-center py-2">No event selected</div>
                ) : rpEvaluations.length == 0 && eventId ? (
                    <div className="text-center py-2">No ratings</div>
                ) : (
                    rpEvaluations?.map((item, index) => (
                        <div
                            key={++index}
                            className="grid grid-cols-[5rem,6rem,repeat(7,1fr),20rem] mb-1 rounded-md list-hover cursor-default"
                        >
                            <div className="px-2 py-2 text-center">
                                {pages.from + index}
                            </div>
                            <div className="px-2 py-2">
                                {item.gender.gender}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q1}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q2}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q3}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q4}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q5}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q6}
                            </div>
                            <div className="px-2 py-2 text-center">
                                {item.q7}
                            </div>
                            <div className="px-2 py-2">
                                <div className="line-clamp-1">
                                    {item.comment}
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

            <ReferenceQuestion
                type="resource"
                show={showReferenceQuestion}
                onClose={() => setShowReferenceQuestion(false)}
            />
            <PrintEvaluations
                src={route("print.rp_ratings", [
                    selectedRp
                        ? selectedRp
                        : rp_list[0]
                        ? rp_list[0].id
                        : "null",
                    eventId ?? "null",
                ])}
                show={isPrint}
                onCancel={() => setIsPrint(false)}
            />
        </div>
    );
}
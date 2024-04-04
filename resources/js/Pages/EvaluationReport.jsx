import ResourcePersonRating from "@/Components/Reports/ResourcePersonRating";
import Reports from "../Components/Reports/Reports";
import QualitativeAssessment from "@/Components/Reports/QualitativeAssessment";
import Consolidated from "@/Components/Reports/Consolidated";
import SexDesiggredatedDataChart from "@/Components/Reports/SexDesiggredatedDataChart";
import ResourcePersonResultChart from "@/Components/Reports/ResourcePersonResultChart";
import ConsolidatedDataChart from "@/Components/Reports/ConsolidatedDataChart";
import TrainingActivitySummaryChart from "@/Components/Reports/TrainingActivitySummaryChart";
import { useEffect, useState } from "react";
import { SelectEventList } from "@/Components/Event/PopOver";
import { PrinterIcon } from "@heroicons/react/20/solid";
import PrintEvaluations from "@/Components/Reports/Print/PrintEvaluations";
import ConsolidatedDataDetails from "@/Components/Reports/chart_details/ConsolidatedData";
import { useForm } from '@inertiajs/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function EvaluationReport({ auth, report, events }) {
    const [loading, setLoading] = useState(false);
    const [loadingRp, setLoadingRp] = useState(false);
    const [isPrintChart, setIsPrintChart] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [evaluationData, setEvaluationData] = useState(null);
    const [evaluationRpData, setEvaluationRpData] = useState(null);
    const [consolidatedPercent, setConsolidatedPercent] = useState(0);
    const { data, setData } = useForm({
        consolidate: false,
        training: false,
        rp: false
    })

    const getConsolidatedPercentage = (consolidated) => {
        let totalPercent = 0;

        for (const key in consolidated) {
            if (key != "total") {
                totalPercent = consolidated[key].percent + totalPercent;
            }
        }

        totalPercent = (totalPercent / 1200) * 100;
        setConsolidatedPercent(totalPercent);
    };

    const getDataOnSelectRp = (id) => {
        setLoadingRp(true);
        axios
            .get(route("report.rp_evaluation", [selectedEvent, id]))
            .then((res) => {
                let { chartData, ratings } = res.data;
                setEvaluationRpData(ratings);
                setEvaluationData({
                    ...evaluationData,
                    rpRatingSummary: chartData,
                });
                setLoadingRp(false);
            });
    };

    useEffect(() => {
        if (selectedEvent) {
            setLoading(true);
            axios
                .get(route("report.chartsData", [selectedEvent]))
                .then((res) => {
                    setEvaluationData(res.data);
                    getConsolidatedPercentage(res.data.consolidatedChart)
                    setLoading(false);
                });
        } else setLoading(false);
    }, [selectedEvent]);

    return (
        <Reports auth={auth} report={report}>
            <div className="mt-2">
                <SelectEventList
                    disabled={loading}
                    eventList={events}
                    onSelectEvent={(id) => {
                        setSelectedEvent(id);
                    }}
                />
            </div>

            <div className="container mt-3 sm:p-4 py-4">
                <button
                    disabled={!selectedEvent}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 
                    transition duration-150 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none ml-auto sm:mr-0 mr-4"
                    onClick={() => setIsPrintChart(true)}
                >
                    <PrinterIcon className="w-5 h-5" />
                    <div className="sm:block hidden">Print</div>
                </button>

                <div className="sm:max-h-fit max-h-[60vh] max-xs:overflow-y-auto sm:mt-0 mt-3 sm:p-0 px-4 max-xs:pb-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 max-xs:mt-1  ">
                        <div className="container !ring-slate-200/80 p-3 flex flex-col relative">

                            {false && <DetailsButton onClick={() => setData('consolidate', true)} />}

                            <div className="h-[18rem] my-auto">
                                <LoadingContent
                                    loading={loading}
                                    unSelectedEvent={!selectedEvent}
                                    >
                                    <ConsolidatedDataChart consolidated={evaluationData?.consolidatedChart} />
                                </LoadingContent>
                            </div>
                            {evaluationData && <div className="text-center text-xs">
                                The chart shows that the majority of participants gave the
                                training activity a rating of 4 or 5, with over{" "}
                                {consolidatedPercent}% of participants giving a rating of 4
                                or higher. <br />
                                This suggests that the activity was well-received
                                by the participants.
                            </div>}
                        </div>

                        <div className="container !ring-slate-200/80 p-3 flex flex-col">
                            <div className="h-[18rem] my-auto">
                                <LoadingContent
                                    loading={loading}
                                    unSelectedEvent={!selectedEvent}
                                >
                                    <TrainingActivitySummaryChart
                                        summary={
                                            evaluationData?.trainingActivityRatingSummary
                                        }
                                    />
                                </LoadingContent>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="container !ring-slate-200/80 p-3 flex flex-col">
                            <div className="h-[18rem] my-auto">
                                <LoadingContent
                                    loading={loading || loadingRp}
                                    unSelectedEvent={!selectedEvent}
                                >
                                    <ResourcePersonResultChart
                                        evaluation_ratings={evaluationData?.rpRatingSummary}
                                    />
                                </LoadingContent>
                            </div>
                        </div>
                        <div className="container !ring-slate-200/80 p-3 flex flex-col">
                            <div className="h-[18rem] my-auto">
                                <LoadingContent
                                    loading={loading}
                                    unSelectedEvent={!selectedEvent}
                                >
                                    <SexDesiggredatedDataChart
                                        gender={evaluationData?.gender}
                                    />
                                </LoadingContent>
                            </div>
                        </div>
                    </div>
                </div>


                <PrintEvaluations  src={route('print.charts', [selectedEvent??'null'])} show={isPrintChart} onCancel={() => setIsPrintChart(false)} />
            </div>

            <Consolidated isPrintable={selectedEvent ?? false} eventId={selectedEvent} initialData={evaluationData?.consolidated} />
            <QualitativeAssessment isPrintable={selectedEvent ?? false} eventId={selectedEvent} initialData={evaluationData?.eventAssessment} />
            <ResourcePersonRating
                isPrintable={selectedEvent ?? false}
                rp_list={evaluationData?.resourcePersonList}
                initialData={evaluationRpData??evaluationData?.ratings}
                onSelectRp={getDataOnSelectRp}
                eventId={selectedEvent}
            />
            <ConsolidatedDataDetails data={evaluationData?.consolidatedChart} show={data.consolidate} onClose={() => setData('consolidate', false)} />
        </Reports>
    );
}

const DetailsButton = ({...props}) => <button {...props} className="absolute top-1 right-1 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
    <InformationCircleIcon className="w-5 h-5" />
</button>

const LoadingContent = ({ loading, children, unSelectedEvent }) => {
    return loading && !unSelectedEvent ? (
        <div className="h-full flex">
            <div className="mx-auto my-auto font-semibold uppercase w-fit">
                Loading...
            </div>
        </div>
    ) : unSelectedEvent ? (
        <div className="h-full flex">
            <div className="mx-auto my-auto font-medium opacity-75 w-fit">
                Select an event
            </div>
        </div>
    ) : (
        children
    );
};

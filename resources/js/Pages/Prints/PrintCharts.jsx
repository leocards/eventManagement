import moment from "moment";
import PrintHeader from "./PrintHeader";
import ConsolidatedDataChart from "@/Components/Reports/ConsolidatedDataChart";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TrainingActivitySummary from "@/Components/Reports/TrainingActivitySummaryChart";
import SexDesiggredatedDataChart from "@/Components/Reports/SexDesiggredatedDataChart";
import ResourcePersonResultChart from "@/Components/Reports/ResourcePersonResultChart";

export default function PrintCharts({
    genders,
    consolidated,
    trainingActivity,
    resource,
    event,
}) {
    const [consolidatedPercent, setConsolidatedPercent] = useState(0);
    const printStyle = `
        @media print {
            @page {
                size: auto;
            }

            * {
                font-size: 12px;
            }
            canvas {
                min-height: 100%;
                max-width: 100%;
                max-height: 100%;
                height: auto!important;
                width: auto!important;
            }
        }
    `;

    const convertDate = (
        start = null,
        end = null,
        time_in = null,
        time_out = null
    ) => {
        if (start && !end && !time_in && !time_out) {
            return moment(start).format("LL");
        } else if (start && end && !time_in && !time_out) {
            if (
                moment(start).format("YYYY") == moment(end).format("YYYY") &&
                moment(start).format("MMMM") == moment(end).format("MMMM")
            ) {
                return (
                    moment(start).format("MMMM D") +
                    " - " +
                    moment(end).format("D YYYY")
                );
            } else {
                return (
                    moment(start).format("MMMM D YYYY") +
                    " - " +
                    moment(end).format("MMMM D YYYY")
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

    const getConsolidatedPercentage = () => {
        let totalPercent = 0;

        for (const key in consolidated) {
            if (key != "total") {
                totalPercent = consolidated[key].percent + totalPercent;
            }
        }

        totalPercent = (totalPercent / 1200) * 100;

        setConsolidatedPercent(totalPercent);
    };

    useEffect(() => {
        getConsolidatedPercentage();
        console.table(resource)
    }, []);

    return (
        <div className="p-2">
            <style dangerouslySetInnerHTML={{ __html: printStyle }}></style>
            <PrintHeader />
            <div className="my-5">
                <h1 className="font-gotham text-3xl w-fit mx-auto mb-5">
                    Feedback Data Visualization
                </h1>
                <div className="text-center font-bold">
                    Department of Social Welfare and Development <br />
                    Pantawid Pamilyang Pilipino Program Field Office XI
                </div>
                <div className="my-2 mt-5 text-center">
                    <div className="flex gap-3">
                        <div>Training Activity Title:</div>
                        <div>{event.title}</div>
                    </div>
                    <div className="flex gap-3">
                        <div>Date of the Activity:</div>
                        <div>{convertDate(event.dateStart, event.dateEnd)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[50rem] gap-10 mx-auto w-fit mt-5">
                <div>
                    <ChartContainer>
                        <TrainingActivitySummary animation={false} summary={trainingActivity} />
                    </ChartContainer>
                </div>
                
                <div>
                    <ChartContainer className="">
                        <ConsolidatedDataChart animation={false} consolidated={consolidated} />
                    </ChartContainer>
                    <div className="text-sm text-center mt-3">
                        The chart shows that the majority of participants gave the
                        training activity a rating of 4 or 5, with over{" "}
                        {consolidatedPercent}% of participants giving a rating of 4
                        or higher. <br />
                        This suggests that the activity was well-received
                        by the participants.
                    </div>
                </div>
                
                <div>
                    <ChartContainer>
                        <SexDesiggredatedDataChart animation={false} gender={genders} />
                    </ChartContainer>
                    <div className="flex gap-5 justify-center">
                        <div className="">Male: {genders.Male}</div>
                        <div className="">Female: {genders.Female}</div>
                    </div>
                </div>

                {
                    resource.map((rp, index) => (
                        <div key={index}>
                            <ChartContainer>
                                <ResourcePersonResultChart animation={false} evaluation_ratings={rp.summary} name={rp.rp.name} />
                            </ChartContainer>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

const ChartContainer = styled.div.attrs(() => ({
    className: `h-[20rem]`
}))``
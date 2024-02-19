import PrintHeader from "./PrintHeader";
import styled from "styled-components";
import { convertDate } from "@/js/DateFormatter";

export default function PrintConsolidated({ consolidated, event }) {
    const printStyle = `
        @media print {
            @page {
                size: auto;
            }

            * {
                font-size: 12px;
            }
        }
    `;

    return (
        <div className="p-2">
            <style dangerouslySetInnerHTML={{ __html: printStyle }}></style>
            <PrintHeader />
            <div className="my-5">
                <h1 className="font-gotham text-3xl w-fit mx-auto mb-5">
                    Feedback Report Consolidation
                </h1>
                <div className="text-center font-bold">
                    Department of Social Welfare and Development <br />
                    Pantawid Pamilyang Pilipino Program Field Office XI
                </div>
                <div className="my-2 mt-5">
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

            <div className="border border-b-0 border-black/40 mx-auto">
                <div className="border-black/40 border-b font-open">
                    <div className="grid grid-cols-[5rem,10vw,repeat(12,1fr)] table-bordered overflow-hidden">
                        <Columns $head $bordered $center>No.</Columns>
                        <Columns $head $bordered $center>Sex</Columns>
                        <Columns $head $bordered $center>1</Columns>
                        <Columns $head $bordered $center>2</Columns>
                        <Columns $head $bordered $center>3</Columns>
                        <Columns $head $bordered $center>4</Columns>
                        <Columns $head $bordered $center>5</Columns>
                        <Columns $head $bordered $center>6</Columns>
                        <Columns $head $bordered $center>7</Columns>
                        <Columns $head $bordered $center>8a</Columns>
                        <Columns $head $bordered $center>8b</Columns>
                        <Columns $head $bordered $center>8c</Columns>
                        <Columns $head $bordered $center>8d</Columns>
                        <Columns $head $center>Overall</Columns>
                    </div>

                    <div className="table-bordered">
                        {
                            consolidated.map((item, index) => (
                                <div key={index} className="grid grid-cols-[5rem,10vw,repeat(12,1fr)] border-t table-bordered overflow-hidden">
                                    <Columns $bordered $center>{++index}</Columns>
                                    <Columns $bordered $center>{item.gender.gender}</Columns>
                                    <Columns $bordered $center>{item.q1}</Columns>
                                    <Columns $bordered $center>{item.q2}</Columns>
                                    <Columns $bordered $center>{item.q3}</Columns>
                                    <Columns $bordered $center>{item.q4}</Columns>
                                    <Columns $bordered $center>{item.q5}</Columns>
                                    <Columns $bordered $center>{item.q6}</Columns>
                                    <Columns $bordered $center>{item.q7}</Columns>
                                    <Columns $bordered $center>{item.q8}</Columns>
                                    <Columns $bordered $center>{item.q9}</Columns>
                                    <Columns $bordered $center>{item.q10}</Columns>
                                    <Columns $bordered $center>{item.q11}</Columns>
                                    <Columns $center>{item.q12}</Columns>
                                </div>
                            ))
                        }     
                    </div>
                </div>
            </div>
        </div>
    );
}

const Columns = styled.div.attrs(({ $head, $bordered, $center = false }) => ({
    className: `${$head ? "font-bold !text-sm" : "text-xs"} ${
        $bordered && "border-r"
    } ${
        $center && "text-center justify-center"
    } p-2 shrink-0 flex items-center`,
}))``;
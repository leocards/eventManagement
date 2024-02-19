import PrintHeader from "./PrintHeader";
import styled from "styled-components";
import { useEffect } from "react";
import { convertDate } from "@/js/DateFormatter";

export default function PrintResourcePerson({ rp, event, ratings }) {
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

    useEffect(() => {
        console.log(ratings)
    }, [])

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
                    <div className="flex gap-3">
                        <div>Resource Person:</div>
                        <div>{rp.name}</div>
                    </div>
                </div>
            </div>

            <div className="border border-b-0 border-black/40 mx-auto">
                <div className="border-black/40 border-b font-open">
                    <div className="grid grid-cols-[5rem,6rem,repeat(7,1fr),20rem] table-bordered overflow-hidden">
                        <Columns $head $bordered $center>No.</Columns>
                        <Columns $head $bordered $center>Sex</Columns>
                        <Columns $head $bordered $center>1</Columns>
                        <Columns $head $bordered $center>2</Columns>
                        <Columns $head $bordered $center>3</Columns>
                        <Columns $head $bordered $center>4</Columns>
                        <Columns $head $bordered $center>5</Columns>
                        <Columns $head $bordered $center>6</Columns>
                        <Columns $head $bordered $center>7</Columns>
                        <Columns $head $center>Comment/Suggestion</Columns>
                    </div>

                    <div className="table-bordered">
                        {
                            ratings.map((item, index) => (
                                <div key={index} className="grid grid-cols-[5rem,6rem,repeat(7,1fr),20rem] border-t table-bordered overflow-hidden">
                                    <Columns $bordered $center>{++index}</Columns>
                                    <Columns $bordered $center>{item.gender.gender}</Columns>
                                    <Columns $bordered $center>{item.q1}</Columns>
                                    <Columns $bordered $center>{item.q2}</Columns>
                                    <Columns $bordered $center>{item.q3}</Columns>
                                    <Columns $bordered $center>{item.q4}</Columns>
                                    <Columns $bordered $center>{item.q5}</Columns>
                                    <Columns $bordered $center>{item.q6}</Columns>
                                    <Columns $bordered $center>{item.q7}</Columns>
                                    <Columns $center>{item.comment}</Columns>
                                </div>
                            ))
                        }     
                    </div>
                </div>
            </div>
        </div>
    )
}

const Columns = styled.div.attrs(({ $head, $bordered, $center = false }) => ({
    className: `${$head ? "font-bold !text-sm" : "text-xs"} ${
        $bordered && "border-r"
    } ${
        $center && "text-center justify-center"
    } p-2 shrink-0 flex items-center`,
}))``;
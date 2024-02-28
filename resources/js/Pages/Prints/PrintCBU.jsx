import { PrinterIcon } from "@heroicons/react/24/outline";
import { Head, router } from "@inertiajs/react";
import PrintHeader from "./PrintHeader";
import { SelectByYear } from "@/Components/Event/PopOver";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function PrintCBU({ years, printYear, layout, eventCount }) {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [trainees, setTrainees] = useState([]);
    const [styleScale, setStyleScale] = useState(null);
    const printConctentRef = useRef(null);
    const [printStyle, setPrintStyle] = useState()
    //const [inactive, setInactive] = useState([])

    //console.log(printStyle)

    useEffect(() => {
        if(styleScale) {
            setPrintStyle(`
                @media print {
                    @page {
                        size: ${layout};
                    }

                    #print_content {
                        transform-origin: top left;
                        ${styleScale}
                    }

                    * {
                        font-size: 12px;
                    }
                }
            `);
        }
    }, [styleScale])

    useEffect(() => {
        const calculateScale = () => {
            const size = layout == 'portrait' ? 0.3 : 0.35

            const printableWidth = window.innerWidth * size; // 80% of the window width
            const printableHeight = window.innerHeight * size; // 80% of the window height

            const contentWidth =
                printConctentRef.current.offsetWidth;
            const contentHeight =
                printConctentRef.current.offsetHeight;

            const scaleWidth = printableWidth / contentWidth;
            const scaleHeight = printableHeight / contentHeight;

            // Use the smaller scale value to ensure content fits within printable area
            const newScale = Math.min(scaleWidth, scaleHeight);
            setStyleScale(`transform: scale(${newScale});`)
        };

        // Call the calculateScale function initially and when the window is resized
        if(eventCount >= 10) {
            calculateScale();
            window.addEventListener("resize", calculateScale);
        }

        async function getCBUList() {
            setLoading(true);
            let response = await axios.get(
                route("cbu-monitoring.empTrainigs", {
                    _query: { year: printYear },
                })
            );
            let data = response.data;

            setEvents(data.events);
            setTrainees(data.users);
            setLoading(false);
        }
        getCBUList();

        return () => {
            window.removeEventListener("resize", calculateScale);
        };
    }, []);

    return (
        <div className="print:text-xs text-black p-2">
            <Head title="CBU-print" />
            <style dangerouslySetInnerHTML={{ __html: printStyle }}></style>
            <div
                ref={printConctentRef}
                className={
                    "w-fit mx-auto my-auto bg- white h-full pb-4 "
                    /* (layout == "portrait" ? " max-w-5xl" : " max-w-7xl") */
                }
                id="print_content"
            >
                <div className="print:hidden my-4 pb-3 flex">
                    <div className="rounded ml-auto bg-white">
                        <SelectByYear
                            eventYears={years}
                            onSelectYear={(year) =>
                                router.get(
                                    route("print.cbu", {
                                        _query: { year: year },
                                    })
                                )
                            }
                            selectedYear={printYear}
                        />
                    </div>
                </div>

                <PrintHeader />

                <div className="my-5">
                    <h1 className="font-gotham text-3xl w-full text-center mb-5">
                        CBU Training Monitoring
                    </h1>
                </div>

                {loading ? (
                    <div className=" text-center">Loading...</div>
                ) : (
                    <div className="border border-b-0 border-black/40 w-fit min-w-[40rem] mx-auto">
                        <div className="border-black/40 border-b font-open">
                            <div className="flex table-bordered overflow-hidden">
                                <Columns $head $bordered className="w-16">
                                    No.
                                </Columns>
                                <Columns $head $bordered className="w-40">
                                    Name
                                </Columns>
                                <Columns $head $bordered className="w-20">
                                    Remarks
                                </Columns>
                                <Columns
                                    $head
                                    $bordered
                                    className="w-28 text-center"
                                >
                                    Total Trainings Attended
                                </Columns>
                                {events.map((event, index) => (
                                    <Columns
                                        key={index}
                                        $head
                                        $center
                                        $bordered={index != events.length - 1}
                                        className={
                                            "min-w-[7.5rem]  " +
                                            (events.length > 2
                                                ? "max-w-[7rem]"
                                                : events.length == 1
                                                ? " max-w-[15rem] grow"
                                                : "w-[11rem]")
                                        }
                                    >
                                        {event.title}
                                    </Columns>
                                ))}
                            </div>

                            <div className="table-bordered">
                                <div className="flex border-t">
                                    <Columns
                                        $center
                                        className="w-[19rem] !py-1 border-r !text-sm font-medium"
                                    >
                                        Total
                                    </Columns>
                                    <Columns className="w-28 !py-1 border-r !text-sm font-medium"></Columns>
                                    {events.map((event, index) => (
                                        <Columns
                                            key={index}
                                            $head
                                            $center
                                            $bordered={
                                                index != events.length - 1
                                            }
                                            className={
                                                "min-w-[7.5rem]  " +
                                                (events.length > 2
                                                    ? "max-w-[7rem]"
                                                    : events.length == 1
                                                    ? " max-w-[15rem] grow"
                                                    : "w-[11rem]")
                                            }
                                        >
                                            {event.participant[0]?.total || "0"}
                                        </Columns>
                                    ))}
                                </div>
                                {trainees.map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex border-t font-sans"
                                    >
                                        <Columns $bordered className="w-16">
                                            {++index}
                                        </Columns>
                                        <Columns $bordered className="w-40">
                                            {user.first_name} {user.last_name}
                                        </Columns>
                                        <Columns
                                            $bordered
                                            $center
                                            className="w-20"
                                        >
                                            {user.status != "Active" ? user.status : ""}
                                        </Columns>
                                        <Columns
                                            $bordered
                                            $center
                                            className="w-28"
                                        >
                                            {user.trainings_attended[0]
                                                ?.trainings || "0"}
                                        </Columns>
                                        {events.map((event, index) => (
                                            <Columns
                                                key={index}
                                                $center
                                                $bordered={
                                                    index != events.length - 1
                                                }
                                                className={
                                                    "min-w-[7.5rem]  " +
                                                    (events.length > 2
                                                        ? "max-w-[7rem]"
                                                        : events.length == 1
                                                        ? " max-w-[15rem] grow"
                                                        : "w-[11rem]")
                                                }
                                            >
                                                {user.attended_event.find(
                                                    ({ e_id }) =>
                                                        e_id == event.id
                                                )
                                                    ? "1"
                                                    : "0"}
                                            </Columns>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const Columns = styled.div.attrs(({ $head, $bordered, $center = false }) => ({
    className: `${$head ? "font-semibold !text-sm" : "text-xs"} ${
        $bordered && "border-r"
    } ${
        $center && "text-center justify-center"
    } p-2 shrink-0 flex items-center`,
}))``;

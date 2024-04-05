import { PrinterIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import PrintHeader from "./PrintHeader";
import { Head, useForm } from "@inertiajs/react";
import moment from "moment";
import { PencilIcon } from "@heroicons/react/20/solid";
import AccomplishmentSignatoriesEdit from "./AccomplishmentSignatoriesEdit";
import { convertDate } from "@/js/DateFormatter";
import { useEffect, useState } from "react";
import ExportButton from "@/Components/Buttons/ExportExcelButton";

export default function PrintAccomplishment({
    auth,
    year,
    quarter,
    quarter_int,
    accomplishments,
}) {
    const printStyle = `
        @media print {
            @page {
                size: landscape;
                margin-top: 4rem;
            }

            * {
                font-size: 10px;
            }
        }
    `;

    const { data, setData } = useForm({
        reviewedby: {
            name: "",
            position: "",
            date: "",
        },
        approvedby: {
            name: "",
            position: "",
            date: "",
        },
    });

    const onPrint = () => {
        window.print();
    };

    useEffect(() => {
        let approved = localStorage.getItem('ApprovedSignatory')
        let reviewed = localStorage.getItem('ReviewedSignatory')

        if(approved && reviewed) {
            approved = JSON.parse(approved)
            reviewed = JSON.parse(reviewed)

            setData({
                reviewedby: {
                    name: reviewed.name,
                    position: reviewed.position,
                    date: reviewed.date,
                },
                approvedby: {
                    name: approved.name,
                    position: approved.position,
                    date: approved.date,
                },
            })
        } else {
            if(approved) {
                approved = JSON.parse(approved)
                setData('approvedby', {
                    name: approved.name,
                    position: approved.position,
                    date: approved.date,
                })
            }
            if(reviewed) {
                reviewed = JSON.parse(reviewed)
                setData('reviewedby', {
                    name: reviewed.name,
                    position: reviewed.position,
                    date: reviewed.date,
                })
            }
        }
    }, [])

    return (
        <div className="print:text-xs text-black h-screen">
            <Head title="Accomplishment-print" />
            <style dangerouslySetInnerHTML={{ __html: printStyle }}></style>
            <div className="w-full p-2 mx-auto my-auto">
                <div className="print:hidden my-4 flex ">
                    <ExportButton
                        exportRoute={route("export.accomplishment", {
                            year: year,
                            quarter: quarter_int,
                            _query: {
                                reviewedby: data.reviewedby,
                                approvedby: data.approvedby
                            },
                        })}
                        className={"ml-auto"}
                    />

                    <button
                        onClick={onPrint}
                        className="flex items-center gap-2 rounded-md px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 transition duration-150 hover:shadow-md ml-3"
                    >
                        <PrinterIcon className="w-5 h-5" />
                        <div>Print</div>
                    </button>
                </div>

                <PrintHeader />

                <div className="my-5">
                    <h1 className="font-gotham text-lg w-fit mx-auto mb-5">
                        IDCB Accomplishment Report
                    </h1>
                    <div className="text-center font-bold">
                        Institutional Development and Capability Building (IDCB)
                        Accomplishment Report
                        <div>
                            FY {year} | {quarter}
                        </div>
                        <div>
                            Pantawid Pamilyang Pilipino Program Field Office XI
                        </div>
                    </div>
                </div>

                <div className="border border-b-0 border-black/40">
                    <div className="grid grid-cols-[9vw,1fr,7vw,9vw,8vw,11vw,10vw,9vw,9vw,10vw] print:bg-slate-600 text-white bg-slate-600 border-black/40 border-b uppercase font-medium font-open text-[10px]">
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r">
                            Title of Activity
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r">
                            Objectives of the Activity
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r">
                            Date
                        </div>
                        <div className="p-1 flex flex-col items-center justify-center text-center border-black/40 h-full border-r">
                            Platform{" "}
                            <span className=" normal-case">
                                (Face-to-face, Online, or Blended)
                            </span>
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r">
                            Target Venue
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                            Number of Participants
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                            Evaluation Results
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                            Proposed fund allocation
                        </div>
                        <div className="p-1 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                            Fund disbursed
                        </div>
                        <div className="p-1 flex flex-col items-center justify-center text-center border-black/40 h-full break-words">
                            Remarks
                            <span className=" normal-case">
                                (i.e. Changes in schedule, reason for conduct,
                                etc.)
                            </span>
                        </div>
                    </div>

                    {accomplishments.map((acc, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[9vw,1fr,7vw,9vw,8vw,11vw,10vw,9vw,9vw,10vw] border-black/40 border-b font-open text-[10px]"
                        >
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r">
                                {acc.title}
                            </div>
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r whitespace-pre-wrap break-words">
                                {acc.objective}
                            </div>
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r">
                                {convertDate(acc.dateStart, acc.dateEnd)}
                            </div>
                            <div className="p-1 py-2 flex flex-col items-center justify-center text-center border-black/40 h-full border-r">
                                {acc.platform}
                            </div>
                            <div className="p-2 py-2 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                                {acc.platform == "Face-to-face"
                                    ? acc.venue
                                    : "Online"}
                            </div>
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                                {acc.participant_count}
                            </div>
                            <div className="p-1 py-2 flex flex-col items-center justify-center text-center border-black/40 h-full border-r break-words">
                                {acc.evaluation_rates.map((rates, index) => (
                                    <div key={index}>
                                        {rates.level}:{" "}
                                        <span className="font-bold">
                                            <span className="font-gotham">
                                                {rates.count}
                                            </span>{" "}
                                            ({rates.percent})
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                                {acc.fund}
                            </div>
                            <div className="p-1 py-2 flex items-center justify-center text-center border-black/40 h-full border-r break-words">
                                {acc.fund}
                            </div>
                            <div className="p-1 py-2 flex flex-col items-center justify-center text-center border-black/40 h-full break-words">
                                {acc.remarks}
                            </div>
                        </div>
                    ))}
                </div>

                <Footer user={auth.user} onUpdatedData={(type, uData) => {
                    let {name, position, date} = uData
                    if(type == 'review') {
                        setData('reviewedby', {
                            name: name, position: position, date: date
                        })
                    }
                    if(type == 'approved') {
                        setData('approvedby', {
                            name: name, position: position, date: date
                        })
                    }
                }} />
            </div>
        </div>
    );
}

const Footer = ({ user, onUpdatedData = () => {} }) => {
    const [showReview, setShowReview] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const { data, setData } = useForm({
        review: null,
        approved: null,
    });

    useEffect(() => {
        let rememberedReviewed = localStorage.getItem("ReviewedSignatory");
        let rememberedApproved = localStorage.getItem("ApprovedSignatory");
        if (rememberedReviewed || rememberedApproved) {
            rememberedReviewed = JSON.parse(rememberedReviewed);
            rememberedApproved = JSON.parse(rememberedApproved);

            if (rememberedReviewed.currentDate) {
                rememberedReviewed.date = moment().format("YYYY-MM-DD");
            }

            if (rememberedApproved.currentDate) {
                rememberedApproved.date = moment().format("YYYY-MM-DD");
            }

            setData({
                review: rememberedReviewed,
                approved: rememberedApproved,
            });
        }
    }, []);

    return (
        <div className="mt-10 mx-36 text-xs">
            <div className="flex font-open justify -between gap-40">
                <div className="p-2 border-2 border-transparent">
                    <div className="">
                        <div className="font-bold mb-5">Prepared By:</div>

                        <div className="font-bold uppercase">
                            {user.first_name} {user.last_name}
                        </div>
                        <div>{user.position}</div>
                        <div>Date: {moment().format("LL")}</div>
                    </div>
                </div>

                <div
                    onClick={() => setShowReview(true)}
                    className="relative group p-2 cursor-pointer transition duration-150 hover:border-gray-400 print:border-none border-2 border-dashed border-transparent"
                >
                    <div className="print:hidden hidden group-hover:block absolute -right-20 top-0 p-1">
                        Edit content
                    </div>
                    <div className="">
                        <div className="font-bold mb-5">Reviewed By:</div>

                        {data.review ? (
                            <>
                                <div className="font-bold uppercase">
                                    {data.review.name}
                                </div>
                                <div>{data.review.position}</div>
                                <div>
                                    Date:{" "}
                                    {moment(data.review.date).format("LL")}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="font-bold opacity-30 uppercase">
                                    Name
                                </div>
                                <div className="opacity-30">Position</div>
                                <div className="opacity-30">Date</div>
                            </>
                        )}
                    </div>
                </div>

                <div
                    onClick={() => setShowApprove(true)}
                    className="relative group p-2 cursor-pointer transition duration-150 hover:border-gray-400 print:border-none border-2 border-dashed border-transparent"
                >
                    <div className="print:hidden hidden group-hover:block absolute -right-20 top-0 p-1">
                        Edit content
                    </div>
                    <div className="">
                        <div className="font-bold mb-5">Approved By:</div>

                        {data.approved ? (
                            <>
                                <div className="font-bold uppercase">
                                    {data.approved.name}
                                </div>
                                <div>{data.approved.position}</div>
                                <div>
                                    Date:{" "}
                                    {moment(data.approved.date).format("LL")}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="font-bold opacity-30 uppercase">
                                    Name
                                </div>
                                <div className="opacity-30">Position</div>
                                <div className="opacity-30">Date</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <AccomplishmentSignatoriesEdit
                label="Reviewed"
                show={showReview}
                onClose={() => setShowReview(false)}
                setDataEdit={(d) => {setData("review", d); onUpdatedData("review", d)}}
            />

            <AccomplishmentSignatoriesEdit
                label="Approved"
                show={showApprove}
                onClose={() => setShowApprove(false)}
                setDataEdit={(d) => {setData("approved", d); onUpdatedData("approved", d)}}
            />
        </div>
    );
};

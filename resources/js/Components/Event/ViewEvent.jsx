import { useEffect, useState } from "react";
import Modal from "../Modal";
import {
    ClockIcon,
    MapPinIcon,
    XMarkIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import styled from "styled-components";
import { LinkIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { useForm } from "@inertiajs/react";
import { convertDate } from "@/js/DateFormatter";

export default function ViewEvent({
    show,
    eventToView,
    empView = false,
    onClose = () => {},
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [eventTime, setEventTime] = useState(null);
    const [code, setCode] = useState({ time_in: null, time_out: null });
    const [eventRPParticipant, setEventRPParticipant] = useState({
        rps: [],
        participants: [],
    });
    const { data, setData, reset } = useForm({
        time_in: "",
        time_out: "",
    });

    const copyCode = (e, isTimeIn = true) => {
        if ((isTimeIn && !code.time_in) || (!isTimeIn && !code.time_out))
            return;

        navigator.clipboard.writeText(
            e.target.textContent.split("copied").join("")
        );
        e.target.children[1].classList.remove("invisible");
        setTimeout(() => e.target.children[1].classList.add("invisible"), 1000);
    };

    const getEventCode = ({ event_code }, isTimeIn = true) => {
        let activeCode = event_code.find((code) => {
            const codeDate = new Date(code.time_in);
            const currentDate = new Date();

            currentDate.setHours(0, 0, 0, 0);
            codeDate.setHours(0, 0, 0, 0);

            if (codeDate >= currentDate || codeDate == currentDate) {
                return code;
            }
        });

        if (!activeCode) {
            return null;
        }

        if (isTimeIn) {
            if (
                new Date() <= new Date(activeCode.time_in) ||
                new Date() < new Date(activeCode.time_out)
            ) {
                return activeCode.time_in_code;
            } else return null;
        } else {
            if (
                new Date() <= new Date(activeCode.time_out) ||
                new Date() <= new Date(activeCode.time_out_cutoff)
            ) {
                return activeCode.time_out_code;
            } else return null;
        }
    };

    const getTemporaryUrl = (inOrOut = true) => {
        axios
            .get(
                route("event.generate", {
                    event: eventToView.id,
                    _query: {
                        time_in: inOrOut ? true : null,
                        time_out: !inOrOut ? true : null,
                    },
                })
            )
            .then((res) => {
                inOrOut
                    ? setData("time_in", res.data)
                    : setData("time_out", res.data);
            });
    };

    useEffect(() => {
        if (show) {
            setEventTime(null);
            setEventRPParticipant({ rps: [], participants: [] });

            setEventTime(
                moment(eventToView?.event_code[0].time_in).format("LT") +
                    " - " +
                    moment(eventToView?.event_code[0].time_out).format("LT")
            );

            setCode({
                time_in: getEventCode(eventToView),
                time_out: getEventCode(eventToView, false),
            });

            setIsLoading(true);

            async function getEventRPParticipant() {
                let response = await axios.get(
                    route("event.rp_p", [eventToView.id])
                );
                let { rps, participants } = response.data;

                setEventRPParticipant({ rps: rps, participants: participants });

                setIsLoading(false);
            }

            getEventRPParticipant();

            reset();
        }
    }, [show]);

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4 pr-2">
                <div className="text-lg font-semibold flex items-center uppercase mb-5 pr-2">
                    <div>View event details</div>
                    <button
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="max-h-[32rem] overflow-y-auto pr-2">
                    <div className="mb-7">
                        <LabelText className="">Title</LabelText>
                        <div>{eventToView?.title}</div>
                    </div>

                    <div className="mb-7">
                        <LabelText className="">Objective</LabelText>
                        <div className="whitespace-pre-wrap break-words">
                            {" "}
                            {eventToView?.objective}{" "}
                        </div>
                    </div>

                    <div className="mb-7">
                        <LabelText className="">Venue/Link</LabelText>
                        {eventToView?.platform == "Face-to-face" && (
                            <div className="flex gap-3 mt-2">
                                <MapPinIcon className="w-5 h-5 shrink-0 self-start mt-px" />
                                <div className="">{eventToView?.venue}</div>
                            </div>
                        )}

                        {eventToView?.platform == "Virtual" && (
                            <a
                                href={eventToView?.venue}
                                target="_blank"
                                className="flex gap-3 mt-2 hover:underline text-blue-600"
                            >
                                <LinkIcon className="w-5 h-5 shrink-0 self-start mt-px" />
                                <div className="">{eventToView?.venue}</div>
                            </a>
                        )}
                    </div>

                    <div className="mb-7">
                        <LabelText className="">event schedule</LabelText>
                        <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="h-5 w-5" />
                            {convertDate(
                                eventToView?.dateStart,
                                eventToView?.dateEnd
                            )}
                            <ClockIcon className="h-5 w-5 ml-3" />
                            {eventTime}
                        </div>
                    </div>

                    {!empView && (
                        <>
                            <div className="mb-7">
                                <LabelText className="">Code</LabelText>

                                <div className="">
                                    <div>
                                        <div className="flex items-center ">
                                            Time in:
                                            <pre
                                                onClick={(e) => copyCode(e)}
                                                className={
                                                    "p-1 ml-2 px-2 break-words whitespace-pre-wrap relative rounded font-bold text-sm " +
                                                    (code.time_in
                                                        ? "cursor-pointer hover:text-blue-700 bg-slate-100/90"
                                                        : "cursor-not-allowed bg-red-100 text-red-600")
                                                }
                                            >
                                                <span className="pointer-events-none">
                                                    {code.time_in ?? "Cutoff"}
                                                </span>
                                                <div
                                                    className="select-none pointer-events-none absolute !text-white 
                                                    -top-5 left-1/2 -translate-x-1/2 font-normal font-sans p-1 py-0 bg-blue-500 rounded invisible"
                                                >
                                                    copied
                                                </div>
                                            </pre>
                                        </div>
                                        <div className="text-sm my-1">
                                            <button
                                                onClick={() =>
                                                    getTemporaryUrl(true)
                                                }
                                                className="rounded hover:underline"
                                            >
                                                Generate temporary URL for time
                                                in code
                                            </button>
                                            <div
                                                onClick={(e) => copyCode(e)}
                                                className={"cursor-pointer hover:text-blue-700 break-words relative rounded p-1 px-1.5 "+(data.time_in?'bg-slate-100':'')}
                                            >
                                                <span className="pointer-events-none">
                                                    {data.time_in}
                                                </span>
                                                
                                                <div
                                                    className="select-none pointer-events-none absolute !text-white 
                                                        -top-5 left-1/2 -translate-x-1/2 font-normal font-sans p-1 py-0 bg-blue-500 rounded invisible"
                                                >
                                                    copied
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center">
                                            Time out:
                                            <pre
                                                onClick={(e) =>
                                                    copyCode(e, false)
                                                }
                                                className={
                                                    "p-1 ml-2 px-2 break-words whitespace-pre-wrap relative rounded font-bold text-sm " +
                                                    (code.time_out
                                                        ? "cursor-pointer hover:text-blue-700 bg-slate-100/90"
                                                        : "cursor-not-allowed bg-red-100 text-red-600")
                                                }
                                            >
                                                <span className="pointer-events-none">
                                                    {code.time_out ?? "Cutoff"}
                                                </span>
                                                <div
                                                    className="select-none pointer-events-none absolute !text-white 
                                                    -top-5 left-1/2 -translate-x-1/2 font-normal font-sans p-1 py-0 bg-blue-500 rounded invisible"
                                                >
                                                    copied
                                                </div>
                                            </pre>
                                        </div>
                                        <div className="text-sm my-1">
                                            <button
                                                onClick={() =>
                                                    getTemporaryUrl(false)
                                                }
                                                className="rounded hover:underline"
                                            >
                                                Generate temporary URL for time
                                                out code
                                            </button>
                                            <div
                                                onClick={(e) => copyCode(e)}
                                                className={"cursor-pointer hover:text-blue-700 break-words relative rounded p-1 px-1.5 "+(data.time_out?'bg-slate-100':'')}
                                            >
                                                <span className="pointer-events-none">
                                                    {data.time_out}
                                                </span>
                                                <div
                                                    className="select-none pointer-events-none absolute !text-white 
                                                        -top-5 left-1/2 -translate-x-1/2 font-normal font-sans p-1 py-0 bg-blue-500 rounded invisible"
                                                >
                                                    copied
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-7">
                                <LabelText className="">Event funds</LabelText>
                                <div>Php 200,000</div>
                            </div>

                            <div className="p-1 rounded border mb-7">
                                <div className="flex gap-2 justify-between">
                                    <LabelText className="">
                                        Event resource person/s
                                    </LabelText>
                                    {eventRPParticipant.rps.length} resource
                                    person/s
                                </div>

                                <div className="max-h-[18rem] overflow-y-auto">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-2 mt-4">
                                        {isLoading ? (
                                            <LoadingSearch />
                                        ) : (
                                            eventRPParticipant.rps.map(
                                                (rp, index) => (
                                                    <Card key={index}>
                                                        <Profile>
                                                            <img
                                                                src={rp.profile??"/storage/profile/profile.png"}
                                                                onError={(event) => event.target.src = "/storage/profile/profile.png"}
                                                            />
                                                        </Profile>
                                                        <div className="pl-2 pointer-events-none">
                                                            <div className="line-clamp-1 pointer-events-none">
                                                                {rp.name}
                                                            </div>
                                                            <div className="line-clamp-1 text-sm text-gray-500 pointer-events-none">
                                                                {rp.position}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-1 rounded border">
                                <div className="flex gap-2 justify-between">
                                    <LabelText className="">
                                        Event trainees
                                    </LabelText>
                                    {eventRPParticipant.participants.length}{" "}
                                    trainees
                                </div>

                                <div className="max-h-[18rem] overflow-y-auto">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-2 mt-4">
                                        {isLoading ? (
                                            <LoadingSearch />
                                        ) : (
                                            eventRPParticipant.participants.map(
                                                (participant, index) => (
                                                    <Card key={index}>
                                                        <Profile>
                                                            <img
                                                                src={ participant.profile??"/storage/profile/profile.png" }
                                                                onError={(event) => event.target.src = "/storage/profile/profile.png"}
                                                            />
                                                        </Profile>
                                                        <div className="pl-2 pointer-events-none text-sm">
                                                            <div className="line-clamp-1 font-semibold pointer-events-none">
                                                                {
                                                                    participant.name
                                                                }
                                                            </div>
                                                            <div className="line-clamp-1 text-sm leading-4 text-gray-500/80 pointer-events-none">
                                                                {
                                                                    participant.province
                                                                }
                                                            </div>
                                                            <div className="line-clamp-1 text-sm leading-4 text-gray-500/80 pointer-events-none">
                                                                {
                                                                    participant.position
                                                                }
                                                            </div>
                                                        </div>
                                                    </Card>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}

const LabelText = styled.div.attrs((props) => ({
    className: `uppercase text-xs text-gra y-600/80 font-gotham p-1 bg-gray-200 w-fit px-2 rounded mb-1`,
}))``;

const Card = styled.div.attrs((props) => ({
    className: `h-16 rounded-md flex items-center px-2 bg-slate-100/50`,
}))``;

const Profile = styled.div.attrs((props) => ({
    className: `${
        props.$size ?? "w-12 h-12"
    } rounded-full shrink-0 overflow-hidden pointer-events-none bg-white/90`,
}))``;

const LoadingSearch = () => (
    <>
        {Array.from(Array(4).keys()).map((key) => (
            <div
                key={key}
                className="animate-pulse h-16 rounded-md flex items-center px-2 cursor-pointer bg-slate-100/70"
            >
                <div className="rounded-full w-12 h-12 shrink-0 overflow-hidden pointer-events-none bg-slate-200"></div>
                <div className="pl-2 w-full">
                    <div className="h-2.5 w-full rounded-lg bg-slate-200"></div>
                    <div className="h-2.5 mt-1.5 w-20 rounded-lg bg-slate-200"></div>
                </div>
            </div>
        ))}
    </>
);

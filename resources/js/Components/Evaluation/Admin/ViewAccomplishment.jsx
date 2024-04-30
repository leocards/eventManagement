import Modal from "@/Components/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { LinkIcon, MapPinIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

export default function ViewAccomplishment({ show, event_accomplishment, onClose }) {

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <div className="flex items-center mb-5 font-semibold uppercase">
                    View details
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150 exclude outline-none"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto">
                    <div className="mb-7">
                        <LabelText className="mb-2">Title</LabelText>
                        <div>{event_accomplishment?.title}</div>
                    </div>

                    <div className="mb-7">
                        <LabelText className="mb-2">Objective</LabelText>
                        <div className="whitespace-pre-wrap break-words">
                            {event_accomplishment?.objective}
                        </div>
                    </div>

                    <div className="mb-7">
                        <div className="flex gap-7">
                            <div className="w-28">
                                <LabelText className="mb-2">Platform</LabelText>
                                <div>{event_accomplishment?.platform}</div>
                            </div>

                            <div className="">
                                <LabelText className="mb-2">Venue/Link</LabelText>
                                
                                {event_accomplishment?.platform == "Face-to-face" && (
                                    <div className="flex gap-3 mt-2">
                                        <MapPinIcon className="w-5 h-5 shrink-0 self-start mt-px" />
                                        <div className="">{event_accomplishment?.venue}</div>
                                    </div>
                                )}

                                {event_accomplishment?.platform == "Online Platform" && (
                                    <a
                                        href={event_accomplishment?.venue}
                                        target="_blank"
                                        className="flex gap-3 mt-2 hover:underline text-blue-600"
                                    >
                                        <LinkIcon className="w-5 h-5 shrink-0 self-start mt-px" />
                                        <div className="">{event_accomplishment?.venue}</div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-7">
                        <div className="flex gap-7">
                            <div className="w-28">
                                <LabelText className="mb-2">Participants</LabelText>
                                <div className="text-center">{event_accomplishment?.participant_count}</div>
                            </div>

                            <div className="">
                                <LabelText className="mb-2">Evaluation results</LabelText>
                                {
                                    event_accomplishment?.evaluation_rates?.map((rates, index) => (
                                        <div key={index}>{rates.level}: <span className="font-bold"><span className="font-gotham">{rates.count}</span> ({rates.percent})</span></div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mb-7">
                        <div className="flex gap-7">
                            <div className="">
                                <LabelText className="mb-2">Fund allocation</LabelText>
                                <div>{event_accomplishment?.fund}</div>
                            </div>

                            <div className="">
                                <LabelText className="mb-2">Fund disbursed</LabelText>
                                <div>{event_accomplishment?.fund}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-7">
                        <LabelText className="mb-2">Remarks</LabelText>
                        <div className="whitespace-pre-wrap break-words">
                            {event_accomplishment?.remarks}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const LabelText = styled.div.attrs((props) => ({
    className: `uppercase text-xs text-gra y-600/80 font-gotham p-1 bg-gray-200 w-fit px-2 rounded mb-1`,
}))``;
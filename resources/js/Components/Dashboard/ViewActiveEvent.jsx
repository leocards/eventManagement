import styled from "styled-components";
import Modal, { ModalHeader } from "../Modal";
import { convertDate } from "@/js/DateFormatter";
import moment from "moment";
import { useEffect } from "react";
import ElementComponent from "../ElementComponent";

export default function ViewActiveEvent({ show, event, onClose = () => {} }) {
    useEffect(() => {
        if(show) 
            console.log(event)
    }, [show])
    return (
        <Modal show={show} maxWidth="lg" onClose={onClose}>
            <div className="p-4">
                <ModalHeader label="Active training" onClose={onClose} />

                <div className="space-y-4">
                    <div className="flex">
                        <LabelText>Title: </LabelText>
                        <div>{event?.title}</div>
                    </div>
                    <div className="flex">
                        <LabelText>Date: </LabelText>
                        <div>{convertDate(event?.dateStart, event?.dateEnd)}</div>
                    </div>
                    <div className="flex">
                        <LabelText>Venue: </LabelText>
                        <ElementComponent as={event?.platform == 'Face-to-face'?'div':'a'} href={event?.platform != 'Face-to-face'?event?.venue:''}>
                            {event?.venue}
                        </ElementComponent>
                    </div>
                    <div className="flex space-x-5">
                        <div className="flex">
                            <LabelText>Time in: </LabelText>
                            <div>{moment(event?.event_code[0].time_in).format('LT')}</div>
                        </div>
                        <div className="flex">
                            <LabelText>Cutoff: </LabelText>
                            <div>{moment(event?.event_code[0].time_in_cutoff).format('LT')}</div>
                        </div>
                    </div>
                    <div className="flex space-x-5">
                        <div className="flex">
                            <LabelText>Time out: </LabelText>
                            <div>{moment(event?.event_code[0].time_out).format('LT')}</div>
                        </div>
                        <div className="flex">
                            <LabelText>Cutoff: </LabelText>
                            <div>{moment(event?.event_code[0].time_out_cutoff).format('LT')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const LabelText = styled.div.attrs((props) => ({
    className: "font-semibold w-20 shrink-0",
}))``;
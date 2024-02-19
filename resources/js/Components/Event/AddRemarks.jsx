import { useForm } from "@inertiajs/react";
import Modal, { ModalHeader } from "../Modal";
import InputLabel from "../InputLabel";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useEffect } from "react";

export default function AddRemarks({ event, show, onClose = () => {}, onSuccess = () => {} }) {
    const { data, setData, reset, post, processing, errors, clearErrors, setError } = useForm({
        remarks: "",
        eventId: event?.id
    })

    const onSubmit = () => {
        post(route('event.add.remarks', [event.id]), {
            onSuccess: ({props: {message}}) => {
                onSuccess(message, data.remarks, event.id)
            }
        })
    }

    useEffect(() => {
        if(show) {
            if(!event.remarks) {
                reset()
            } else {
                setData('remarks', event?.remarks)
            }
            clearErrors()
        }
    }, [show])

    return (
        <Modal show={show} onClose={onClose} closeable={false}>
            <div className="p-4">
                <ModalHeader label="Event Remarks" showCloseButton={false} onClose={onClose} />

                <div className="">
                    {event?.title}
                </div>
            
                <div className="mt-4">
                    <div
                        className={
                            "form-input-float flex group " +
                            (errors.remarks &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <textarea
                            className="mt-2.5 !py-2.5"
                            id="remarks"
                            placeholder="remarks"
                            value={data.remarks}
                            onInput={({ target }) =>
                                setData("remarks", target.value)
                            }
                        />
                        <InputLabel
                            htmlFor="remarks"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.remarks && "!text-pink-600")
                            }
                        >
                            Remarks
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.remarks}</div>
                </div>

                <div className="flex gap-3 justify-end mt-7">
                    <SecondaryButton className="!px-8 h-10" onClick={onClose}>
                        cancel
                    </SecondaryButton>
                    <PrimaryButton onClick={onSubmit} className="!px-8 h-10" disabled={processing}>
                        {processing?'Processing':'Submit'}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

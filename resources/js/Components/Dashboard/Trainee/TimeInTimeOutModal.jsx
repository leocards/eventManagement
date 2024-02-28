import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function TimeInTimeOut({
    show,
    session = "Time in",
    onSuccess = () => {},
    onClose = () => {},
}) {
    const { message } = usePage().props;
    const [timeInMessage, setTimeInMessage] = useState(null)

    const {
        data,
        setData,
        post,
        reset,
        processing,
        errors,
        setError,
        clearErrors,
    } = useForm({
        code: "",
    });
    const codeInput = useRef(null);

    useEffect(() => {
        if (data.code.length === 5) {
            post(route("trainee.timeIn", { _query: { session: session } }), {
                onSuccess: ({ props: { message } }) => {
                    message == '1' && onSuccess("You've successfully logged your time in.");

                    setTimeInMessage(message)

                    reset();
                },
                onError: ({ error }) => {
                    setError("code", error["0"]);
                },
            });
        }
    }, [data.code]);

    useEffect(() => {
        if (show) {
            reset();
            clearErrors();
            setTimeInMessage(null)
        }
    }, [show]);

    return (
        <>
            <Modal closeable={false} show={show} maxWidth="md" onClose={onClose}>
                <div className="p-4">
                    <div className="flex items-center mb-5 font-semibold uppercase">
                        {session}
                        <button
                            onClick={onClose}
                            className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="">
                        {!timeInMessage ? (
                            <>
                                <div
                                    className={
                                        "form-input-float " +
                                        (errors.code &&
                                            "border-pink-600 focus-within:border-pink-600")
                                    }
                                >
                                    <TextInput
                                        ref={codeInput}
                                        type="text"
                                        id="timeInOut"
                                        value={data.code}
                                        onInput={({ target }) =>{
                                            setData("code", target.value)

                                            target.value.length > 5 &&
                                                setError('code', 'Code must be 5 characters long')
                                        }}
                                        readOnly={data.code.length >= 5}
                                    />

                                    <InputLabel
                                        htmlFor="timeInOut"
                                        value="Code"
                                        className={
                                            errors.code && "!text-pink-600"
                                        }
                                    />

                                    {data.code && (
                                        <button
                                            onClick={() => {
                                                clearErrors();
                                                reset();
                                                codeInput.current.focus();
                                            }}
                                            className="p-1.5 absolute top-1/2 -translate-y-1/2 right-3 hover:bg-gray-100 rounded-full"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <div className="text-sm text-pink-700">
                                    {errors.code}
                                </div>
                            </>
                        ) : (
                            <div className="font-medium text-center text-green-600 mb-3">{message}</div>
                        )}
                    </div>
                </div>
            </Modal>
            {processing && (
                <div className="fixed top-0 left-0 bg-black/40 w-full h-full z-[55] flex select-none backdrop-blur-[1px]">
                    <div className="mx-auto my-auto text-white font-semibold text-lg uppercase">
                        Loading...
                    </div>
                </div>
            )}
        </>
    );
}

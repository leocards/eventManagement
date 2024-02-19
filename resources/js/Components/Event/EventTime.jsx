import { useEffect, useRef } from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function EventTime({
    data,
    isEdit,
    errors,
    onSetTimeIn,
    onSetTimeInCutoff,
    onSetTimeOut,
    onSetTimeOutCutoff,
}) {
    const timeInCutoff = useRef(null)
    const timeOutCutoff = useRef(null)
    const timeInRef = useRef(null)
    const timeOutRef = useRef(null)

    useEffect(() => {
        if(timeInCutoff.current && timeInCutoff.current.type == "text" && data.timeInCutoff) {
            timeInCutoff.current.type = "time"
        }
        if(timeOutCutoff.current && timeOutCutoff.current.type == "text" && data.timeOutCutoff) {
            timeOutCutoff.current.type = "time"
        }
    }, [data.timeInCutoff, data.timeOutCutoff])

    useEffect(() => {
        if(isEdit && data.timeOut && data.timeIn && timeInRef.current && timeOutRef.current) {
            timeInRef.current.type = "time"
            timeOutRef.current.type = "time"
        }
    }, [isEdit, data.timeIn, data.timeOut])

    return (
        <>
            <div className="flex gap-4 mb-4">
                <div className=" w-full">
                    <div
                        className={
                            "form-input-float flex group w-full " +
                            (errors.timeIn &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <TextInput
                            ref={timeInRef}
                            type="text"
                            id="timeIn"
                            placeholder="timeIn"
                            value={data.timeIn}
                            onFocus={({ target }) => (target.type = "time")}
                            onBlur={({ target }) => !target.value && (target.type = "text")}
                            onInput={({target}) => onSetTimeIn(target.value)}
                        />
                        <InputLabel
                            htmlFor="timeIn"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.timeIn && "!text-pink-600")
                            }
                        >
                            Time In
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.timeIn}</div>
                </div>
                <div className="w-full">
                    <div
                        className={
                            "form-input-float flex group w-full " +
                            (errors.timeInCutoff &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <TextInput
                            ref={timeInCutoff}
                            type="text"
                            id="timeInCutoff"
                            placeholder="timeInCutoff"
                            value={data.timeInCutoff}
                            onFocus={({ target }) => (target.type = "time")}
                            onBlur={({ target }) => !target.value && (target.type = "text")}
                            onInput={({target}) => onSetTimeInCutoff(target.value)}
                        />
                        <InputLabel
                            htmlFor="timeInCutoff"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.timeInCutoff && "!text-pink-600")
                            }
                        >
                            Time In Cutoff
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.timeInCutoff}</div>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="w-full">
                    <div
                        className={
                            "form-input-float flex group w-full " +
                            (errors.timeOut &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <TextInput
                            ref={timeOutRef}
                            type="text"
                            id="timeOut"
                            placeholder="timeIn"
                            value={data.timeOut}
                            onFocus={({ target }) => (target.type = "time")}
                            onBlur={({ target }) => !target.value && (target.type = "text")}
                            onInput={({target}) => onSetTimeOut(target.value)}
                        />
                        <InputLabel
                            htmlFor="timeOut"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.timeOut && "!text-pink-600")
                            }
                        >
                            Time Out
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.timeOut}</div>
                </div>
                <div className="w-full">
                    <div
                        className={
                            "form-input-float flex group w-full " +
                            (errors.timeOutCutoff &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <TextInput
                            ref={timeOutCutoff}
                            type="text"
                            id="timeOutCutoff"
                            placeholder="timeOutCutoff"
                            value={data.timeOutCutoff}
                            onFocus={({ target }) => (target.type = "time")}
                            onBlur={({ target }) => !target.value && (target.type = "text")}
                            onInput={({target}) => onSetTimeOutCutoff(target.value)}
                        />
                        <InputLabel
                            htmlFor="timeOutCutoff"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.timeOutCutoff && "!text-pink-600")
                            }
                        >
                            Time Out Cutoff
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.timeOutCutoff}</div>
                </div>
            </div>
        </>
    );
}

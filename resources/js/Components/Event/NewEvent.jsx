import { router, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { DateType, Platform } from "./PopOver";
import ResourcePerson from "./ResourcePerson";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import EventTime from "./EventTime";
import EventParticipants from "./EventParticipants";
import { LoadOnSubmit } from "../LoadingSearch";

export default function NewEvent({ initialListRp, initialParticipants, totalEmp, editId }) {
    const [allParticipants, setAllParticipants] = useState(false);
    const [listOfConflictSchedule, setListOfConflictSchedule] = useState([])
    const [loadingOnUpdate, setLoadingOnUpdate] = useState(false)
    const [initialDateTime, setInitialDateTime] = useState(null) // for edit
    const { data, setData, post, processing, reset, errors, setError, clearErrors, transform } = useForm({
        venue: "",
        platform: "Face-to-face",
        title: "",
        objective: "",
        fund: "",
        date: {
            isRange: false,
            start: "",
            end: "",
        },
        timeIn: "",
        timeInCutoff: "",
        timeOut: "",
        timeOutCutoff: "",
        resourcePerson: "",
        rp_list: [],
        trainee_list: {
            selectBy: [],
            filterBy: "All",
            list: [],
        },
        initialDate: null,
    });

    const MySwal = withReactContent(Swal);

    const removeAddedRP = ({ id }) => {
        let array = data.rp_list;
        let filtered = array.filter((rp) => rp.id != id);
        setData("rp_list", [...filtered]);
    };

    const onFilterByProvince = (province) => 
        setData("trainee_list", {
            ...data.trainee_list,
            filterBy: province,
        });

    const onSubmit = () => {
        post((editId ? route('event.update', [editId]) : route("event.new")), {
            onBefore: ({data}) => {
                if(editId) {
                    const { start, end, isRange } = initialDateTime.date
                    const { timeIn, timeInCutoff, timeOut, timeOutCutoff } = initialDateTime
                    let dateChange = (start != data.date.start || end != data.date.end || isRange != data.date.isRange)
                    let timeChange = (timeIn != data.timeIn || timeInCutoff != data.timeInCutoff || timeOut != data.timeOut || timeOutCutoff != data.timeOutCutoff)
                    let initDate = {...initialDateTime}

                    if(dateChange) initDate.withDateChanges = true
                    if(timeChange) initDate.withTimeChanges = true

                    data.initialDate = initDate
                }
            },
            onSuccess: () => {
                MySwal.fire({
                    text: `Event successfully ${editId?"updated":"created"}`,
                    icon: "success",
                    toast: true,
                    position: "top-right",
                    timerProgressBar: true,
                    timer: 3000,
                    showConfirmButton: false,
                });

                if(!editId) {
                    document.getElementById("pageHeader")
                    .scrollIntoView({
                        behavior: 'instant',
                        block: 'start',
                    });
                    
                    reset()
                } else {
                    onCancel()
                    router.get(route('event'))
                }
            },
            onError: (err) => {
                let keys = Object.keys(err)
                let doc = document.getElementById(keys[0])
                console.log(err)
                if(doc) {
                    doc.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                } else {
                    let errorMessage = ""
                    if(keys.includes("resourcePerson") || keys.includes("participant")) {
                        errorMessage += "You have conflicting schedule in event "+ 
                            keys[0].split(/(?=[A-Z])/)
                            .map(part => part.toLowerCase())
                            .join(' ');

                        if(keys[0] == "resourcePerson") {
                            setError("rp_list", errorMessage)
                        } else {
                            setError("trainee_list.list", errorMessage)
                        }

                    } else if(keys[0] == "eventEnded") {
                        errorMessage += err.eventEnded["0"]
                    } else {
                        errorMessage += `Unable to ${editId?'update':'create'} event.`
                    }

                    MySwal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: true,
                        showDenyButton: false,
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            cancelButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            denyButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                        },
                    }).then(() => {
                        if(keys[0] != "eventEnded")
                            keys.length > 0 && setListOfConflictSchedule(JSON.parse(err[keys[0]][0]))
                    });
                }
            },
        });
    };

    const onCancel = () => {
        localStorage.removeItem('eventData')
    }

    useEffect(() => {
        if (data.rp_list.length > data.resourcePerson && data.resourcePerson) {
            let list = data.rp_list;
            setData("rp_list", [...list.slice(0, data.resourcePerson)]);
        }
    }, [data.resourcePerson]);

    // when edit
    useEffect(() => {
        if(editId) {
            setLoadingOnUpdate(true)
            axios.get(route('event.edit', [editId]))
                .then(res => {
                    let { event, resource_persons, participants, provinceCount, time } = res.data
                    let setSelectedAllProvince = []
                    totalEmp.forEach(({ count, province }) => {
                        let province_count = provinceCount.find((pc) => pc.province == province && pc.count == count)
                        if(province_count) {
                            setSelectedAllProvince.push(province)
                        }
                    })
                    let initDate = {
                        date: {
                            isRange: event.is_range?true:false,
                            start: event.dateStart||"",
                            end: event.dateEnd||""
                        },
                        timeIn: time.time_in.split(' ')[1].split(':').slice(0, 2).join(':'),
                        timeInCutoff: time.time_in_cutoff.split(' ')[1].split(':').slice(0, 2).join(':'),
                        timeOut: time.time_out.split(' ')[1].split(':').slice(0, 2).join(':'),
                        timeOutCutoff: time.time_out_cutoff.split(' ')[1].split(':').slice(0, 2).join(':'),
                    }
                    setData({
                        venue: event.venue,
                        platform: event.platform,
                        title: event.title,
                        objective: event.objective,
                        fund: parseInt(event.fund.replace(/\D/g, ''), 10),
                        ...initDate,
                        resourcePerson: event.total_rp,
                        rp_list: resource_persons,
                        trainee_list: {
                            selectBy: setSelectedAllProvince,
                            filterBy: "All",
                            list: participants,
                        },
                        initialDate: null
                    })
                    setInitialDateTime({...initDate, withTimeChanges: false, withDateChanges: false})
                    setLoadingOnUpdate(false)
                })
        }
    }, [editId])

    useEffect(() => {
        async function getAllEmployees() {
            const response = await axios.get(route("employee.all"));
            const data = response.data;
            setAllParticipants(data);
        }

        getAllEmployees();

        return () => {
            onCancel()
        }
    }, []);

    return (
        <>
            <div
                className={
                    "container p-4 " +
                    ((errors.venue ||
                        errors.title ||
                        errors.objective ||
                        errors.fund ||
                        errors.date ||
                        errors.time) &&
                        "!ring-pink-500")
                }
            >
                <div className=" mb-4">
                    <div className="flex">
                        {data.platform == "Virtual" ? (
                            <span
                                className={
                                    "shrink-0 px-3 text-sm border border-gray-300 border-r-0 flex items-center rounded-l-md bg-gray-200/50 " +
                                    (errors.venue &&
                                        " border-pink-600 focus-within:border-pink-600 ")
                                }
                            >
                                https://
                            </span>
                        ) : (
                            ""
                        )}
                        <div
                            className={
                                "form-input-float grow flex rounded-r-none " +
                                (data.platform == "Virtual"
                                    ? "rounded-l-none "
                                    : "") +
                                (errors.venue &&
                                    " border-pink-600 focus-within:border-pink-600 ")
                            }
                        >
                            <TextInput
                                type={
                                    data.platform == "Virtual" ? "url" : "text"
                                }
                                className={
                                    data.platform == "Virtual"
                                        ? "!rounded-none"
                                        : ""
                                }
                                id="venue"
                                placeholder="Name"
                                value={data.venue}
                                onInput={({ target }) =>
                                    setData("venue", target.value)
                                }
                            />
                            <InputLabel
                                htmlFor="venue"
                                className={
                                    "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.venue && "!text-pink-600")
                                }
                            >
                                {data.platform == "Virtual" ? "URL" : "Venue"}
                            </InputLabel>
                        </div>
                        <Platform
                            platform={data.platform}
                            onChange={(platform) => {
                                setData("platform", platform);
                                clearErrors("venue");
                            }}
                            className={
                                errors.venue &&
                                " border-pink-600 focus-within:border-pink-600 "
                            }
                        />
                    </div>
                    <div className="text-sm text-pink-700">{errors.venue}</div>
                </div>

                <div className=" mb-4">
                    <div
                        className={
                            "form-input-float " +
                            (errors.title &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <TextInput
                            type="text"
                            placeholder="Title"
                            id="title"
                            value={data.title}
                            onInput={({ target }) =>
                                setData("title", target.value)
                            }
                        />
                        <InputLabel
                            htmlFor="title"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.title && "!text-pink-600")
                            }
                        >
                            Title
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.title}</div>
                </div>

                <div className="mb-4">
                    <div
                        className={
                            "form-input-float flex group " +
                            (errors.objective &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <textarea
                            className="mt-2.5 !py-2.5"
                            id="objective"
                            placeholder="objective"
                            value={data.objective}
                            onInput={({ target }) =>
                                setData("objective", target.value)
                            }
                        />
                        <InputLabel
                            htmlFor="objective"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.objective && "!text-pink-600")
                            }
                        >
                            Objective
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">
                        {errors.objective}
                    </div>
                </div>

                <div className=" mb-4">
                    <div
                        className={
                            "form-input-float flex " +
                            (errors.fund &&
                                " border-pink-600 focus-within:border-pink-600 ")
                        }
                    >
                        <input
                            type="text"
                            placeholder="Fund"
                            id="fund"
                            value={data.fund}
                            onInput={({ target }) =>
                                setData(
                                    "fund",
                                    target.value.replace(/[^0-9]/g, "")
                                )
                            }
                        />
                        <InputLabel
                            htmlFor="fund"
                            className={
                                "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                (errors.fund && "!text-pink-600")
                            }
                        >
                            Fund
                        </InputLabel>
                    </div>
                    <div className="text-sm text-pink-700">{errors.fund}</div>
                </div>

                <div className=" mb-4">
                    <div className="flex w-full">
                        <div
                            className={
                                `${(data.date.start && data.date.isRange) ? 'form-input-float-date' :'form-input-float'} flex group rounded-r-none grow ` +
                                (errors.date ?
                                    " border-pink-600 focus-within:border-pink-600 ":"")
                            }
                        >
                            <TextInput
                                type="text"
                                id="date"
                                placeholder=""
                                onFocus={({ target }) => {
                                    target.type = "date";
                                }}
                                onBlur={({ target }) => (target.type = "text")}
                                value={data.date.start}
                                onInput={({ target }) =>
                                    setData("date", {
                                        ...data.date,
                                        start: target.value,
                                    })
                                }
                                className={"grow "}
                            />

                            {data.date.isRange ? (
                                <>
                                    <div
                                        className={
                                            "w-12 text-center shrink-0 bg-gray-200/50 border-x border-gray-300 font-medium py-3.5 " +
                                            (errors.date &&
                                                " border-pink-600 focus-within:border-pink-600 ")
                                        }
                                    >
                                        To
                                    </div>
                                    <TextInput
                                        type="text"
                                        id="dateTo"
                                        placeholder=""
                                        onFocus={({ target }) =>
                                            (target.type = "date")
                                        }
                                        onBlur={({ target }) =>
                                            (target.type = "text")
                                        }
                                        value={data.date.end}
                                        onInput={({ target }) =>
                                            setData("date", {
                                                ...data.date,
                                                end: target.value,
                                            })
                                        }
                                        className={"grow "}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                            <InputLabel
                                htmlFor="date"
                                className={
                                    `after:content-['*'] after:ml-0.5 after:text-red-500 ` +
                                    (errors.date ? "!text-pink-600":"")
                                }
                            >
                                {data.date.isRange
                                    ? "Date from - Date to"
                                    : "Date"}
                            </InputLabel>
                        </div>
                        <DateType
                            dateRange={
                                data.date.isRange ? "Date range" : "Date"
                            }
                            onChange={(isRange) =>
                                setData("date", {
                                    ...data.date,
                                    isRange: isRange,
                                })
                            }
                            className={
                                errors.date &&
                                " border-pink-600 focus-within:border-pink-600 "
                            }
                        />
                    </div>
                    <div className="text-sm text-pink-700">{errors.date}</div>
                </div>

                <div className="">
                    <EventTime
                        data={data}
                        isEdit={editId}
                        errors={errors}
                        onSetTimeIn={(ti) => {
                            let time = new Date(`2000-01-01T${ti}:00`);
                            time.setMinutes(time.getMinutes() + 15);
                            const resultTime = time.getHours().toString().padStart(2, '0')+ ':' +
                                time.getMinutes().toString().padStart(2, '0'); 

                            setData((prev) => ({
                                ...prev,
                                timeInCutoff: resultTime,
                                timeIn: ti,
                            }));
                        }}
                        onSetTimeInCutoff={(tic) =>
                            setData("timeInCutoff", tic)
                        }
                        onSetTimeOut={(to) => {
                            let time = new Date(`2000-01-01T${to}:00`);
                            time.setMinutes(time.getMinutes() + 15);
                            const resultTime =time.getHours().toString().padStart(2, '0')+ ':' +
                                time.getMinutes().toString().padStart(2, '0'); 

                            setData((prev) => ({
                                ...prev,
                                timeOutCutoff: resultTime,
                                timeOut: to,
                            }));
                        }}
                        onSetTimeOutCutoff={(toc) =>
                            setData("timeOutCutoff", toc)
                        }
                    />
                </div>
            </div>

            <ResourcePerson
                errorMessage={errors.rp_list || errors.resourcePerson}
                listOfRP={data.rp_list}
                initialListOfRP={initialListRp}
                nRP={data.resourcePerson}
                listOfConflictSchedule={listOfConflictSchedule}
                onInputNoRP={(input) => setData("resourcePerson", input)}
                onAddRP={(rp) => setData("rp_list", [...data.rp_list, rp])}
                onRemoveRP={removeAddedRP}
            />

            <EventParticipants 
                provincesCount={totalEmp}
                allEmployees={allParticipants}
                initialList={initialParticipants}
                listOfConflictSchedule={listOfConflictSchedule}
                errorMessage={errors['trainee_list.list']}
                filterByProvince={data.trainee_list.filterBy}
                selectedProvince={data.trainee_list.selectBy}
                listOfAddedParticipants={data.trainee_list.list}

                onFilterByProvince={onFilterByProvince}
                onAddParticipant={(p, selectsAll) => 
                    setData("trainee_list", {
                        ...data.trainee_list, 
                        selectBy: selectsAll,
                        list: [...data.trainee_list.list, p]
                    })
                }
                onRemoveParticipant={(p, selectsAll) => 
                    setData("trainee_list", {
                        ...data.trainee_list, 
                        selectBy: selectsAll,
                        list: p
                    })
                }
                onSelectAll={(filters, participants) => {
                    setData("trainee_list", {
                        ...data.trainee_list,
                        selectBy: filters,
                        list: participants
                    })
                }}
            />

            <div className="mt-5 w-full flex">
                <button
                    disabled={processing}
                    onClick={() => {
                        MySwal.fire({
                            title: "CLEAR FORM",
                            text: "Are you sure you want to clear the form?",
                            icon: "question",
                            allowOutsideClick: false,
                            showCancelButton: true,
                            showConfirmButton: true,
                            showDenyButton: false,
                            denyButtonText: "yes",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            customClass: {
                                confirmButton:
                                    "!text-sm px-10 uppercase focus:!ring-0",
                                cancelButton:
                                    "!text-sm px-10 uppercase focus:!ring-0",
                                denyButton:
                                    "!text-sm px-10 uppercase focus:!ring-0",
                            },
                        });
                    }}
                    className="mr-auto px-4 sm:px-8 py-2 rounded-md hover:bg-gray-200/90 transition duration-150 text-gray-700 text-xs font-semibold uppercase"
                >
                    Clear form
                </button>

                <SecondaryButton
                    onClick={() => {
                        onCancel()
                        router.get(route('event'))
                    }}
                    className="sm:w-32 !py-3 justify-center !border-0 !bg-gray-300 hover:!bg-gray-400/70 mr-4"
                >
                    Cancel
                </SecondaryButton>

                <PrimaryButton
                    disabled={processing}
                    onClick={onSubmit}
                    className="sm:min-w-[8rem] !py-3 justify-center"
                >
                    {processing ? (
                        <div className="flex items-center gap-2">
                            <LoadingIcon />
                            Processing...
                        </div>
                    ) : editId ? (
                        "Update"
                    ) : (
                        "Submit"
                    )}
                </PrimaryButton>
            </div>

            { (processing || loadingOnUpdate) && <LoadOnSubmit /> }

            <SaveToLocal data={data} />
        </>
    );
}

const SaveToLocal = ({ data = null, update, onUpdate }) => {
    useEffect(() => {
        const debounce = setTimeout(() => {
            localStorage.setItem("eventData", JSON.stringify(data));
        }, 800);

        return () => clearTimeout(debounce);
    }, [data]);

    return null;
};

const LoadingIcon = () => {
    return (
        <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import CompletedEvaluation from "@/Components/Evaluation/Trainee/CempleteEvaluation";
import EventHeader from "@/Components/Evaluation/Trainee/EventHeader";
import QualitativeAssessmentActivity from "@/Components/Evaluation/Trainee/QualitativeAssessmentActivity";
import QuantitativeAssessmentActivity from "@/Components/Evaluation/Trainee/QuantitativeAssessmentActivity";
import QuantitativeAssessmentRP from "@/Components/Evaluation/Trainee/QuantitativeAssessmentRP";
import Steps from "@/Components/Evaluation/Trainee/Steps";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialRpData = {
    qarp1: null,
    qarp2: null,
    qarp3: null,
    qarp4: null,
    qarp5: null,
    qarp6: null,
    qarp7: null,
    comment: "",
};

export default function Evaluation({
    auth,
    event,
    resourcePersons,
    completed,
    participant_id,
}) {
    let storedSteps = localStorage.getItem('steps')
    const main = useRef(null);
    const MySwal = withReactContent(Swal);
    const [errorList, setErrorList] = useState([]);
    const [errorRpList, setErrorRpList] = useState([]);
    const [isCompleteEvaluation, setIsCompleteEvaluation] = useState(completed)
    const [steps, setSteps] = useState(storedSteps?JSON.parse(storedSteps):1);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        setError,
        clearErrors,
    } = useForm({
        Quantitative: {
            qaa1: null,
            qaa2: null,
            qaa3: null,
            qaa4: null,
            qaa5: null,
            qaa6: null,
            qaa7: null,
            qaa8: null,
            qaa9: null,
            qaa10: null,
            qaa11: null,
            qaa12: null,
        },
        EvaluatedRp: [],
        Qualitative: {
            question1: "",
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            question6: "",
            question7: "",
            question8: "",
        },
        participantId: participant_id,
    });

    const onNext = () => {
        let required = [];
        if (steps === 1) {
            for (const key in data.Quantitative) {
                if (!data.Quantitative[key]) {
                    required.push(key);
                }
            }
            if (required.length !== 0) {
                setErrorList(required);
                document
                    .getElementById(required[0])
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                main.current.scrollTo({
                    top: 365,
                    behavior: "smooth",
                });
                setSteps(2);
                localStorage.setItem('steps' , 2)
            }
        } else if (steps === 2) {
            let required = checkEvaluatedRp(data.EvaluatedRp);
            if (required.length !== 0) {
                setErrorRpList([...required]);

                let id = required[0].id + "" + required[0].question;
                document
                    .getElementById("rp" + id)
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                localStorage.setItem('steps' , 3)
                setSteps(3);
                setTimeout(() => {
                    main.current.scrollTo({
                        top: 365,
                        behavior: "smooth",
                    });
                }, 100);
            }
        } else if (steps === 3) {
            for (const key in data.Qualitative) {
                console.log(data.Qualitative[key])
                if (!data.Qualitative[key]) {
                    required.push(key);
                }
            }
            if (required.length !== 0) {
                setErrorList(required);
                document
                    .getElementById(required[0])
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                onSubmit()
            }
        }
    };

    const onPrevious = () => {
        if (steps > 1) {
            setSteps(steps - 1);
            localStorage.setItem('steps', (steps - 1))
            setTimeout(() => {
                main.current.scrollTo({
                    top: 365,
                    behavior: "smooth",
                });
            }, 100);
        }
    };

    const checkEvaluatedRp = (rpEvaluation) => {
        let errors = [];
        rpEvaluation.forEach(({ rp, evaluation }) => {
            for (const key in evaluation) {
                if (!evaluation[key]) {
                    errors.push({ id: rp.id, question: key });
                }
            }
        });

        return errors;
    };

    const onSubmit = () => {
        post(route("trainee.save_evaluation", {
            event: event.id,
            _query: {
                participantId: participant_id
            }
        }), {
            onSuccess: () => {
                setIsCompleteEvaluation(true);
                localStorage.removeItem('steps')
                localStorage.removeItem('evaluation')
            },
            onError: (err) => {
                console.log(err.error);
            },
        });
    };

    useEffect(() => {
        let discardedData = localStorage.getItem('evaluation')

        if(!storedSteps) {
            localStorage.setItem('steps' , 1)
        }

        if(discardedData) {
            setData({ ...JSON.parse(discardedData) })
        } else {
            if (data.EvaluatedRp.length === 0) {
                let RpData = resourcePersons.map((rp) => {
                    return {
                        rp: rp,
                        evaluation: initialRpData,
                    };
                });
    
                setData("EvaluatedRp", RpData);
            }
        }

        const scrollingPage = (e) => {
            let stb = document.getElementById("scrollTopButton")
            if (e.target.scrollTop >= 1000) {
                stb?.classList.remove('hidden')
            } else {
                stb?.classList.add('hidden')
            }
        };

        main.current?.addEventListener("scroll", scrollingPage);
    }, []);

    return (
        <div
            ref={main}
            className="p-4 w-full h-screen bg-slate-100/90 overflow-y-auto"
        >
            <Head title="Evaluation" />

            {!isCompleteEvaluation && <div className="mx-auto max-w-3xl p-3">
                <EventHeader user={auth.user} event={event} />
                <Steps steps={steps} />

                {steps === 1 && (
                    <QuantitativeAssessmentActivity
                        data={data}
                        errorList={errorList}
                        onRemoveErrorList={(key) => {
                            setErrorList([
                                ...errorList.filter((k) => k != key),
                            ]);
                        }}
                        setData={(key, value) => setData(key, value)}
                    />
                )}

                {steps === 2 && (
                    <QuantitativeAssessmentRP
                        errors={errorRpList}
                        rpEvaluation={data.EvaluatedRp}
                        setData={(key, value) => setData(key, value)}
                        onRemoveErrorRpList={(rpid, key) => {
                            setErrorRpList([...errorRpList.filter(({id, question}) => !(id === rpid && question === key))])
                        }}
                    />
                )}

                {steps === 3 && (
                    <QualitativeAssessmentActivity
                        data={data}
                        errors={errorList}
                        setData={(key, value) => setData(key, value)}
                        onRemoveErrorList={(key) => {
                            setErrorList([
                                ...errorList.filter((k) => k != key),
                            ]);
                        }}
                    />
                )}

                <FooterButtons
                    MySwal={MySwal}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    steps={steps}
                />
            </div>}

            {isCompleteEvaluation && <div className="mx-auto max-w-3xl p-3">
                <CompletedEvaluation name={auth.user.first_name+" "+auth.user.last_name} completed={isCompleteEvaluation} />
            </div>}

            <button
                onClick={() =>
                    main.current.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="p-2.5 rounded-md shadow-lg bg-blue-600 text-white fixed right-4 bottom-4 hidden"
                id="scrollTopButton"
            >
                <ChevronUpIcon className="w-5 h-5" />
            </button>

            <SaveToLocal data={data} />
        </div>
    );
}

const FooterButtons = ({
    steps,
    disabledNext,
    processing,
    MySwal,
    onNext,
    onPrevious,
}) => (
    <div className="mt-5 w-full flex">
        {steps > 1 && (
            <SecondaryButton
                className="w-32 !py-3 justify-center !border-0 !bg-gray-300 hover:!bg-gray-400/70 mr-4"
                onClick={onPrevious}
            >
                Previous
            </SecondaryButton>
        )}

        <PrimaryButton
            disabled={processing || disabledNext}
            className="min-w-[8rem] !py-3 justify-center disabled:pointer-events-none"
            onClick={onNext}
        >
            {steps === 3 ? (processing ? "Processing" : "Submit") : "Next"}
        </PrimaryButton>

        <button
            disabled={processing}
            onClick={() => {
                MySwal.fire({
                    title: "CLEAR FORM",
                    text: "Are you sure you want to clear the form? This will erase all the data.",
                    icon: "question",
                    allowOutsideClick: false,
                    showCancelButton: true,
                    showConfirmButton: true,
                    showDenyButton: false,
                    denyButtonText: "yes",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    customClass: {
                        confirmButton: "!text-sm px-10 uppercase focus:!ring-0",
                        cancelButton: "!text-sm px-10 uppercase focus:!ring-0",
                        denyButton: "!text-sm px-10 uppercase focus:!ring-0",
                    },
                }).then((response) => {
                    if (response.isConfirmed) {
                        localStorage.removeItem('steps')
                        localStorage.removeItem('evaluation')
                        location.reload();
                    }
                });
            }}
            className="ml-auto px-8 py-2 rounded-md hover:bg-gray-200/90 transition duration-150 text-gray-700 text-xs font-semibold uppercase"
        >
            Clear form
        </button>
    </div>
);

const SaveToLocal = ({ data }) => { 
    useEffect(() => {
        if(data.EvaluatedRp.length > 0)
            localStorage.setItem("evaluation", JSON.stringify(data));

        return () => {
            localStorage.removeItem("evaluation");
        };
    }, [data]);
};

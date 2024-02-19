import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { SelectSecurity } from "@/Components/Event/PopOver";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Security({ questions, userSqs }) {
    const MySwal = withReactContent(Swal);
    const [questionSet, setQuestionSet] = useState(questions);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        clearErrors,
        setError,
        recentlySuccessful,
        isDirty
    } = useForm({
        sq1: { question: "", answer: "", id: null },
        sq2: { question: "", answer: "", id: null },
        sq3: { question: "", answer: "", id: null },
    });
    const [isUpdate, setIsUpdate] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        let { sq1, sq2, sq3 } = data

        post(isUpdate?route("security.update", [sq1.id, sq2.id, sq3.id]):route("security.store"), {
            onSuccess: ({ props: { message } }) => {
                MySwal.fire({
                    text: message,
                    icon: "success",
                    toast: true,
                    position: "top-right",
                    timerProgressBar: true,
                    timer: 3000,
                    showConfirmButton: false,
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    useEffect(() => {
        let { sq1, sq2, sq3 } = data;
        let newData = null;

        if (sq1.question) {
            newData = questionSet.filter(
                (question) => question != sq1.question
            );
            setQuestionSet(newData);
            clearErrors("sq1.question");
        }
        if (sq2.question) {
            newData = questionSet.filter(
                (question) => question != sq2.question
            );
            setQuestionSet(newData);
            clearErrors("sq2.question");
        }
        if (sq3.question) {
            newData = questionSet.filter(
                (question) => question != sq3.question
            );
            setQuestionSet(newData);
            clearErrors("sq3.question");
        }
    }, [data]);

    useEffect(() => {
        if (userSqs.length > 0) {
            let [firstQuestion, secondQuestion, thirdQuestion] = userSqs;

            axios.get(route("security")).then(({ data }) => {
                let sqs = data;
                let q1 = sqs.find(({ question }) => question == firstQuestion['question'])
                let q2 = sqs.find(({ question }) => question == secondQuestion['question'])
                let q3 = sqs.find(({ question }) => question == thirdQuestion['question'])

                setData({
                    sq1: {
                        question: q1.question, answer: q1.answer, id: q1.id
                    }, sq2: {
                        question: q2.question, answer: q2.answer, id: q2.id
                    }, sq3: {
                        question: q3.question, answer: q3.answer, id: q3.id
                    }
                })

                setIsUpdate(true)
            });
        }
    }, [])

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Security Questions
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Provide questions for your account to stay secure. This is
                    useful when you forgot password, to verify if it's you.
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div className="">
                    <div
                        className={
                            "form-input-float flex " +
                            (errors["sq1.question"] &&
                                "border-pink-600 focus-within:border-pink-600")
                        }
                    >
                        <TextInput
                            type="text"
                            id="sq1"
                            value={data.sq1.question}
                            onInput={({ target }) =>
                                setData("sq1", {
                                    ...data.sq1,
                                    question: target.value,
                                })
                            }
                        />

                        <InputLabel
                            htmlFor="sq1"
                            value="Security question #1"
                            className={
                                errors["sq1.question"] && "!text-pink-600"
                            }
                        />

                        <SelectSecurity
                            className={
                                errors["sq1.question"] && "!border-pink-600"
                            }
                            questions={questionSet}
                            onSelect={(q) =>
                                setData("sq1", { ...data.sq1, question: q })
                            }
                        />
                    </div>
                    <InputError message={errors["sq1.question"]} />
                </div>

                {data.sq1.question && (
                    <div className="">
                        <div
                            className={
                                "form-input-float flex !mt-5 " +
                                (errors["sq1.answer"] &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <TextInput
                                type="text"
                                id="sq1Answer"
                                value={data.sq1.answer}
                                onInput={({ target }) =>
                                    setData("sq1", {
                                        ...data.sq1,
                                        answer: target.value,
                                    })
                                }
                            />

                            <InputLabel
                                htmlFor="sq1Answer"
                                value="Answer"
                                className={
                                    errors["sq1.answer"] && "!text-pink-600"
                                }
                            />
                        </div>
                        <InputError message={errors["sq1.answer"]} />
                    </div>
                )}

                <hr className="border-slate-400" />

                <div className="">
                    <div
                        className={
                            "form-input-float flex " +
                            (errors["sq2.question"] &&
                                "border-pink-600 focus-within:border-pink-600")
                        }
                    >
                        <TextInput
                            type="text"
                            id="sq2"
                            value={data.sq2.question}
                            onInput={({ target }) =>
                                setData("sq2", {
                                    ...data.sq2,
                                    question: target.value,
                                })
                            }
                        />

                        <InputLabel
                            htmlFor="sq2"
                            value="Security question #2"
                            className={
                                errors["sq2.question"] && "!text-pink-600"
                            }
                        />

                        <SelectSecurity
                            className={
                                errors["sq2.question"] && "!border-pink-600"
                            }
                            questions={questionSet}
                            onSelect={(q) =>
                                setData("sq2", { ...data.sq2, question: q })
                            }
                            position="-mt-40"
                        />
                    </div>
                    <InputError message={errors["sq2.question"]} />
                </div>

                {data.sq2.question && (
                    <div className="">
                        <div
                            className={
                                "form-input-float flex !mt-5 " +
                                (errors["sq2.answer"] &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <TextInput
                                type="text"
                                id="sq2Answer"
                                value={data.sq2.answer}
                                onInput={({ target }) =>
                                    setData("sq2", {
                                        ...data.sq2,
                                        answer: target.value,
                                    })
                                }
                            />

                            <InputLabel
                                htmlFor="sq2Answer"
                                value="Answer"
                                className={
                                    errors["sq2.answer"] && "!text-pink-600"
                                }
                            />
                        </div>
                        <InputError message={errors["sq2.answer"]} />
                    </div>
                )}

                <hr className="border-slate-400" />

                <div className="">
                    <div
                        className={
                            "form-input-float flex " +
                            (errors["sq3.question"] &&
                                "border-pink-600 focus-within:border-pink-600")
                        }
                    >
                        <TextInput
                            type="text"
                            id="sq3"
                            value={data.sq3.question}
                            onInput={({ target }) =>
                                setData("sq3", {
                                    ...data.sq3,
                                    question: target.value,
                                })
                            }
                        />

                        <InputLabel
                            htmlFor="sq3"
                            value="Security question #3"
                            className={
                                errors["sq3.question"] && "!text-pink-600"
                            }
                        />

                        <SelectSecurity
                            className={
                                errors["sq3.question"] && "!border-pink-600"
                            }
                            questions={questionSet}
                            onSelect={(q) =>
                                setData("sq3", { ...data.sq3, question: q })
                            }
                            position="-mt-60"
                        />
                    </div>
                    <InputError message={errors["sq3.question"]} />
                </div>

                {data.sq3.question && (
                    <div className="">
                        <div
                            className={
                                "form-input-float flex !mt-5 " +
                                (errors["sq3.answer"] &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <TextInput
                                type="text"
                                id="sq3Answer"
                                value={data.sq3.answer}
                                onInput={({ target }) =>
                                    setData("sq3", {
                                        ...data.sq3,
                                        answer: target.value,
                                    })
                                }
                            />

                            <InputLabel htmlFor="sq3Answer" value="Answer" />
                        </div>
                        <InputError message={errors["sq3.answer"]} />
                    </div>
                )}

                <div className="flex items-center gap-4 pt-6">
                    <PrimaryButton
                        disabled={processing}
                        className="w-40 justify-center text-nowrap"
                    >
                        Save Changes
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

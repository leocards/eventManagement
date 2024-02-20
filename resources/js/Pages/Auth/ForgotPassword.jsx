import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { useEffect, useState } from "react";
import { SelectSecurity, SlectQuestion } from "@/Components/Event/PopOver";

export default function ForgotPassword({ status, email_verified }) {
    const [loading, setLoading] = useState(false)
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        email: email_verified ?? "",
        question: "",
        answer: "",
    });

    const submit = (e) => {
        e.preventDefault();

        !email_verified && post(route("password.email"), {replace:true});
        email_verified && post(route('password.verifyAnswer'), {replace:true});
    };

    useEffect(() => {
        if (email_verified !== null) {
            setLoading(true)
            axios.post(route("forgot.security"), data).then((res) => {
                setSecurityQuestions(res.data);
                setLoading(false)
            });
        }
    }, [email_verified]);

    return (
        <div className="h-screen">
            <Head title="Forgot Password" />
            <header className="bg-white shadow-sm p-2.5 sm:px-8 md:px-14">
                <div className="flex">
                    <Link href="/" className="flex">
                        <img src="/storage/logo.png" className="w-12" />
                        <div className="font-gotham text-4xl my-auto ml-2">
                            TAMS
                        </div>
                    </Link>
                </div>
            </header>

            <div className="max-w-xl mx-auto flex flex-col h-[calc(100vh-4.5rem)] pb-14">
                <div className="container p-6 my-auto">
                    <img
                        src="/storage/dswddavao.png"
                        className="w-[13rem] mx-auto mb-4"
                        alt=""
                    />
                    <div className="font-gotham mb-7 text-xl text-center">Forgot password</div>
                    <form onSubmit={submit}>
                        <div>
                            <div className={"form-input-float "+ (errors.email && "border-pink-600 focus-within:border-pink-600")}>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    readOnly={email_verified}
                                    disabled={email_verified}
                                />

                                <InputLabel htmlFor="email" value="Email" className={errors.email && "!text-pink-600"} />
                            </div>

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {
                            loading ? (
                                <div className="text-center py-5">LOADING...</div>
                            ) : (
                                securityQuestions.length === 0 && email_verified && (
                                    <div className="text-center my-4">We can't verify if it's really you, without security questions. <br /> Please add security questions first.</div>
                                )
                            )
                        }

                        {email_verified && securityQuestions.length > 0 && (
                            <div>
                                <hr className=" mt-5 border-gray-400" />

                                <p className="mt-3 mb-7 text-center">We need to verify if it's you, by answering our security question</p>

                                <div className="">
                                    <div className={"mt-5 form-input-float "+(errors.question && "border-pink-600 focus-within:border-pink-600")}>
                                        <input
                                            type="hidden"
                                            value={data.question??''}
                                            readOnly
                                            placeholder=""
                                        />
                                        <InputLabel
                                            htmlFor="email"
                                            value="Security Question"
                                            className={"z-20 "+(errors.question && "!text-pink-600")}
                                        />
                                        <SlectQuestion
                                            questions={securityQuestions}
                                            onSelectQuestion={(q) =>
                                                setData("question", q)
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.question}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-5">
                                    <div className={"form-input-float "+((errors.answer && "border-pink-600 focus-within:border-pink-600"))}>
                                        <TextInput
                                            id="answer"
                                            name="answer"
                                            value={data.answer}
                                            className="block w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "answer",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputLabel
                                            htmlFor="answer"
                                            value="Answer"
                                            className={(errors.answer && "!text-pink-600")}
                                        />
                                    </div>

                                    <InputError
                                        message={errors.answer}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                {email_verified?'Verify':'Verify email'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

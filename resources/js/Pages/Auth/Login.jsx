import { useEffect, useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { CheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Login({ status, canResetPassword }) {
    const passwordRef = useRef(null)
    const [showpass, setShowpass] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const passwordToText = (element) => {
        if (element.type == "password") {
            element.type = "text";
            setShowpass(true);
        } else {
            element.type = "password";
            setShowpass(false);
        }
    };

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {replace: true});
    };

    return (
        <div className="container p-4 h-fit my-auto">
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                    {status}
                </div>
            )}

            <img
                src="/storage/dswddavao.png"
                className="w-[13rem] mx-auto mb-4"
                alt=""
            />

            <div className="font-gotham mb-4 text-center text-xl">Login account</div>

            <form onSubmit={submit}>
                <div>
                    <div className={"form-input-float "+ (errors.email && "border-pink-600 focus-within:border-pink-600")}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full"
                            autoComplete="username"
                            placeholder="Email"
                            onChange={({ target }) =>
                                setData("email", target.value)
                            }
                        />

                        <InputLabel htmlFor="email" value="Email" className={errors.email && "!text-pink-600"} />
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className={"form-input-float flex "+ (errors.password && "border-pink-600 focus-within:border-pink-600")}>
                        <TextInput
                            id="password"
                            ref={passwordRef}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            className="w-full"
                            autoComplete="current-password"
                            onChange={({ target }) =>
                                setData("password", target.value)
                            }
                        />

                        <InputLabel htmlFor="password" value="Password" className={errors.password && "!text-pink-600"} />

                        <button
                            type="button"
                            onClick={() => passwordToText(passwordRef.current)}
                            className={"border-l border-gray-300 px-4 bg-gray-100 rounded-r-md hover:bg-gray-200 "+ (errors.password && "border-pink-600 focus-within:border-pink-600")}
                        >
                            {showpass && <EyeSlashIcon className="w-5 h-5" />}
                            {!showpass && <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <button
                        type="button"
                        onClick={() => setData("remember", !data.remember)}
                        className="text-sm text-gray-600 flex items-center"
                    >
                        <div
                            className={
                                "w-4 h-4 flex items-center justify-center shrink-0 border  rounded mr-2 " +
                                (data.remember
                                    ? "bg-blue-700 text-white border-blue-700"
                                    : "border-gray-600")
                            }
                        >
                            {data.remember ? (
                                <CheckIcon className="w-4 h-4" />
                            ) : (
                                ""
                            )}
                        </div>
                        <span>Remember me</span>
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center my-4 mb-3">
                    <PrimaryButton
                        className="w-full h-12 justify-center !font-gotham !text-base hover:!bg-[linear-gradient(-45deg,#D000F7,#24BAE3)]"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>

                    <hr className="my-4 w-full bg-gray-400" />

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}

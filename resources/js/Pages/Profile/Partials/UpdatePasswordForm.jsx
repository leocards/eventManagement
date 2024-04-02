import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function UpdatePasswordForm({ className = "" }) {
    const MySwal = withReactContent(Swal);
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const confirmPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
        isDirty,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
                <div className="text-sm">Password must contain:</div>
                <div className="text-sm pl-3.5 mb-5">
                    <div className="list-item">numbers</div>
                    <div className="list-item">at least 8 characters</div>
                    <div className="list-item">
                        at least 1 lowercase and uppercase
                    </div>
                    <div className="list-item">
                        special characters, ex: @!#$
                    </div>
                </div>
            </header>

            <form onSubmit={updatePassword} className="mt-6">
                <div className="mb-5">
                    <div className="form-input-float flex">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                        />

                        <InputLabel
                            htmlFor="current_password"
                            value="Current Password"
                        />

                        <ToggleButton
                            elementRef={currentPasswordInput.current}
                            errors={errors.current_password}
                        />
                    </div>
                    <InputError
                        message={errors.current_password}
                        className="mt-"
                    />
                </div>

                <div className="mb-5">
                    <div className="form-input-float flex">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                        />

                        <InputLabel htmlFor="password" value="New Password" />

                        <ToggleButton
                            elementRef={passwordInput.current}
                            errors={errors.password}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-" />
                </div>

                <div className="mb-5">
                    <div className="form-input-float flex">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                            ref={confirmPasswordInput}
                        />

                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <ToggleButton
                            elementRef={confirmPasswordInput.current}
                            errors={errors.password_confirmation}
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4 pt-6">
                    <PrimaryButton
                        disabled={processing || !isDirty}
                        className={
                            "w-44 justify-center text-nowrap " +
                            (processing || !isDirty
                                ? "pointer-events-none"
                                : "")
                        }
                    >
                        Change password
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

const ToggleButton = ({ elementRef, errors }) => {
    const [showpass, setShowpass] = useState(false);

    const passwordToText = (element) => {
        if (element.type == "password") {
            element.type = "text";
            setShowpass(true);
        } else {
            element.type = "password";
            setShowpass(false);
        }
    };

    return (
        <button
            type="button"
            onClick={() => passwordToText(elementRef)}
            className={
                "border-l border-gray-300 px-4 bg-gray-100 rounded-r-md hover:bg-gray-200 " +
                (errors && "border-pink-600 focus-within:border-pink-600")
            }
        >
            {showpass && <EyeSlashIcon className="w-5 h-5" />}
            {!showpass && <EyeIcon className="w-5 h-5" />}
        </button>
    );
};

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import { GenderSelection } from "@/Components/Event/PopOver";
import { useEffect } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const MySwal = withReactContent(Swal);
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, isDirty } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            birthday: user.birthday,
            contact: user.contact,
            address: user.address,
            province: user.province,
            gender: user.gender,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Edit Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6">
                <InputForm
                    id="first_name"
                    className="mb-5"
                    label="first name"
                    value={data.first_name}
                    error={errors.first_name}
                    onInput={(value) => setData("first_name", value)}
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.first_name;
                        }
                    }}
                />

                <InputForm
                    id="last_name"
                    className="mb-5"
                    label="last name"
                    value={data.last_name}
                    error={errors.last_name}
                    onInput={(value) => setData("last_name", value)}
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.last_name;
                        }
                    }}
                />

                <InputForm
                    id="birthday"
                    type="date"
                    className="mb-5"
                    label="birthday"
                    value={data.birthday}
                    error={errors.birthday}
                    onInput={(value) => setData("birthday", value)}
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.birthday;
                        }
                    }}
                />

                <div className="mb-5">
                    <div className="form-input-float">
                        <GenderSelection selectedOption={data.gender} onSelect={(gender) => setData('gender', gender)} />
                        <input
                            type="text"
                            readOnly
                            value={data.gender}
                            id="gender"
                            placeholder=""
                            hidden
                        />
                        <InputLabel htmlFor="gender" value="Gender" />
                    </div>
                </div>

                <InputForm
                    id="email"
                    type="email"
                    className="mb-5"
                    label="email"
                    value={data.email}
                    error={errors.email}
                    onInput={(value) => setData("email", value)}
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.email;
                        }
                    }}
                />

                <InputForm
                    id="contact"
                    type="contact"
                    className="mb-5"
                    label="contact"
                    value={data.contact}
                    error={errors.contact}
                    onInput={(input) =>
                        input && input.length <= 11
                            ? setData(
                                  "contact",
                                  input.replace(/[^0-9]/g, "")
                              )
                            : ""
                    }
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.email;
                        }
                    }}
                />

                <InputForm
                    id="address"
                    type="address"
                    className="mb-5"
                    label="address"
                    value={data.address}
                    error={errors.address}
                    onInput={(value) => setData("address", value)}
                    onBlur={({ target }) => {
                        if (target.value.trim() == "") {
                            target.value = user.address;
                        }
                    }}
                />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 mt-10">
                    <PrimaryButton
                        disabled={processing || !isDirty}
                        className={"w-40 justify-center text-nowrap "+(processing || !isDirty? "pointer-events-none" : "")}
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

const InputForm = ({
    id,
    label,
    value,
    type = "text",
    error,
    onInput,
    className,
    ...props
}) => {
    return (
        <div className={className}>
            <div className="form-input-float">
                <TextInput
                    id={id}
                    type={type}
                    className="mt-1 block w-full"
                    value={value}
                    onInput={({ target }) => onInput(target.value)}
                    required
                    {...props}
                />

                <InputLabel htmlFor={id} value={label} className="capitalize" />
            </div>
            <InputError className="" message={error} />
        </div>
    );
};

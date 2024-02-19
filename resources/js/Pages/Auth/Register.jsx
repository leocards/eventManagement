import { forwardRef, useEffect, useRef, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import {
    CheckIcon,
    EyeIcon,
    EyeSlashIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import ImageUploader from "@/Components/ImageUploader";
import { AutoComplete } from "@/Components/Event/PopOver";
import { provinces } from "@/js/Position";

export default function Register({ show, onClose }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        first_name: "",
        last_name: "",
        birthday: "",
        email: "",
        contact: "",
        address: "",
        position: "",
        province: "",
        gender: "",
        profile: null,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <Modal maxWidth="xl" show={show} onClose={onClose}>
            <div className="font-gotham text-xl p-4 flex items-center">
                Register an account
                <button
                    onClick={onClose}
                    className="p-2 ml-auto rounded-full hover:bg-gray-100"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4 max-h-[75vh] overflow-y-auto">
                <form onSubmit={submit}>
                    <ImageUploader
                        image={data.profile}
                        errorImage={errors.profile}
                        onUpload={(image) => {
                            setData("profile", image);
                            if (errors.profile) clearErrors("profile");
                        }}
                        onError={(err) => {
                            setError("profile", err);
                        }}
                        onRemove={(remove) => {
                            setData("profile", remove);
                            clearErrors("profile");
                        }}
                    />
                    {errors.profile && (
                        <div className="text-sm text-pink-700 mt-2">
                            <span className={data.profile ? "lowercase" : ""}>
                                {errors.profile}
                            </span>
                        </div>
                    )}

                    <InputText
                        id="first_name"
                        className="mt-5"
                        label="First Name"
                        value={data.first_name}
                        error={errors.first_name}
                        onInput={(value) => setData("first_name", value)}
                    />

                    <InputText
                        id="last_name"
                        className="mt-5"
                        label="Last Name"
                        value={data.last_name}
                        error={errors.last_name}
                        onInput={(value) => setData("last_name", value)}
                    />

                    <InputText
                        id="email"
                        className="mt-5"
                        label="Email"
                        type="email"
                        value={data.email}
                        error={errors.email}
                        onInput={(value) => setData("email", value)}
                    />

                    <InputText
                        id="birthday"
                        className="mt-5"
                        label="Birthday"
                        type="date"
                        value={data.birthday}
                        error={errors.birthday}
                        onInput={(value) => setData("birthday", value)}
                    />

                    <InputText
                        id="contact"
                        className="mt-5"
                        label="Contact"
                        value={data.contact}
                        error={errors.contact}
                        onInput={(value) => {
                            if (value.length <= 11) {
                                setData(
                                    "contact",
                                    value.replace(/[^0-9]/g, "")
                                );
                            }
                        }}
                    />

                    <InputText
                        id="address"
                        className="mt-5"
                        label="Address"
                        value={data.address}
                        error={errors.address}
                        onInput={(value) => {
                            setData("address", value);
                        }}
                    />

                    <div className="mt-5">
                        <div
                            className={
                                "form-input-float " +
                                (errors.position &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <AutoComplete
                                selectedOption={data.position}
                                onSelect={(value) => setData("position", value.name)}
                            />

                            <input
                                type="text"
                                readOnly
                                value={data.position}
                                id="position"
                                placeholder=""
                                hidden
                            />
                            <InputLabel
                                htmlFor="position"
                                value="Position"
                                className={
                                    "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.position && "!text-pink-600")
                                }
                            />
                        </div>
                        <div className="text-sm text-pink-700">
                            {errors.position}
                        </div>
                    </div>

                    <div className="mt-5">
                        <div
                            className={
                                "form-input-float " +
                                (errors.province &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <AutoComplete
                                list={provinces}
                                maxHeight="max-h-48"
                                selectedOption={data.province}
                                onSelect={(value) => setData("province", value.name)}
                            />
                            <input
                                type="text"
                                readOnly
                                value={data.province}
                                id="province"
                                placeholder=""
                                hidden
                            />
                            <InputLabel
                                htmlFor="province"
                                value="Province"
                                className={
                                    "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.province && "!text-pink-600")
                                }
                            />
                        </div>
                        <div className="text-sm text-pink-700">
                            {errors.province}
                        </div>
                    </div>

                    <div className=" mt-5">
                        <div
                            className={
                                "flex border border-gray-300 rounded-md items-center py-2.5 px-3 " +
                                (errors.gender &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <div
                                className={
                                    "font-semibold text-gray-700 mr-4 shrink-0 after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.gender && "!text-pink-600")
                                }
                            >
                                Select Gender:{" "}
                            </div>
                            <div className="flex items-center w-full gap-3">
                                <GenderButton
                                    onClick={() => setData("gender", "Male")}
                                    active={data.gender == "Male"}
                                    activeStyle={"bg-blue-100/50 text-blue-700"}
                                    label={"Male"}
                                />
                                <GenderButton
                                    onClick={() => setData("gender", "Female")}
                                    active={data.gender == "Female"}
                                    activeStyle={
                                        "bg-yellow-100/50 text-yellow-700"
                                    }
                                    label={"Female"}
                                />
                            </div>
                        </div>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    <hr className="my-3 mt-4 border-gray-400" />

                    <div className="font-gotham mb-5 text-center">
                        Create password
                    </div>

                    <InputText
                        id="password"
                        className="flex"
                        type="password"
                        label="Password"
                        value={data.password}
                        error={errors.password}
                        elementType="password"
                        onInput={(value) => setData("password", value)}
                    />

                    <InputText
                        id="password_confirmation"
                        className="mt-5 flex"
                        type="password"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        error={errors.password_confirmation}
                        elementType="password"
                        onInput={(value) =>
                            setData("password_confirmation", value)
                        }
                    />

                    <div className="flex items-center justify-end mt-8 mb-5">
                        <PrimaryButton
                            className="w-full h-12 justify-center !font-gotham !text-base hover:!bg-[linear-gradient(-45deg,#D000F7,#24BAE3)]"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

const InputText = ({
    id,
    label,
    type = "text",
    value,
    error,
    className,
    children,
    elementType = "",
    onInput = () => {},
    ...props
}) => {
    const inputRef = useRef(null);
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
        <div>
            <div
                className={
                    className +
                    " form-input-float " +
                    (error && "border-pink-600 focus-within:border-pink-600")
                }
            >
                <TextInput
                    {...props}
                    id={id}
                    ref={inputRef}
                    name={id}
                    type={type}
                    value={value}
                    className="block w-full"
                    onChange={(e) => onInput(e.target.value)}
                    required
                />
                <InputLabel
                    htmlFor={id}
                    value={label}
                    className={
                        "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                        (error && "!text-pink-600")
                    }
                />

                {elementType && elementType == "password" && (
                    <button
                        type="button"
                        onClick={() => passwordToText(inputRef.current)}
                        className="border-l border-gray-300 px-4 bg-gray-100 rounded-r-md hover:bg-gray-200"
                    >
                        {showpass && <EyeSlashIcon className="w-5 h-5" />}
                        {!showpass && <EyeIcon className="w-5 h-5" />}
                    </button>
                )}
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
};

const GenderButton = ({ active, activeStyle, label, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={
                "flex justify-start items-center px-2 w-full py-2 rounded transition duration-150 text-sm uppercase " +
                (active ? activeStyle : "hover:bg-gray-100 ") +
                " " +
                props.className
            }
        >
            {label}
            <div className={"w-5 ml-auto " + (active ? "" : "opacity-0")}>
                <CheckIcon className="w-5 h-5" />
            </div>
        </button>
    );
};

import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "../InputLabel";
import Modal, { ModalHeader } from "../Modal";
import TextInput from "../TextInput";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { AutoComplete, ListSelector } from "../Event/PopOver";
import { provinces, municipalities, roles, roles2 } from "@/js/Position";
import axios from "axios";

export default function NewEmployee({
    show,
    employeeEdit,
    onClose = () => {},
    onSuccess = () => {},
}) {
    const {
        auth: { user },
    } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        first_name: "",
        last_name: "",
        birthday: "",
        email: "",
        contact: "",
        address: "",
        position: "",
        province: "",
        municipality: "",
        ip_affiliation: "",
        gender: "",
        profile: null,
        user_type: "Employee",
        status: "",
        employment_status: "Regular",
        isAdmin: true,
    });
    const [updateData, setUpdateData] = useState(null);

    const onSubmit = () => {
        post(
            employeeEdit
                ? route("employee.update", [employeeEdit.id])
                : route("employee.new"),
            {
                onSuccess: () => {
                    onSuccess(employeeEdit ? "updated" : null);
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    };

    const getEmployeeData = async () => {
        //setLoading(true);
        let response = await axios.get(route("employee.view", employeeEdit.id));
        let resData = response.data;

        response.status === 200
            ? setUpdateData({
                ...data,
                first_name: resData.first_name,
                last_name: resData.last_name,
                birthday: resData.birthday,
                email: resData.email,
                contact: resData.contact,
                address: resData.address,
                position: resData.position,
                province: resData.province,
                municipality: resData.municipality ?? "",
                gender: resData.gender,
                profile: resData.profile,
                status:
                    resData.status == "Active" ? "Active" : resData.status,
                user_type: resData.role,
                employment_status: resData.employment_status ?? "Regular",
              })
            : "";
    };

    useEffect(() => {
        if (data.profile?.response) {
            clearErrors("profile");
        }
    }, [data.profile]);

    useEffect(() => {
        if (show) {
            if (employeeEdit) {
                getEmployeeData();
            } else {
                reset();
                clearErrors();
            }
        }
    }, [show]);

    useEffect(() => {
        employeeEdit ? getEmployeeData() : reset();
    }, [employeeEdit]);

    useEffect(() => {
        employeeEdit ? setData(updateData) : reset();
    }, [updateData]);

    return (
        <Modal show={show} onClose={onClose} maxWidth="xl" isOverFlow={true}>
            <div className="p-4 pr-2">
                <ModalHeader
                    showCloseButton={false}
                    label={(employeeEdit ? "Update" : "New") + " Employee"}
                ></ModalHeader>

                <div className="max-h-[66vh] overflow-y-auto pr-1.5 py-1 mb-10">
                    <div className="pb-3 flex items-center gap-2 text-sm">
                        User default password:
                        <div className="text-base font-medium">12345678</div>
                    </div>
                    {employeeEdit && (
                        <div className="mb-4">
                            <div
                                className={
                                    "form-input-float " +
                                    (errors.status &&
                                        "border-pink-600 focus-within:border-pink-600 ")
                                }
                            >
                                <ListSelector
                                    paddingHeight="py-4"
                                    list={[
                                        { option: "Active" },
                                        { option: "Resigned" },
                                        { option: "Non-renewal" },
                                    ]}
                                    optionPosition="bottom"
                                    borderColor=""
                                    opacityOnEmpty
                                    selectedOption={data.status}
                                    onSelect={(selectedStatus) =>
                                        setData("status", selectedStatus)
                                    }
                                />
                                <input
                                    type="text"
                                    readOnly
                                    value={data.status}
                                    id="status"
                                    placeholder=""
                                    hidden
                                />
                                <InputLabel
                                    htmlFor="status"
                                    value="Status"
                                    className={
                                        "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                        (errors.status && "!text-pink-600")
                                    }
                                />
                            </div>
                            <div className="text-sm text-pink-700">
                                {errors.status}
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <div
                            className={
                                "form-input-float " +
                                (errors.employment_status &&
                                    "border-pink-600 focus-within:border-pink-600 ")
                            }
                        >
                            <ListSelector
                                paddingHeight="py-4"
                                list={[
                                    { option: "Regular" },
                                    { option: "Contractual" },
                                    { option: "Contract of Service" },
                                ]}
                                optionPosition="bottom"
                                borderColor=""
                                opacityOnEmpty
                                selectedOption={data.employment_status}
                                onSelect={(selectedStatus) =>
                                    setData("employment_status", selectedStatus)
                                }
                                preSelect
                            />
                            <input
                                type="text"
                                readOnly
                                value={data.employment_status}
                                id="employment_status"
                                placeholder=""
                                hidden
                            />
                            <InputLabel
                                htmlFor="employment_status"
                                value="Employment Status"
                                className={
                                    "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.employment_status &&
                                        "!text-pink-600")
                                }
                            />
                        </div>
                        <div className="text-sm text-pink-700">
                            {errors.employment_status}
                        </div>
                    </div>

                    <InputBox
                        space="mb-4"
                        id="firstName"
                        label="first name"
                        value={data.first_name}
                        error={errors.first_name}
                        onInput={(input) => setData("first_name", input)}
                    />

                    <InputBox
                        space="mb-4"
                        id="lastName"
                        label="last name"
                        value={data.last_name}
                        error={errors.last_name}
                        onInput={(input) => setData("last_name", input)}
                    />

                    <InputBox
                        space="mb-4"
                        id="birthday"
                        label="Birthday"
                        value={data.birthday}
                        error={errors.birthday}
                        onBlur={({ target }) => (target.type = "text")}
                        onFocus={({ target }) => (target.type = "date")}
                        onInput={(input) => setData("birthday", input)}
                    />

                    <InputBox
                        space="mb-4"
                        id="email"
                        label="Email"
                        value={data.email}
                        error={errors.email}
                        onInput={(input) => setData("email", input)}
                    />

                    <InputBox
                        space="mb-4"
                        id="contact"
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
                    />

                    <InputBox
                        space="mb-4"
                        id="address"
                        label="address"
                        value={data.address}
                        error={errors.address}
                        onInput={(input) => setData("address", input)}
                    />

                    <SelectInput
                        data={data.position}
                        errors={errors.position}
                        id="position"
                        label="Position / Designation"
                        setData={(value) => setData("position", value)}
                    />

                    <div
                        className={
                            "rounded-md border p-1 px-4 mb-5 " +
                            (errors.province || errors.municipality
                                ? " border-pink-600 focus-within:border-pink-600"
                                : "")
                        }
                    >
                        <div className="mb-4 mt-2 font-medium text-sm">
                            Area of assignment
                        </div>
                        <SelectInput
                            array={provinces}
                            data={data.province}
                            errors={errors.province}
                            id="province"
                            label="Province"
                            setData={(value) =>
                                setData({
                                    ...data,
                                    province: value,
                                    municipality: "",
                                })
                            }
                        />

                        <SelectInput
                            disabled={!data.province || data.province == "RPMO"}
                            array={
                                data.province
                                    ? data.province != "RPMO"
                                        ? municipalities[data.province]
                                        : [{ name: "" }]
                                    : [{ name: "" }]
                            }
                            data={data.municipality}
                            isRequired={data.province == "RPMO" ? false : true}
                            errors={errors.municipality}
                            id="municipality"
                            label="City/Municipality/Sub-district"
                            setData={(value) => setData("municipality", value)}
                        />
                    </div>

                    <div className="mb-4">
                        <div
                            className={
                                "form-input-float " +
                                (errors.user_type &&
                                    "border-pink-600 focus-within:border-pink-600")
                            }
                        >
                            <AutoComplete
                                list={user.role == "Admin" ? roles2 : roles}
                                maxHeight="max-h-32"
                                selectedOption={data.user_type ?? "Employee"}
                                onSelect={(value) =>
                                    setData("user_type", value.name)
                                }
                            />

                            <input
                                type="text"
                                readOnly
                                value={data.user_type}
                                id="province"
                                placeholder=""
                                hidden
                            />
                            <InputLabel
                                htmlFor="province"
                                value="User Roles"
                                className={
                                    "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                    (errors.user_type && "!text-pink-600")
                                }
                            />
                        </div>
                        <div className="text-sm text-pink-700">
                            {errors.user_type}
                        </div>
                    </div>

                    <div className="mb-4">
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
                                Sex:{" "}
                            </div>
                            <div className="flex items-center w-full gap-3">
                                <button
                                    onClick={() => setData("gender", "Male")}
                                    className={
                                        "flex justify-start items-center px-2 w-full py-2 rounded transition duration-150 text-sm uppercase " +
                                        (data.gender == "Male"
                                            ? "bg-blue-100/50 text-blue-700"
                                            : "hover:bg-gray-100")
                                    }
                                >
                                    Male
                                    <div
                                        className={
                                            "w-5 ml-auto " +
                                            (data.gender == "Male"
                                                ? ""
                                                : "opacity-0")
                                        }
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                    </div>
                                </button>
                                <button
                                    onClick={() => setData("gender", "Female")}
                                    className={
                                        "flex justify-start items-center px-2 w-full py-2 rounded transition duration-150 text-sm uppercase " +
                                        (data.gender == "Female"
                                            ? "bg-yellow-100/50 text-yellow-700"
                                            : "hover:bg-gray-100")
                                    }
                                >
                                    Female
                                    <div
                                        className={
                                            "w-5 ml-auto " +
                                            (data.gender == "Female"
                                                ? ""
                                                : "opacity-0")
                                        }
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-pink-700">
                            {errors.gender}
                        </div>
                    </div>

                    <InputBox
                        space="mb-4"
                        id="ip_affiliation"
                        label="IP Affiliation"
                        value={data.ip_affiliation}
                        error={errors.ip_affiliation}
                        onInput={(input) => setData("ip_affiliation", input)}
                        required={false}
                    />

                    <ImageUploader
                        image={data.profile}
                        errorImage={errors.profile}
                        onUpload={(image) => setData("profile", image)}
                        onError={(err) => {
                            setError("profile", err);
                        }}
                        onRemove={(remove) => {
                            setData("profile", remove);
                            clearErrors("profile");
                        }}
                    />
                    {errors.profile && (
                        <div className="text-sm text-pink-700">
                            {data.profile && <span>Cannot reupload, </span>}
                            <span className={data.profile ? "lowercase" : ""}>
                                {errors.profile}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-5 w-full flex pr-2">
                    <SecondaryButton
                        disabled={processing}
                        onClick={() => onClose()}
                        className="ml-auto w-32 !py-3 justify-center"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        disabled={processing}
                        onClick={onSubmit}
                        className="ml-3 min-w-[8rem] items-center !py-3 justify-center"
                    >
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <LoadingIcon />
                                Processing...
                            </div>
                        ) : employeeEdit ? (
                            "Update"
                        ) : (
                            "Submit"
                        )}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

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

const InputBox = ({
    value,
    error,
    type = "text",
    id,
    label,
    space,
    required = true,
    onInput = () => {},
    onBlur = () => {},
    onFocus = () => {},
}) => {
    return (
        <div className={space}>
            <div
                className={
                    "form-input-float " +
                    (error && "border-pink-600 focus-within:border-pink-600 ")
                }
            >
                <TextInput
                    type={type}
                    id={id}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onInput={({ target }) => onInput(target.value)}
                />
                <InputLabel
                    htmlFor={id}
                    value={label}
                    className={
                        `capitalize ${
                            required
                                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                : ""
                        }  ` + (error && "!text-pink-600")
                    }
                />
            </div>
            <div className="text-sm text-pink-700">{error}</div>
        </div>
    );
};

export const SelectInput = ({
    data = "",
    errors,
    disabled = false,
    id,
    label,
    array,
    className = "",
    isRequired = true,
    setData,
}) => {
    return (
        <div className={"mb-4 " + className}>
            <div
                className={
                    "form-input-float " +
                    (errors &&
                        "border-pink-600 focus-within:border-pink-600 ") +
                    (disabled ? " opacity-60 " : "")
                }
            >
                {id === "position" ? (
                    <AutoComplete
                        selectedOption={data}
                        onSelect={(value) => setData(value.name)}
                        disabled={disabled}
                    />
                ) : (
                    <AutoComplete
                        list={array}
                        maxHeight="max-h-48"
                        selectedOption={data}
                        onSelect={(value) => setData(value.name)}
                        disabled={disabled}
                    />
                )}

                <input
                    type="text"
                    readOnly
                    value={data}
                    id={id}
                    placeholder=""
                    hidden
                />
                <InputLabel
                    htmlFor={id}
                    value={label}
                    className={
                        (isRequired
                            ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
                            : " ") + (errors && "!text-pink-600")
                    }
                />
            </div>
            <div className="text-sm text-pink-700">{errors}</div>
        </div>
    );
};

{
    /* <div className="mb-4">
                            <div
                                className={
                                    "form-input-float " +
                                    (errors.status &&
                                        "border-pink-600 focus-within:border-pink-600 ")
                                }
                            >
                                <TextInput
                                    id="status"
                                    value={data.status}
                                    onInput={({ target }) =>
                                        setData("status", target.value)
                                    }
                                />
                                <InputLabel
                                    htmlFor="status"
                                    value="Employee Status"
                                    className={
                                        "after:content-['*'] after:ml-0.5 after:text-red-500 " +
                                        (errors.status && "!text-pink-600")
                                    }
                                />
                            </div>
                            <div className="text-sm text-pink-700">
                                {errors.status}
                            </div>
                        </div> */
}

import { XMarkIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function ViewEmployee({ show, viewEmployee, onClose }) {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getEmployeeData() {
            setLoading(true);
            let response = await axios.get(
                route("employee.view", viewEmployee.id)
            );
            let data = response.data

            response.status === 200 ? setEmployee(data) : ''

            setLoading(false);
        }

        viewEmployee ? getEmployeeData() : "";
    }, [viewEmployee]);

    return (
        <Modal show={show} maxWidth="lg">
            <div className="p-4">
                <div className="flex items-center mb-5 font-semibold uppercase">
                    View employee details
                    <button
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {
                    loading === false && employee ? (
                        <div className="">
                            <div className="flex items-center w-full justify-center">
                                <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden bg-white shrink-0">
                                    <img 
                                        src={employee.profile ??
                                            "/storage/profile/profile.png"} 
                                        onError={(event) =>
                                            (event.target.src =
                                                "/storage/profile/profile.png")
                                        }
                                        alt="" 
                                    />
                                </div>
                                <div className="max-w-[20rem] ml-3">
                                    <div className="font-bold">
                                        {employee.first_name} {employee.last_name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {employee.role}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {employee.employment_status}
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="">
                                <div className="flex items-center mb-3">
                                    <LabelText>Position: </LabelText>
                                    <div className="">{employee.position}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Gender: </LabelText>
                                    <div className="">{employee.gender}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Birthday: </LabelText>
                                    <div className="">{employee.birthday}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Email: </LabelText>
                                    <div className="">{employee.email}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Contact: </LabelText>
                                    <div className="">{employee.contact}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Address: </LabelText>
                                    <div className="">{employee.address}</div>
                                </div>
                                <div className="flex items-center mb-3">
                                    <LabelText>Province: </LabelText>
                                    <div className="">{employee.province}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <LoadingContent />
                    )
                }
            </div>
        </Modal>
    );
}

const LoadingContent = () => {
    return (
        <div>
            <div className="animate-pulse flex items-center w-full justify-center">
                <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden bg-slate-200 shrink-0"></div>
                <div className="w-full max-w-[20rem] ml-3">
                    <div className="font-bold h-2.5 rounded-full w-full bg-slate-200 mb-3"></div>
                    <div className="font-bold h-2 rounded-full w-32 bg-slate-200"></div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="">
                <div className="flex items-center mb-3">
                    <LabelText>Gender: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
                <div className="flex items-center mb-3">
                    <LabelText>Birthday: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
                <div className="flex items-center mb-3">
                    <LabelText>Email: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
                <div className="flex items-center mb-3">
                    <LabelText>Contact: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
                <div className="flex items-center mb-3">
                    <LabelText>Address: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
                <div className="flex items-center mb-3">
                    <LabelText>Province: </LabelText>
                    <div className="animate-pulse h-2.5 rounded-full w-52 bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
};

const LabelText = styled.div.attrs((props) => ({
    className: "font-semibold w-32 shrink-0",
}))``;

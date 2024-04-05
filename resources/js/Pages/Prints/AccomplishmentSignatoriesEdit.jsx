import PrimaryButton from "@/Components/Buttons/PrimaryButton"
import InputLabel from "@/Components/InputLabel"
import Modal from "@/Components/Modal"
import TextInput from "@/Components/TextInput"
import { CheckIcon } from "@heroicons/react/20/solid"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useForm } from "@inertiajs/react"
import moment from "moment"
import { useEffect, useState } from "react"

const AccomplishmentSignatoriesEdit = ({ show, label = "Reviewed", onClose, setDataEdit }) => {
    const { data, setData, reset } = useForm({
        name: "",
        position: "",
        date: "",
        currentDate: true,
        remember: false
    })

    const setRemembered = (remember) => {
        setData("remember", remember)
        if(remember) {
            localStorage.setItem(`${label}Signatory`, JSON.stringify(data))
        } else {
            localStorage.removeItem(`${label}Signatory`)
        }
    }

    const onUpdateDate = (date) => {
        if(date != moment().format("YYYY-MM-DD")) {
            setData(prev => ({...prev, date: date, currentDate: false}))
        } else {
            setData(prev => ({...prev, date: date, currentDate: true}))
        }
    }
    
    const setCurrentDate = (status) => {
        let date = moment().format("YYYY-MM-DD")

        if(status) {
            setData(prev => ({...prev, date: date, currentDate: true}))
        } else {
            setData(prev => ({...prev, currentDate: false}))
        }
    }

    const saveData = () => {
        if(data.remember) {
            localStorage.setItem(`${label}Signatory`, JSON.stringify(data))
        }
        setDataEdit(data); 
        onClose()
    }

    useEffect(() => {
        if(show) {
            reset("date", "name", "remember", "position")
            let remembered = localStorage.getItem(`${label}Signatory`)
            if(remembered) {
                remembered = JSON.parse(remembered)
                if(remembered.currentDate) {
                    remembered.date = moment().format("YYYY-MM-DD")
                }
                setData(remembered)
            } else if (data.currentDate) {
                setData('date', moment().format("YYYY-MM-DD"))
            }
        }

    }, [show])

    return (
        <Modal maxWidth="md" show={show} onClose={onClose}>
            <div className="p-4">
                <div className="text-lg font-semibold flex items-center uppercase mb-5 pr-2">
                    <div>Edit {label} By</div>
                    <button
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150 exclude outline-none"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="form-input-float mb-5">
                    <TextInput 
                        id="name"
                        value={data.name}
                        onInput={({target}) => setData('name', target.value)}
                    />

                    <InputLabel htmlFor="name">Name</InputLabel>
                </div>
                <div className="form-input-float mb-5">
                    <TextInput 
                        id="position"
                        value={data.position}
                        onInput={({target}) => setData('position', target.value)}
                    />

                    <InputLabel htmlFor="position">Position</InputLabel>
                </div>

                <div className="block mb-1 ml-auto w-fit">
                    <button
                        type="button"
                        onClick={() => setCurrentDate(!data.currentDate)}
                        className="text-sm text-gray-600 flex items-center"
                    >
                        <div
                            className={
                                "w-4 h-4 flex items-center justify-center shrink-0 border  rounded mr-2 " +
                                (data.currentDate
                                    ? "bg-blue-700 text-white border-blue-700"
                                    : "border-gray-600")
                            }
                        >
                            {data.currentDate ? (
                                <CheckIcon className="w-4 h-4" />
                            ) : (
                                ""
                            )}
                        </div>
                        <span>Current date</span>
                    </button>
                </div>
                <div className="form-input-float mb-7">
                    <TextInput 
                        id="date"
                        type="date"
                        value={data.date}
                        onInput={({target}) => onUpdateDate(target.value)}
                    />

                    <InputLabel htmlFor="date">Date</InputLabel>
                </div>

                <div className="block mt-4">
                    <button
                        type="button"
                        onClick={() => setRemembered(!data.remember)}
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

                <div className="pt-5 flex">
                    <PrimaryButton onClick={saveData} className="ml-auto">
                        Save changes
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    )
}

export default AccomplishmentSignatoriesEdit;
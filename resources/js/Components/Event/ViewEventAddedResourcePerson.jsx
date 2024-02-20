import { XMarkIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal";
import styled from "styled-components";

export default function ViewEventAddedResourcePerson({
    show,
    rpList = [],
    listOfConflictSchedule,
    onClose = () => {},
    onRemoveRP = () => {},
}) {
    const checkIfConflictRP = (id) =>
        listOfConflictSchedule.find((rp) => rp.id == id);

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <div className="flex items-center mb-5 font-semibold uppercase">
                    Event resource person/s
                    <button
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="max-h-[30rem] mt-4">
                    <div className="grid grid-cols-2 gap-2">
                        {rpList.map((rp, index) => (
                            <Card
                                key={index}
                                className={
                                    checkIfConflictRP(rp.id) && "!bg-red-100"
                                }
                            >
                                <Profile>
                                    <img src={rp.profile??"/storage/profile/profile.png"} onError={(event) => event.target.src = "/storage/profile/profile.png"} alt="" />
                                </Profile>
                                <div className="pl-2 pointer-events-none">
                                    <div className="line-clamp-1 pointer-events-none">
                                        {rp.name}
                                    </div>
                                    <div className="line-clamp-1 text-sm text-gray-500 pointer-events-none">
                                        {rp.position}
                                    </div>
                                </div>
                                {checkIfConflictRP(rp.id) && (
                                    <div onClick={() => onRemoveRP(rp)} className="shrink-0 ml-auto pl-2">
                                        <button className="p-2 ml-auto hover:bg-red-300 text-red-700 rounded-full transition duration-150">
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

const Card = styled.div.attrs((props) => ({
    className: `${props.$active} h-16 rounded-md flex items-center px-2 bg-slate-100/50`,
}))``;

const Profile = styled.div.attrs((props) => ({
    className: `${
        props.$size ?? "w-12 h-12"
    } rounded-full shrink-0 overflow-hidden pointer-events-none bg-white/90`,
}))``;

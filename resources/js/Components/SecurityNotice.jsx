import { router } from "@inertiajs/react";
import PrimaryButton from "./Buttons/PrimaryButton";
import Modal, { ModalHeader } from "./Modal";
import { usePage } from "@inertiajs/react";

const SecurityNotice = ({ show, security, passwordChange, onClose }) => {
    const { url } = usePage()
    return (
        <Modal show={show} position backdrop={false} maxWidth="sm">
            <div className="p-2">
                <ModalHeader labelClassName="text-red-600" label="Security notice" onClose={onClose}/>
                <div className={"px-2 "+(url.startsWith('/profile') && "pb-4")}>
                    <ul className="list-disc ml-3">
                        {!security && <li>You have not set your security question, set security question now.</li>}
                        {passwordChange && <li>Your password is not secure, change your password now.</li>}
                    </ul>
                </div>

                {
                    !url.startsWith('/profile') && 
                    <div className="flex mt-3">
                        <PrimaryButton className="!py-2 !px-2.5 ml-auto" onClick={() => router.get(route('profile.edit'))}>
                            Go to profile
                        </PrimaryButton>
                    </div>
                }
            </div>
        </Modal>
    );
};

export default SecurityNotice;

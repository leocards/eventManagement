import Modal, { ModalHeader } from "../../Modal";

export default function GraphDetails({show = true, label = '', children, onClose = () => {}}) {

    return (
        <Modal show={show} maxWidth="xl">
            <div className="p-4">
                <ModalHeader onClose={onClose}>
                    {label}
                </ModalHeader>

                { children }

            </div>
        </Modal>
    )
}
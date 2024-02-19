import DangerButton from "./Buttons/DangerButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Modal from "./Modal";

export default function DeleteConfirmation({
    show = false,
    children,
    buttonPosition = "center",
    processing,
    onConfirmDelete,
    onCancel,
}) {
    const position = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }[buttonPosition];

    return (
        <Modal show={show} maxWidth="md" onClose={() => !processing?onCancel(false):''}>
            <div className="p-5">
                {children}

                <div className={"flex items-center gap-3 " + position}>
                    <SecondaryButton disabled={processing} className="disabled:cursor-not-allowed disabled:hover:bg-current" onClick={() => onCancel(false)}>
                        Cancel
                    </SecondaryButton>
                    <DangerButton disabled={processing} className="disabled:cursor-not-allowed disabled:hover:bg-current" onClick={() => onConfirmDelete()}>
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <LoadingIcon />
                                Processing...
                            </div>
                        ) : (
                            "Yes, delete"
                        )}
                    </DangerButton>
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

import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { LoadOnSubmit } from "@/Components/LoadingSearch";
import Modal from "@/Components/Modal";
import { useEffect, useRef, useState } from "react";

export default function PrintEvaluations({ src, show, onCancel = () => {} }) {
    const frameRef = useRef(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(show) {
            setLoading(true)
        }
        // return () => setTimeout(() => {setLoading(true)}, 10)
    }, [show])

    return (
        <Modal show={show} maxWidth="7xl">
            <div className="p-4">
                <div className="overflow-y-auto h-[75vh] rounded-md ring-1 ring-slate-200/80 relative">
                    <iframe
                        ref={frameRef}
                        src={src}
                        className="w-full h-full"
                        onLoad={() => setLoading(false)}
                    />

                    {loading && <div className="absolute top-0 left-0 w-full flex h-full bg-black/50">
                        <div className="my-auto mx-auto h-fit uppercase text-white font-bold text-xl">
                            Loading...
                        </div>
                    </div>}
                </div>
                <div className="flex gap-3 justify-end mt-4">
                    <SecondaryButton
                        onClick={onCancel}
                        className="w-28 justify-center py-3"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        disabled={loading}
                        onClick={() => frameRef.current.contentWindow.print()}
                        className="w-32 justify-center py-3"
                    >
                        Print
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

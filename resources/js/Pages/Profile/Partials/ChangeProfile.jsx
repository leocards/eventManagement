import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import ImageUploader from "@/Components/ImageUploader";
import Modal, { ModalHeader } from "@/Components/Modal";
import { useForm } from "@inertiajs/react"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ChangeProfile({ show, onClose = () => {} }) {
    const MySwal = withReactContent(Swal);
    const {data, setData, reset, post, processing, errors, setError, clearErrors, isDirty} = useForm({
        profile: null
    })

    const onSubmit = () => {
        post(route('profile.picture.update'), {
            onSuccess: ({props:{message}}) => {
                MySwal.fire({
                    text: message,
                    icon: "success",
                    toast: true,
                    position: "top-right",
                    timerProgressBar: true,
                    timer: 3000,
                    showConfirmButton: false,
                });

                onClose()
            },
            onError: error => {
                console.log(error)
            }
        })
    }

    return (
        <Modal show={show} maxWidth="md">
            <div className="p-4">
                <ModalHeader label="Upload profile" showCloseButton={false} />
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

                <div className=" flex gap-3 mt-7 justify-end">
                    <SecondaryButton 
                        onClick={() => {
                            onClose()
                            reset()
                        }}
                        disabled={processing}
                        className={"w-32 justify-center text-nowrap"}
                    > Cancel </SecondaryButton>
                    <PrimaryButton
                        onClick={onSubmit}
                        disabled={processing||!isDirty}
                        className={"w-40 justify-center text-nowrap "+(processing || !isDirty? "pointer-events-none" : "")}
                    >Upload profile</PrimaryButton>
                </div>
            </div>
        </Modal>
    )
}
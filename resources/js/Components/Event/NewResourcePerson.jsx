import { useForm } from "@inertiajs/react";
import ImageUploader from "../ImageUploader";
import InputLabel from "../InputLabel";
import Modal from "../Modal";
import TextInput from "../TextInput";
import { useEffect } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function NewResourcePerson({ show = false, rpEdit = null, onClose = () => {}, onSuccess = () => {} }) {
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
        name: "",
        position: "",
        profile: null,
    });

    useEffect(() => {
        if (data.profile?.response) {
            clearErrors("profile");
        }
    }, [data.profile]);

    useEffect(() => {
        if (show) {
            reset();
            clearErrors();
        }
        if(rpEdit && show) {
            setData({
                name: rpEdit.name,
                position: rpEdit.position,
                profile: rpEdit.profile?{
                    response: true, data: { base64: rpEdit.profile, extension: rpEdit.profile.split(".")[1] }
                }:null,
            })
        }
    }, [show]);

    useEffect(() => {
        if(!rpEdit) {
            reset()
        }
    }, [rpEdit])

    const onSubmit = () => {
        post(rpEdit?route('rp.update', [rpEdit.id]):route('rp.new'), {
            onSuccess: () => {
                if(rpEdit) onSuccess('updated')
                else onSuccess()
            },
            onError: err => {
                console.log(err)
            }
        })
    }

    return (
        <Modal show={show} maxWidth="xl" onClose={onClose}>
            <div className={"p-4 "+(processing&&"pointer-events-none")}>
                <div className="text-xl font-medium mb-4">
                    {rpEdit?"Update":"New"} Resource Person
                </div>
                <div className="mb-4">
                    <div className={"form-input-float "+(errors.name && "border-pink-600 focus-within:border-pink-600 " )}>
                        <TextInput
                            id="name"
                            placeholder="name"
                            value={data.name}
                            onInput={({target}) => setData("name", target.value)}
                        />

                        <InputLabel htmlFor="name" value="Name" className={errors.name && "!text-pink-600"} />
                    </div>
                    <div className="text-sm text-pink-700">{errors.name}</div>
                </div>
                <div className="mb-4">
                    <div className={"form-input-float "+(errors.position && "border-pink-600 focus-within:border-pink-600 " )}>
                        <TextInput
                            id="Position"
                            placeholder="Position"
                            value={data.position}
                            onInput={({target}) => setData("position", target.value)}
                        />

                        <InputLabel htmlFor="Position" value="Position" className={errors.position && "!text-pink-600"} />
                    </div>
                    <div className="text-sm text-pink-700">
                        {errors.position}
                    </div>
                </div>

                <ImageUploader
                    image={data.profile}
                    errorImage={errors.profile}
                    onUpload={(image) => setData("profile", image)}
                    onError={(err) => {
                        setError("profile", err);
                    }}
                    onRemove={(remove) => setData("profile", remove)}
                />
                <div className="text-sm text-pink-700">{errors.profile}</div>

                <div className="mt-5 w-full flex">
                    <SecondaryButton
                        disabled={processing}
                        onClick={() => onClose()}
                        className="ml-auto w-32 !py-3 justify-center"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton onClick={onSubmit} disabled={processing} className="ml-3 w-32 !py-3 justify-center">
                        {processing ? "Processing" : (rpEdit?"Update":"Submit")}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

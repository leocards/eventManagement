import { useEffect, useRef } from "react";
import InputLabel from "./InputLabel";
import Base64ImageConverter from "@/js/Base64ImageConverter";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function ImageUploader({
    image,
    errorImage,
    onUpload = () => {},
    onError = () => {},
    onRemove = () => {},
}) {
    const fileImageRef = useRef(null);

    const uploadImage = async (image) => {
        if (image.target.files.length > 0) {
            let converter = await Base64ImageConverter(
                image.target.files[0]
            ).getBase64();
            if (converter.response) onUpload(converter);
            else onError(converter.data);
        }
    };

    return (
        <div
            className={
                "form-input-float group " +
                (errorImage && !image
                    ? "border-pink-600 focus-within:border-pink-600"
                    : "")
            }
        >
            {!image && (
                <button
                    type="button"
                    className="opacity-50 py-[1.075rem] w-full text-left px-4 text-sm"
                    onClick={() => fileImageRef.current.click()}
                >
                    Choose image
                </button>
            )}

            {image && (
                <div className="p-4">
                    <div className="rounded-md overflow-hidden w-fit mx-auto h-[15rem] border relative">
                        <img
                            className="w-fit h-full object-contain"
                            src={image.data.base64}
                        />

                        <div className="absolute top-0 right-0 p-2 flex gap-3">
                            <button onClick={() => fileImageRef.current.click()} className="shadow-md bg-black/20 hover:bg-black/40 transition duration-150 text-white rounded-full p-2">
                                <ArrowUpTrayIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => {
                                onRemove(null)
                                fileImageRef.current.value = ""
                            }} className="shadow-md bg-black/20 hover:bg-black/40 transition duration-150 text-white rounded-full p-2">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <input
                ref={fileImageRef}
                type="file"
                name="profile"
                id="profile"
                placeholder="profile"
                hidden
                onChange={uploadImage}
            />
            <InputLabel
                htmlFor="profile"
                value="Profile"
                className={errorImage && !image ? "!text-pink-700" : ""}
            />
        </div>
    );
}

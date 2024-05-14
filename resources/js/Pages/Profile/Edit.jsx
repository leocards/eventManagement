import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import Profile from "./Partials/Profile";
import Security from "./Partials/Security";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ChangeProfile from "./Partials/ChangeProfile";
import { useSelector, useDispatch } from "react-redux";
import { setIgnoreNotice, toggleShowModal } from "@/Store/securityNotice";
import SecurityNotice from "@/Components/SecurityNotice";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    questions,
    security,
    passwordChanged,
    notice

}) {
    const [tabs, setTabs] = useState(!passwordChanged? 'change' : !security ? "security" : "profile");
    const [isUploadProfile, setIsUploadProfile] = useState(false);
    const showModalNotice = useSelector(state => state.securityNotice.showModal)
    const dispatch = useDispatch();
    const sqs = [
        "Favorite online hobby or activity?",
        "Preferred social media platform?",
        "In what city were you born",
        "What is the name of your favorite childhood friend?",
        "What order are you among the siblings?",
        "What's your mother's maiden name",
        "What is the name of your oldest sibling?",
        "What is the name of your favorite musician or band?",
        "What is your favorite childhood pet's name?",
        "Favorite childhood cartoon",
        "What is the name of the hospital where you were born",
        "In which year did you graduate from high school?",
        "What is your favorite pet's name?",
        "What is your favorite sports team?",
        "What was the name of your first childhood friend?",
    ];

    useEffect(() => {
        if(notice) {
            dispatch(toggleShowModal())
        }
    },[])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="my-3">
                <div className="mx-auto max-w-xl w-full">
                    <div className="flex mx-auto w-fit">
                        <div className="relative">
                            <div className="rounded-full w-28 h-28 overflow-hidden">
                                <img
                                    src={auth.user.profile??"/storage/profile/profile.png"}
                                    onError={({ target }) =>
                                        (target.src =
                                            "/storage/profile/profile.png")
                                    }
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>

                            <button
                                onClick={() => setIsUploadProfile(true)}
                                className="w-8 h-8 absolute bottom-1 right-0 pb-px flex items-center justify-center bg-slate-300 
                                ring-2 ring-slate-100 rounded-full group overflow-hidden"
                            >
                                <CameraIcon className="w-5 h-5" />
                                <div className="z-10 group-hover:bg-black/40 w-full h-full absolute rounded-full transition-all duration-150"></div>
                            </button>
                        </div>

                        <div className="ml-7 my-auto">
                            <div className="text-3xl font-gotham">
                                {auth.user.first_name} {auth.user.last_name}
                            </div>
                            <div className="text-lg font-sans">
                                {auth.user.position}
                            </div>
                            <div className="text-lg font-sans">
                                {auth.user.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-4 container !max-w-xl p-4 mx-auto mb-4">
                    <TabButton
                        onClick={() => setTabs("profile")}
                        $active={tabs === "profile"}
                    >
                        Profile
                    </TabButton>
                    <TabButton
                        onClick={() => setTabs("edit")}
                        $active={tabs === "edit"}
                    >
                        Edit Profile
                    </TabButton>
                    <TabButton
                        onClick={() => setTabs("change")}
                        $active={tabs === "change"}
                    >
                        Change password
                    </TabButton>
                    <TabButton
                        onClick={() => setTabs("security")}
                        $active={tabs === "security"}
                    >
                        Security
                    </TabButton>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {!security && tabs == "security" && (
                        <Container className="!p-3 justify-center !ring-none !shadow-none text-blue-700 items-center flex gap-3">
                            <InformationCircleIcon className="w-5 h-5" /> Please
                            provide security questions for your account.
                        </Container>
                    )}

                    {passwordChanged && tabs == "change" && (
                        <Container className="!p-3 justify-center !ring-none !shadow-none text-blue-700 items-center flex gap-3">
                            <InformationCircleIcon className="w-5 h-5" /> Please change your password
                        </Container>
                    )}

                    {tabs == "profile" && (
                        <Container>
                            <Profile user={auth.user} />
                        </Container>
                    )}
                    {tabs == "edit" && (
                        <Container>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </Container>
                    )}
                    {tabs == "change" && (
                        <Container>
                            <UpdatePasswordForm className="max-w-xl" />
                        </Container>
                    )}
                    {tabs == "security" && (
                        <Container>
                            <Security questions={sqs} userSqs={questions} />
                        </Container>
                    )}
                </div>
            </div>

            <ChangeProfile
                show={isUploadProfile}
                onClose={() => setIsUploadProfile(false)}
            />

            <SecurityNotice
                show={showModalNotice}  
                onClose={() => {
                    dispatch(setIgnoreNotice());
                }}
                security={security}
                passwordChange={passwordChanged}
            />
        </AuthenticatedLayout>
    );
}

const TabButton = styled.button.attrs(({ $active }) => ({
    className: `${
        $active
            ? "bg-blue-100 border-blue-700 text-blue-700"
            : "hover:bg-gray-100 hover:border-gray-400"
    } text-sm p-1.5  border-b-2 font-semibold transition duration-150`,
}))``;

const Container = styled.div.attrs(() => ({
    className: `container !max-w-xl mx-auto p-4 sm:p-8 b g-white sm:rounded-lg`,
}))``;

import { Link, Head, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { CheckIcon } from "@heroicons/react/20/solid";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    status,
    canResetPassword,
}) {
    const MySwal = withReactContent(Swal);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        if (status) {
            MySwal.fire({
                text: status,
                icon: "success",
                toast: true,
                position: "top",
                timerProgressBar: true,
                timer: 3000,
                showConfirmButton: false,
            });
        }
    }, [status]);

    return (
        <>
            <Head title="Welcome" />

            <div className="text-gray-700 h-screen">
                <header className="p-2.5 sm:px-8 md:px-14 bg-white shadow-sm">
                    <div className="flex">
                        <div className="flex">
                            <img src="/storage/logo.png" className="w-12" />
                            <div className="font-gotham text-xl my-auto ml-2 hidden md:block">
                                <div className="lg:block hidden">{ (import.meta.env.VITE_APP_NAME).split('_').join(' ') }</div>
                            </div>
                        </div>

                        <div className="flex gap-4 ml-auto">
                            <div className="my-auto hidden sm:block">
                                {moment().format("LL")}
                            </div>
                            <button
                                onClick={() => setShowRegistration(true)}
                                className="p-2.5 my-auto h-fit px-6 transition-all duration-150 
                            rounded-full bg-blue-600 text-white hover:bg-[linear-gradient(-45deg,#D000F7,#24BAE3)]"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </header>

                <div className="my-10 max-w-7xl md:h-[calc(100vh-10rem)] mx-auto grid grid-cols-1 row-span-2 md:row-span-1 md:grid-cols-12 md:gap-7 p-4">
                    <div className="md:col-span-7 col-span-1 flex flex-col">
                        <div className="mx-auto my-auto pb">
                            <div className="md:text-5xl sm:text-2xl text-lg font-bold text-center md:text-left">
                                Welcome to DSWD Davao{" "}
                                <br className="hidden md:block" />
                                TAMS Up: Training Attendance{" "}
                                <br className="hidden md:block" />
                                Monitoring System - Upgrade{" "}
                                <br className="hidden md:block" />
                                <span className="text-current md:text-xl">
                                    for 4Ps Employees
                                </span>
                            </div>
                            <div className="max-w-xl md:text-lg text-center md:text-left mt-4 mx-auto md:mx-0">
                                Training Attendance Monitoring System - Updgrade for 4ps
                                Employees in Davao Region that streamlines
                                managing and recording of attendance during
                                training sessions.
                            </div>

                            <div className="mt-10 font- find md:block hidden">
                                <div>Find us on</div>
                                <ul>
                                    <a
                                        href="https://www.facebook.com/dswdfo11"
                                        className=""
                                        target="_blank"
                                    >
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                                className="w-4 h-4"
                                                fill="currentColor"
                                            >
                                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                            </svg>
                                        </li>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/dswdfo11/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                                        target="_blank"
                                    >
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                            >
                                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                            </svg>
                                        </li>
                                    </a>
                                    <a
                                        href="https://twitter.com/dswdfo11?fbclid=IwAR3cUEDEik7RQFsEAarm0I8SYdEF28xjtezlCoClSIZiIB-YCqYKTx0VVXA"
                                        target="_blank"
                                    >
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                            >
                                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                            </svg>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 flex flex-col pb- md:mt-0 mt-10">
                        <Login
                            status={status}
                            canResetPassword={canResetPassword}
                        />
                    </div>

                    <div className="mt-10 font- find md:hidden block">
                        <div>Find us on</div>
                        <ul>
                            <a
                                href="https://www.facebook.com/dswdfo11"
                                className=""
                                target="_blank"
                            >
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        className="w-4 h-4"
                                        fill="currentColor"
                                    >
                                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                    </svg>
                                </li>
                            </a>
                            <a
                                href="https://www.instagram.com/dswdfo11/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                                target="_blank"
                            >
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                    >
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </li>
                            </a>
                            <a
                                href="https://twitter.com/dswdfo11?fbclid=IwAR3cUEDEik7RQFsEAarm0I8SYdEF28xjtezlCoClSIZiIB-YCqYKTx0VVXA"
                                target="_blank"
                            >
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                    >
                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                    </svg>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>

            <Register
                show={showRegistration}
                onClose={() => setShowRegistration(false)}
            />
        </>
    );
}

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
    ArrowLeftStartOnRectangleIcon,
    BellIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import ResponsiveNavLink from "../ResponsiveNavLink";
import Notifications from "../Dashboard/Trainee/Notifications";

export default function TopNavigation({ auth, showMenu, onClickMenu = () => {} }) {
    const { url } = usePage();
    const notifRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);
    const [activeNotify, setActiveNotify] = useState(false)

    const onShowNotification = () => {
        if(!url.startsWith("/trainee/all-notifications"))
            setShowNotification(!showNotification);
    };

    useEffect(() => {
        function onClickOutside(e) {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotification(false);
            }
        }

        document.addEventListener("click", onClickOutside, {capture: true});

        url.startsWith("/trainee/all-notifications") && setShowNotification(false);         

        return () => document.removeEventListener("click", onClickOutside, {capture: true});
    }, []);

    return (
        <nav className="w-full bg-white fixed top-0 z-40 shadw-[0px_2px_20px_rgba(1,41,112,0.1)]">
            <div className="mx-auto px-5">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center gap-3">
                            <button onClick={onClickMenu} className={"transition duration-150 mr-4 p-2 rounded-full " + (showMenu?"bg-blue-200/50 text-blue-700":"hover:bg-slate-200/50")}>
                                <Bars3Icon className="w-6 h-6" />
                            </button>

                            <Link href="/" className="flex items-center gap-3">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />

                                <div className="text-xl font-bold sm:block hidden">
                                    <div className="lg:block hidden">{ (import.meta.env.VITE_APP_NAME).split('_').join(' ') }</div>
                                    <div className="lg:hidden">TAMS Up</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="h-fit flex items-center">
                        {auth.role === "Employee" && (
                            <div
                                className="relative w-fit h-fit mr-3"
                                ref={notifRef}
                            >
                                <button
                                    id="notification"
                                    onClick={onShowNotification}
                                    className={"p-2.5 rounded-full  transition duration-150 relative "+
                                    (url.startsWith("/trainee/all-notifications")?"!bg-blue-100 cursor-default":"hover:bg-gray-200")}
                                >
                                    <BellIcon className="w-6 h-6" />

                                    {activeNotify && <span className="absolute top-2 right-2.5 flex h-3 w-3 pointer-events-none">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-600 text-xs font-semibold text-white items-center justify-center"></span>
                                    </span>}
                                </button>
                                <Notifications show={showNotification} getUnread={unread => (unread) ? setActiveNotify(true) : setActiveNotify(false)} />
                            </div>
                        )}
                        <Profile auth={auth} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

const Profile = ({ auth }) => {
    const [showMenu, setShowMenu] = useState(false);
    const profileRef = useRef(null);

    function clickOutside(e) {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", clickOutside);

        return () => {
            document.removeEventListener("click", clickOutside);
        };
    }, []);

    return (
        <div ref={profileRef} className="relative">
            <div
                className="flex items-center cursor-pointer group"
                onClick={() => setShowMenu(!showMenu)}
            >
                <div className="w-10 shrink-0 h-10 rounded-full relative bg-white/90">
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={auth.profile??"/storage/profile/profile.png"} className="object-cover w-full h-full" onError={(event) => event.target.src = "/storage/profile/profile.png"} alt="" />
                    </div>
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-4 w-4 text-gray-400 rounded-full bg-gray-200 absolute bottom-0 right-0"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3 group-hover:text-blue-700 text-gray-700 font-medium select-none">
                    {auth.first_name} {auth.last_name}
                </div>
            </div>
            <Transition
                as={Fragment}
                show={showMenu}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute top-14 right-0 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black/5 rounded-md py-2">
                    <ResponsiveNavLink href={route("profile.edit")}>
                        <UserCircleIcon className="w-5 h-5 mr-3" />
                        My profile
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        method="post"
                        href={route("logout")}
                        as="button"
                    >
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-3" />
                        Logout
                    </ResponsiveNavLink>
                </div>
            </Transition>
        </div>
    );
};

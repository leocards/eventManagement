import {
    ArrowLeftStartOnRectangleIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
    QueueListIcon,
    Squares2X2Icon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import NavLink from "../NavLink";
import { usePage } from "@inertiajs/react";
import { ListBulletIcon } from "@heroicons/react/20/solid";

export default function SideNavigation({ auth, showSideBar }) {
    const { url, component } = usePage();

    /* absolute top-0 h-screen z-10 */ // For responsiveness
    return (
        showSideBar && <aside className="pt-10 lg:w-80 shrink-0 fixed h-full z-30 md:w-20 md:relative sm:hidden md:block bg-white ">
            <ul className="py-10 pb-5 px-4 select-none lg:block flex flex-col items-center">
                <li className="lg:mb-3 w-fit lg:w-full">
                    <NavLink
                        active={url.startsWith("/dashboard") ? true : false}
                        href={route("dashboard")}
                        className="lg:w-full p-2.5 md:w-fit rounded-md"
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                        <div className="font-semibold text-base lg:ml-3.5 md:ml-0 lg:block hidden">
                            Dashboard
                        </div>
                    </NavLink>
                </li>
                <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                    Manage
                </li>
                <li className="w-full lg:hidden">
                    <hr className="my-4 lg:hidden" />
                </li>
                {auth.role != "Employee" ? (
                    <>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={url.startsWith("/event") ? true : false}
                                href={route("event")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <i className="bi bi-calendar-check mx-0.5"></i>
                                <div className="font-semibold text-base lg:ml-3.5 lg:block hidden">
                                    Event
                                </div>
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/employee") ? true : false
                                }
                                href={route("employee")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <UserGroupIcon className="w-5 h-5" />
                                <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Employee
                                </div>
                            </NavLink>
                        </li>
                        <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                            Printables
                        </li>
                        <li className="w-full lg:hidden">
                            <hr className="my-4 lg:hidden" />
                        </li>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/attendance") ? true : false
                                }
                                href={route("attendance")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <QueueListIcon className="w-5 h-5" />
                                <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Attendance
                                </div>
                            </NavLink>
                        </li>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/cbu-monitoring")
                                        ? true
                                        : false
                                }
                                href={route("cbu-monitoring")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <ArrowTrendingUpIcon className="w-5 h-5" />
                                <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    CBU Training Monitoring
                                </div>
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/reports") ? true : false
                                }
                                href={route("reports")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <ChartBarIcon className="w-5 h-5" />
                                <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Reports
                                </div>
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={url.startsWith("/trainee/attendance") ? true : false}
                                href={route("trainee.attendance")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <QueueListIcon className="w-5 h-5" />
                                <div className="font-semibold text-base lg:ml-3.5 lg:block hidden">
                                    Attendance
                                </div>
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/trainee/trainings") ? true : false
                                }
                                href={route("trainee.trinings")}
                                className="lg:w-full p-2.5 md:w-fit rounded-md"
                            >
                                <ListBulletIcon className="w-5 h-5" />
                                <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Trainings
                                </div>
                            </NavLink>
                        </li>
                    </>
                )}

                <li className="w-full lg:block hidden">
                    <hr className="my-4" />
                </li>

                <li className="lg:mt-3 w-fit lg:w-full">
                    <NavLink className="lg:w-full p-2.5 md:w-fit rounded-md">
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                        <div className="font-semibold text-base ml-3.5 lg:block hidden">
                            Logout
                        </div>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

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

    const responsiveSidebar = {
        true: "pt-10 lg:w-80 shrink-0 fixed w-80 h-full z-30 md:w-20 md:relative sm:hidden md:block bg-white sm:shadow-none shadow-2xl",
        false: "pt-10 lg:w-[4.7rem] lg:block lg:relative shrink-0 h-full z-30 hidden bg-white"
    }[showSideBar]

    /* absolute top-0 h-screen z-10 */ // For responsiveness
    return (
        <aside className={" "+responsiveSidebar}>
            <ul className="py-10 pb-5 px-4 select-none lg:block flex flex-col items-center">
                <li className="lg:mb-3 w-fit lg:w-full">
                    <NavLink
                        active={url.startsWith("/dashboard") ? true : false}
                        href={route("dashboard")}
                        className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                        {showSideBar && <div className={"font-semibold text-base lg:ml-3.5 md:ml-0 lg:block "+(showSideBar?'hidden':'')}>
                            Dashboard
                        </div>}
                    </NavLink>
                </li>
                {showSideBar && <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                    Manage
                </li>}
                <li className={"w-full "+(showSideBar?' lg:hidden':'')}>
                    <hr className={"my-4 "+(showSideBar?' lg:hidden':'')} />
                </li>
                {auth.role != "Employee" ? (
                    <>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={url.startsWith("/event") ? true : false}
                                href={route("event")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <i className="bi bi-calendar-check mx-0.5"></i>
                                {showSideBar && <div className="font-semibold text-base lg:ml-3.5 lg:block hidden">
                                    Event
                                </div>}
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/employee") ? true : false
                                }
                                href={route("employee")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <UserGroupIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Employee
                                </div>}
                            </NavLink>
                        </li>
                        {showSideBar && <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                            Printables
                        </li>}
                        <li className={"w-full "+(showSideBar?' lg:hidden':'')}>
                            <hr className={"my-4 "+(showSideBar?' lg:hidden':'')} />
                        </li>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/attendance") ? true : false
                                }
                                href={route("attendance")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <QueueListIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Attendance
                                </div>}
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
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <ArrowTrendingUpIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    CBU Training Monitoring
                                </div>}
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/reports") ? true : false
                                }
                                href={route("reports")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <ChartBarIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Reports
                                </div>}
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mb-1 w-fit lg:w-full">
                            <NavLink
                                active={url.startsWith("/trainee/attendance") ? true : false}
                                href={route("trainee.attendance")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <QueueListIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base lg:ml-3.5 lg:block hidden">
                                    Attendance
                                </div>}
                            </NavLink>
                        </li>
                        <li className="lg:mb-3 w-fit lg:w-full">
                            <NavLink
                                active={
                                    url.startsWith("/trainee/trainings") ? true : false
                                }
                                href={route("trainee.trinings")}
                                className={"p-2.5 md:w-fit rounded-md "+(showSideBar ? "lg:w-full" : "")}
                            >
                                <ListBulletIcon className="w-5 h-5" />
                                {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                                    Trainings
                                </div>}
                            </NavLink>
                        </li>
                    </>
                )}

                <li className="w-full lg:block hidden">
                    <hr className="my-4" />
                </li>

                <li className="lg:mt-3 w-fit lg:w-full">
                    <NavLink method="post" as="button" href={route("logout")} className={"p-2.5 md:w-fit rounded-md"+(showSideBar ? "lg:w-full" : "")} >
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                        {showSideBar && <div className="font-semibold text-base ml-3.5 lg:block hidden">
                            Logout
                        </div>}
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

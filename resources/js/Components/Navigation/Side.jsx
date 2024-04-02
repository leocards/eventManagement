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

export default function Side({ auth, showSideBar }) {
    const { url, component } = usePage();

    const responsiveSidebar = {
        true: "lg:block lg:relative fixed w-80 h-full lg:z-0 z-30 lg:shadow-none shadow-2xl ",
        false: "hidden lg:block lg:w-20"
    }[showSideBar]

    return (
        <aside className={"shrink-0 bg-white overflow-y-hidden "+responsiveSidebar}>
            <ul className={`h-full pt-20 flex flex-col gap-2 ${!showSideBar?"items-center":"items-start"}`}>
                <li className={`${showSideBar?"w-full px-4":""}`}>
                    <NavigationButton 
                        active={url.startsWith("/dashboard") ? true : false}
                        href={route("dashboard")}
                        icon={<Squares2X2Icon className="w-5 h-5" />}
                        showMenu={showSideBar}
                        label="Dashboard"
                    />
                </li>

                {showSideBar && <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                Manage
                </li>}
                <li className={"w-full "+(showSideBar?' lg:hidden':'')}>
                    <hr className={"my-4 "+(showSideBar?' lg:hidden':'')} />
                </li>

                {
                    auth.role != 'Employee' ? (
                        <>
                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={url.startsWith("/event") ? true : false}
                                    href={route("event")}
                                    icon={<i className="bi bi-calendar-check mx-0.5"></i>}
                                    showMenu={showSideBar}
                                    label="Event"
                                />
                            </li>

                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={
                                        url.startsWith("/employee") ? true : false
                                    }
                                    href={route("employee")}
                                    icon={<UserGroupIcon className="w-5 h-5" />}
                                    showMenu={showSideBar}
                                    label="Employee"
                                />
                            </li>
                            
                            {showSideBar && <li className="uppercase text-[11px] font-semibold font-open text-slate-400 pl-2.5 mt-5 mb-1 hidden lg:block">
                                Printables
                            </li>}
                            <li className={"w-full "+(showSideBar?' lg:hidden':'')}>
                                <hr className={"my-4 "+(showSideBar?' lg:hidden':'')} />
                            </li>

                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={
                                        url.startsWith("/attendance") ? true : false
                                    }
                                    href={route("attendance")}
                                    icon={<QueueListIcon className="w-5 h-5" />}
                                    showMenu={showSideBar}
                                    label="Attendance"
                                />
                            </li>

                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={
                                        url.startsWith("/cbu-monitoring")
                                            ? true
                                            : false
                                    }
                                    href={route("cbu-monitoring")}
                                    icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                                    showMenu={showSideBar}
                                    label="CBU Training Monitoring"
                                />
                            </li>

                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={url.startsWith("/reports") ? true : false}
                                    href={route("reports")}
                                    icon={<ChartBarIcon className="w-5 h-5" />}
                                    showMenu={showSideBar}
                                    label="Reports"
                                />
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={url.startsWith("/trainee/attendance") ? true : false}
                                    icon={<QueueListIcon className="w-5 h-5" />}
                                    href={route("trainee.attendance")}
                                    showMenu={showSideBar}
                                    label="Attendance"
                                />
                            </li>

                            <li className={`${showSideBar?"w-full px-4":""}`}>
                                <NavigationButton 
                                    active={url.startsWith("/trainee/trainings") ? true : false}
                                    icon={<ListBulletIcon className="w-5 h-5" />}
                                    href={route("trainee.trinings")}
                                    showMenu={showSideBar}
                                    label="Trainings"
                                />
                            </li>
                        </>
                    )
                }

                <li className="w-full lg:block hidden">
                    <hr className="my-4" />
                </li>

                <li className={`${showSideBar?"w-full px-4":""}`}>
                    <NavigationButton 
                        as="button" 
                        method="post" 
                        href={route("logout")}
                        showMenu={showSideBar}
                        icon={<ArrowLeftStartOnRectangleIcon className="w-5 h-5" />}
                        label="Logout"
                    />
                </li>

            </ul>
        </aside>
    );
}

const NavigationButton = ({ label = 'label', icon, showMenu = true, ...props }) => {
    return (
        <NavLink className={`h-11 rounded-md px-3 ${showMenu?'w-full':''} ${props.className}`} {...props}>
            {icon}
            {showMenu && <div className="font-semibold text-base mr-1 ml-3.5">{label}</div>}
        </NavLink>
    )
}
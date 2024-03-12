import Calendar from "@/Components/Dashboard/Calendar";
import Clock from "@/Components/Dashboard/Clock";
import RecentActivity from "@/Components/Dashboard/RecentActivity";
import Statistics from "@/Components/Dashboard/Statistics";
import TimeInTimeOut from "@/Components/Dashboard/Trainee/TimeInTimeOutModal";
import TopCards from "@/Components/Dashboard/Trainee/TopCards";
import Upcoming from "@/Components/Dashboard/Upcoming";
import PageHeader from "@/Components/PageHeader";
import SexDesiggredatedDataChart from "@/Components/Reports/SexDesiggredatedDataChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { defaults } from "chart.js/auto"; //required for chart
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Dashboard({ auth, upcoming, totalevents, active }) {
    const MySwal = withReactContent(Swal);
    const [showTimeInOutModal, setShowTimeInOutModal] = useState(false);
    const [session, setSession] = useState("Time in");
    const showMenu = useSelector(state => state.menuToggle.showMenu)

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <PageHeader title="Dashboard" links={["Dashboard"]}>
                <Clock />
            </PageHeader>

            <TopCards
                onTimeIn={(session) => {
                    setShowTimeInOutModal(true);
                    setSession(session)
                }}
                onTimeOut={(session) => {
                    setShowTimeInOutModal(true);
                    setSession(session)
                }}
                numberOfEvents={totalevents}
            />

            <div className="flex flex-col gap-1">
                <div className={`grid gap-3 mt-6 p-1 px-0.5 grid-cols-[1fr] h-auto min-lg:grid-cols-[2fr,1fr] mm-md:grid-cols-[2fr,1fr]`}>
                    <Upcoming initialList={upcoming} active={active} />
                    <RecentActivity user={auth.user} />
                </div>

                <div className="mt-6">
                    <Calendar />
                </div>
            </div>

            <TimeInTimeOut
                show={showTimeInOutModal}
                session={session}
                onClose={() => setShowTimeInOutModal(false)}
                onSuccess={(message) => {
                    setShowTimeInOutModal(false);
                    MySwal.fire({
                        title: "SUCCESSFUL",
                        text: message,
                        icon: "success",
                        allowOutsideClick: true,
                        showCancelButton: false,
                        showConfirmButton: true,
                        showDenyButton: false,
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            cancelButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            denyButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                        },
                    });
                }}
            />
        </AuthenticatedLayout>
    );
}

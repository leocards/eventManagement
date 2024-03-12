import Calendar from '@/Components/Dashboard/Calendar';
import Clock from '@/Components/Dashboard/Clock';
import RecentActivity from '@/Components/Dashboard/RecentActivity';
import Statistics from '@/Components/Dashboard/Statistics';
import Upcomming from '@/Components/Dashboard/Upcoming';
import PageHeader from '@/Components/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { defaults } from "chart.js/auto"; //keept this imported, required for chart
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard({ auth, upcoming, gender, totalEmployee, numberOfEvents, attendance, active }) {
    const containerRef = useRef()
    const showMenu = useSelector(state => state.menuToggle.showMenu)

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <PageHeader
                title="Dashboard"
                links={['Dashboard']}
            >
                <Clock />
            </PageHeader>

            <Statistics totalEmployee={totalEmployee} numberOfEvents={numberOfEvents} attendance={attendance} gender={gender} />

            <div className="flex flex-col gap-1">
                <div className={`grid gap-3 mt-6 p-1 px-0.5 grid-cols-[1fr] h-auto min-lg:grid-cols-[2fr,1fr] mm-md:grid-cols-[2fr,1fr]`}>
                    <Upcomming initialList={upcoming} active={active} />
                    <RecentActivity user={auth.user} />
                </div>
                
                <div className={`p-1 px-0.5`}>
                    <Calendar height={"auto"} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

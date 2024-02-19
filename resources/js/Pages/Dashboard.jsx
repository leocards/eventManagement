import Calendar from '@/Components/Dashboard/Calendar';
import Clock from '@/Components/Dashboard/Clock';
import RecentActivity from '@/Components/Dashboard/RecentActivity';
import Statistics from '@/Components/Dashboard/Statistics';
import Upcomming from '@/Components/Dashboard/Upcoming';
import PageHeader from '@/Components/PageHeader';
import SexDesiggredatedDataChart from '@/Components/Reports/SexDesiggredatedDataChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { defaults } from "chart.js/auto"; //keept this imported, required for chart
import { useEffect, useRef, useState } from 'react';

export default function Dashboard({ auth, upcoming, gender, totalEmployee, numberOfEvents, attendance }) {
    const chartDoughnut = useRef()

    const setChartWidth = size => {
        chartDoughnut.current.style.width = size+"px"
    }

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

            <Statistics totalEmployee={totalEmployee} numberOfEvents={numberOfEvents} attendance={attendance} />

            <div className='grid grid-cols-[2fr,1fr] gap-3 mt-6 h-[27.5rem]'>
                <Upcomming initialList={upcoming} />
                <RecentActivity user={auth.user} onResizeValue={setChartWidth} />
            </div>
            
            <div className='grid grid-cols-[2fr,auto] gap-3 mt-3 max-h-[39rem] overflow-hidden'>
                <Calendar height={"auto"} />
                <div className="rounded-md bg-white ring-1 ring-slate-200/40 p-3 h-[39rem]" ref={chartDoughnut}>
                    <SexDesiggredatedDataChart gender={gender} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

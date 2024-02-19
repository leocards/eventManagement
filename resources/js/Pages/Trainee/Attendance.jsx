import Clock from "@/Components/Dashboard/Clock";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Attendance({ auth, attendance }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Attendace" />

            <PageHeader title="Attendance" links={["Attendance"]}></PageHeader>

            <div className="container p-4">
                <div className="font-semibold text-lg mb-4">Trainings Attended</div>

                <AttendanceList initialList={attendance} />
            </div>
        </Authenticated>
    );
}

const AttendanceList = ({ initialList }) => {
    const [search, setSearch] = useState("");
    const [pages, setPages] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const setAttendaceData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // set the current data of resource person list
        setAttendance(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendRequest = (searchvalue = null, pageNumber=null) => {
        return axios.get(
            route("trainee.attendance", {
                _query: {
                    search: searchvalue??search,
                    page: pageNumber
                },
            })
        );
    };

    const onSearch = async (s) => {
        setSearch(s)
        const response = await sendRequest(s, pages.current_page);
        setAttendaceData(response.data);
        setLoadingSearch(false);
    }

    const getNextAndPrevPages = async (pageNumber) => {
        setLoadingSearch(true);
        const response = await sendRequest(pageNumber);
        setAttendaceData(response.data);
        setLoadingSearch(false);
    };

    useEffect(() => {
        if (!pages) {
            setAttendaceData(initialList);
        }

        if(!search) {
            setAttendaceData(initialList)
        }
    }, [search]);

    return (
        <div>
            <div className="w-56 border rounded-md mb-4 ml-auto">
                <SearchInput
                    onSearch={(value) => onSearch(value)}
                    onInput={(input) => input && setLoadingSearch(true)}
                />
            </div>
            <GridRow className="border-b pb-2">
                <TableHeader>Date</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Position</TableHeader>
                <TableHeader>Time in</TableHeader>
                <TableHeader>Time out</TableHeader>
            </GridRow>

            <div className="h-[calc(100vh-17rem)] pt-2 overflow-y-auto overscroll-contain">
                {
                    loadingSearch ? (
                        <LoadingList column={5} grid="grid-cols-[14rem,1fr,7.5rem,7.5rem,7.5rem]" />
                    ) : attendance.length === 0 && search ? (
                        <div className="text-center py-2">No results found for " {search} " </div>
                    ) : attendance.length === 0 && !loadingSearch ? (
                        <Empty />
                    ) : (
                        attendance.map((attended, index) => (
                            <TableContent key={index}>
                                <div className="px-3 py-1.5 flex items-center">
                                    {moment(attended.event.dateStart).format('ll')}
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    <div className="line-clamp-1">{attended.event.title}</div>
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    Trainee
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    {moment(attended.time_in).format('LT')}
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    {attended.time_out && moment(attended.time_out).format('LT')}
                                </div>
                            </TableContent>
                        ))
                    )
                }
            </div>

            {pages?.last_page > 1 && (
                <Paginate
                    disabled={{
                        next: pages?.next_page_url ? true : false,
                        previous: pages?.prev_page_url ? true : false,
                    }}
                    contentList={pages}
                    onPrevious={() =>
                        getNextAndPrevPages(pages.current_page - 1)
                    }
                    onNext={() => getNextAndPrevPages(pages.current_page + 1)}
                />
            )}
        </div>
    );
};

const TableHeader = styled.div.attrs(() => ({
    className: `font-bold font-open px-3`,
}))``;

const GridRow = styled.div.attrs(() => ({
    className: `grid grid-cols-[14rem,1fr,7.5rem,7.5rem,7.5rem]`,
}))``;

const TableContent = styled.div.attrs(() => ({
    className: `grid grid-cols-[14rem,1fr,7.5rem,7.5rem,7.5rem] h-14 rounded-md hover:bg-slate-100/50 ring-1 ring-inset ring-transparent 
    hover:ring-slate-200/90 transition-all duration-150 mb-1 cursor-default group`,
}))``;

const Empty = () => {
    return <div className="p-3 w-full text-center">No records</div>;
};
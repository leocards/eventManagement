import Clock from "@/Components/Dashboard/Clock";
import { Filter, SelectByYear } from "@/Components/Event/PopOver";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { convertDate } from "@/js/DateFormatter";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Trainings({ auth, trainings, attends, years }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Trainings" />

            <PageHeader title="Training" links={["Training"]}></PageHeader>

            <div className="container p-4">
                <div className="font-semibold text-lg mb-4">
                    Capability Developer Trainings
                </div>

                <TraineeList initialList={trainings} attends={attends} years={years} />
            </div>
        </Authenticated>
    );
}

const TraineeList = ({ initialList, attends, years }) => {
    const [search, setSearch] = useState("");
    const [pages, setPages] = useState(null);
    const [training, setTraining] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [attendedEvents, setAttendedEvents] = useState(attends);
    const [filters, setFilters] = useState({
        attends: "All",
        year: "All Years",
    });

    const setTrainingData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // set the current data of resource person list
        setTraining(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendRequest = (pageNumber) => {
        return axios.get(
            route("trainee.trinings", {
                _query: {
                    search: search,
                    year: filters.year,
                    attends: filters.attends,
                    page: pageNumber,
                },
            })
        );
    };

    const getNextAndPrevPages = async (pageNumber) => {
        setLoadingSearch(true);
        const response = await sendRequest(pageNumber);
        setTrainingData(response.data.trainings);
        setAttendedEvents(response.data.attends);
        setLoadingSearch(false);
    };

    useEffect(() => {
        if (!pages) {
            setTrainingData(initialList);
        }
        if (search || (filters.attends != "All" || filters.year != "All Years")) {
            getNextAndPrevPages(pages?.current_page);
        } else {
            setTrainingData(initialList);
        }
    }, [search, filters]);

    return (
        <div className="">
            <div className="flex items-center mb-4">
                <Filter
                    filterList={["All", "Attended", "Missed"]}
                    activeFilter={filters.attends}
                    onSelect={(filter) =>
                        setFilters((prev) => ({ ...prev, attends: filter }))
                    }
                />
                <SelectByYear
                    eventYears={[{ year: "All Years" }, ...years]}
                    selectedYear={filters.year}
                    onSelectYear={(year) =>
                        setFilters((prev) => ({ ...prev, year: year }))
                    }
                />
                <div className="w-56 border rounded-md ml-auto">
                    <SearchInput
                        onSearch={(value) => setSearch(value)}
                        onInput={(input) => input && setLoadingSearch(true)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-[45rem]">
                    <GridRow className="border-b pb-2">
                        <TableHeader>Date</TableHeader>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Position</TableHeader>
                        <TableHeader>Time</TableHeader>
                        {/* <TableHeader>Attended</TableHeader> 6rem */}
                    </GridRow>

                    <div className="h-[calc(100vh-17rem)] pt-2 overflow-y-auto overscroll-contain">
                        {loadingSearch ? (
                            <LoadingList
                                column={4}
                                grid="grid-cols-[1fr,1fr,1fr,1fr]"
                            />
                        ) : search && training.length === 0 ? (
                            <div className="text-center py-4">
                                No results found for " {search} "
                            </div>
                        ) : (
                            training.map((train, index) => (
                                <TableContent key={index}>
                                    <div className="px-3 py-1.5 flex items-center text-sm">
                                        {convertDate(
                                            train.event.dateStart,
                                            train.event.dateEnd,
                                            null,
                                            null,
                                            true
                                        )}
                                    </div>
                                    <div className="px-3 py-1.5 flex items-center">
                                        <div className="line-clamp-1">
                                            {train.event.title}
                                        </div>
                                    </div>
                                    <div className="px-3 py-1.5 flex items-center">
                                        Trainee
                                    </div>
                                    <div className="px-3 py-1.5 flex items-center text-sm">
                                        {train.time}
                                    </div>
                                </TableContent>
                            ))
                        )}
                    </div>
                </div>
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
    className: `grid grid-cols-[1fr,1fr,1fr,1fr]`,
}))``;

const TableContent = styled.div.attrs(() => ({
    className: `grid grid-cols-[1fr,1fr,1fr,1fr] min-h-[3rem] rounded-md hover:bg-slate-100/50 ring-1 ring-inset ring-transparent 
    hover:ring-slate-200/90 transition-all duration-150 mb-1 cursor-default group`,
}))``;

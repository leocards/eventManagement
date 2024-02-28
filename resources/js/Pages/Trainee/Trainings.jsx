import Clock from "@/Components/Dashboard/Clock";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { convertDate } from "@/js/DateFormatter";
import { Head } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Trainings({ auth, trainings }) {

    return (
        <Authenticated user={auth.user}>
            <Head title="Trainings" />

            <PageHeader title="Training" links={["Training"]}></PageHeader>

            <div className="container p-4">
                <div className="font-semibold text-lg mb-4">Capability Developer Trainings</div>

                <TraineeList initialList={trainings} />
            </div>
        </Authenticated>
    );
}

const TraineeList = ({ initialList }) => {
    const [search, setSearch] = useState("");
    const [pages, setPages] = useState(null);
    const [training, setTraining] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

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
            route('trainee.trinings', {
                _query: {
                    search: search,
                    page: pageNumber
                },
            })
        );
    };

    const getNextAndPrevPages = async (pageNumber) => {
        setLoadingSearch(true);
        const response = await sendRequest(pageNumber);
        setTrainingData(response.data);
        setLoadingSearch(false);
    };

    useEffect(() => {
        if (!pages) {
            setTrainingData(initialList);
        }
        if(search) {
            getNextAndPrevPages(pages?.current_page)
        } else {
            setTrainingData(initialList);
        }
    }, [search]);

    return (
        <div>
            <div className="w-56 border rounded-md mb-4 ml-auto">
                <SearchInput
                    onSearch={(value) => setSearch(value)}
                    onInput={(input) => input && setLoadingSearch(true)}
                />
            </div>
            <GridRow className="border-b pb-2">
                <TableHeader>Date</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Position</TableHeader>
                <TableHeader>Time</TableHeader>
            </GridRow>

            <div className="h-[calc(100vh-17rem)] pt-2 overflow-y-auto overscroll-contain">
                {
                    loadingSearch ? (
                        <LoadingList column={4} grid="grid-cols-[14rem,1fr,7.5rem,13rem]" />
                    ) : search && training.length === 0 ? (
                        <div className="text-center py-4">No results found for " {search} "</div>
                    ) : (
                        training.map((train, index) => (
                            <TableContent key={index}>
                                <div className="px-3 py-1.5 flex items-center">
                                    {convertDate(train.event.dateStart,train.event.dateEnd,null,null,true)}
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    <div className="line-clamp-1">{train.event.title}</div>
                                </div>
                                <div className="px-3 py-1.5 flex items-center">
                                    Trainee
                                </div>
                                <div className="px-3 py-1.5 flex items-center text-sm">
                                    {train.time}
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
    className: `grid grid-cols-[14rem,1fr,7.5rem,13rem]`,
}))``;

const TableContent = styled.div.attrs(() => ({
    className: `grid grid-cols-[14rem,1fr,7.5rem,13rem] h-14 rounded-md hover:bg-slate-100/50 ring-1 ring-inset ring-transparent 
    hover:ring-slate-200/90 transition-all duration-150 mb-1 cursor-default group`,
}))``;

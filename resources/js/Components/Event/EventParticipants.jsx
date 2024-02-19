import { CheckIcon } from "@heroicons/react/20/solid";
import SearchInput from "../SearchInput";
import { FilterByProvince } from "./PopOver";
import styled from "styled-components";
import LoadingSearch from "../LoadingSearch";
import { useEffect, useState } from "react";
import Paginate from "../Paginate";
import ViewEventAddedParticipants from "./ViewEventAddedParticipants";

const activeState = " bg-blue-500/20 border-blue-300";
const defaultState =
    " hover:bg-gray-200/50 transition duration-150 bg-slate-100/50";

export default function EventParticipants({
    initialList,
    allEmployees = [],
    errorMessage,
    provincesCount,
    selectedProvince = [],
    filterByProvince = "All",
    listOfAddedParticipants = [],
    listOfConflictSchedule = [],

    onSelectAll = () => {},
    onAddParticipant = () => {},
    onRemoveParticipant = () => {},
    onFilterByProvince = () => {},
}) {
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [participants, setParticipants] = useState([])
    const [participantPageList, setParticipantPageList] = useState([]);
    const [showParticipantList, setShowParticipantList] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const setParticipantData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setParticipantPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of resource person list
        setParticipants(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber) => {
        if (!participantPageList.hasOwnProperty(pageNumber)) {
            setLoadingSearch(true);
            const response = !search
                ? await axios.get(
                    route("employee.json", { _query: { page: pageNumber, filter: filterByProvince } })
                )
                : await axios.get(
                    route("employee.search", {
                        _query: { page: pageNumber, search: search, filter: filterByProvince },
                    })
                );
            setParticipantData(response.data);
            setLoadingSearch(false);
        } else {
            setParticipantData(rpPageList[pageNumber]);
        }
    };

    const checkIfParticipantHasBeenAdded = (id) => 
        listOfAddedParticipants.find((p) => p.id === id)

    const onClickSelectAll = () => {
        if(filterByProvince != "All") {
            if(!selectedProvince.includes(filterByProvince)) {
                let getAllParticipants = allEmployees.filter(({province}) => province == filterByProvince)
                getAllParticipants = getAllParticipants.filter(({id}) => !listOfAddedParticipants.some(p => p.id == id))
                onSelectAll(
                    [...selectedProvince, filterByProvince],
                    [...listOfAddedParticipants, ...getAllParticipants]
                )
            } else {
                let filterSelectAll = selectedProvince.filter(sp => sp != filterByProvince)
                let filterAddedEmp = listOfAddedParticipants.filter(({province}) => province != filterByProvince)
                onSelectAll(
                    [...filterSelectAll],
                    [...filterAddedEmp]
                )
            }
        }
    }

    const addOrRemoveParticipant = (a_rp, remove = false) => {
        if(!remove) {
            let countProvEmp = provincesCount.find(({province}) => province == a_rp.province)
            let totalAdded = listOfAddedParticipants.filter(({province}) => province == a_rp.province)
            if(countProvEmp && countProvEmp.count == (totalAdded.length + 1)) {
                onAddParticipant(a_rp, [...selectedProvince, a_rp.province])
            } else {
                onAddParticipant(a_rp, [...selectedProvince])
            }
        } else {
            let filterSelectAll = selectedProvince.filter(sp => sp != a_rp.province)
            let filterAddedParticipants = listOfAddedParticipants.filter(({id}) => a_rp.id != id)
            onRemoveParticipant(filterAddedParticipants, [...filterSelectAll])
        }
    }

    const checkIfSelectAll = () => 
        selectedProvince.length === 5 || selectedProvince.includes(filterByProvince)

    useEffect(() => {
        if (search || filterByProvince != "All") {
            setLoadingSearch(true);
            async function getSearches() {
                let response = await axios.get(
                    route("employee.search", { _query: { search: search, filter: filterByProvince } })
                );
                let data = response.data;
                setParticipantData(data);
                setLoadingSearch(false);
            }

            getSearches();
        } else {
            setParticipantData(initialList);
        }
    }, [search, initialList, filterByProvince]);

    useEffect(() => {
        if(errorMessage && listOfConflictSchedule.length > 0) {
            setShowParticipantList(true)
        }
    }, [listOfConflictSchedule])

    return (
        <div className={ "container p-4 pb-3 mt-6 " + (errorMessage && "!ring-pink-500") } id="trainee_list.list">
            {errorMessage && (
                <div className="text-pink-700 text-sm ">{errorMessage}</div>
            )}

            <div className="flex justify-between items-center mb-6">
                <div className="font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                    {" "}
                    Event Participants{" "}
                </div>

                <div className="w-56 border rounded-md">
                    <SearchInput onSearch={(value) => setSearch(value)} onInput={(input) => input && setLoadingSearch(true)} />
                </div>
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                    <FilterByProvince
                        activeFilter={filterByProvince}
                        onSelect={(select) => onFilterByProvince(select)}
                    />

                    {listOfAddedParticipants.length !== 0 && (
                        <div className="ml-3">
                            Participants: {listOfAddedParticipants.length}
                        </div>
                    )}
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {filterByProvince != "All" && (
                        <SelectAllButton onClick={onClickSelectAll} >
                            Select All
                            <div
                                className={
                                    "w-4 h-4 flex items-center justify-center shrink-0 border rounded " +
                                    (checkIfSelectAll()
                                        ? "bg-blue-700 text-white border-blue-700"
                                        : "border-gray-600")
                                }
                            >
                                {checkIfSelectAll() ? (
                                    <CheckIcon className="w-4 h-4" />
                                ) : (
                                    ""
                                )}
                            </div>
                        </SelectAllButton>
                    )}
                    <ViewButton
                        className="shrink-0"
                        disabled={listOfAddedParticipants.length === 0}
                        onClick={() => setShowParticipantList(true)}
                    >
                        View added participants
                    </ViewButton>
                </div>
            </div>

            <ParticipantsContainer>
                {
                    search && !loadingSearch && participants.length === 0 ? (
                        <div className="text-center">
                            No records found for "{" "}
                            <span className="font-medium">{search}</span> "
                        </div>
                    ) : !search && !loadingSearch && participants.length === 0 ? (
                        <div className="p-3 w-full text-center">No records</div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-2">
                            {!loadingSearch ? (
                                participants.map((p, index) => (
                                    <Card
                                        key={index}
                                        onClick={() => {
                                            if (!checkIfParticipantHasBeenAdded(p.id)) {
                                                addOrRemoveParticipant(p)
                                            } else {
                                                addOrRemoveParticipant(p, true)
                                            }
                                        }}
                                        $active={
                                            checkIfParticipantHasBeenAdded(p.id)
                                                ? activeState
                                                : defaultState
                                        }
                                    >
                                        <Profile>
                                            <img src={p.profile} onError={(event) => event.target.src = "/storage/profile/profile.png"} alt="" />
                                        </Profile>
                                        <div className="pl-2 pointer-events-none">
                                            <div className="line-clamp-1 pointer-events-none">
                                                {p.first_name} {p.last_name}
                                            </div>
                                            <div className="line-clamp-1 text-sm text-gray-500 pointer-events-none">
                                                {p.position}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <LoadingSearch />
                            )}
                        </div>
                    )
                }
            </ParticipantsContainer>

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

            <ViewEventAddedParticipants
                show={showParticipantList}
                paticipantsList={listOfAddedParticipants}
                onClose={() => setShowParticipantList(false)}
                onRemoveParticipant={p => addOrRemoveParticipant(p, true)}
                listOfConflictSchedule={listOfConflictSchedule}
            />
        </div>
    )
}

const Card = styled.div.attrs((props) => ({
    className: `${props.$active} h-16 rounded-md flex items-center px-2 cursor-pointer`,
}))``;

const Profile = styled.div.attrs((props) => ({
    className: `${
        props.$size ?? "w-12 h-12"
    } rounded-full shrink-0 overflow-hidden pointer-events-none bg-white/90`,
}))``;

const ViewButton = styled.button.attrs((props) => ({
    className: `p-1.5 px-2 bg-blue-600 text-white rounded hover:shadow-md hover:bg-blue-600/90 disabled:bg-gray-100 disabled:text-gray-400/80 disabled:pointer-events-none select-none transition duration-150`,
}))``;

const SelectAllButton = styled.button.attrs((props) => ({
    className: `inline-flex text-nowrap items-center w-full justify-between px-3 py-1.5 font-medium focus:outline-none rounded gap-3 hover:bg-gray-100 transition duration-150`
}))``

const ParticipantsContainer = styled.div.attrs((props) => ({
 className: `mt-6 overflow-y-auto max-h-[calc(100vh-17rem)] min-h-[20vh] overscroll-contain pb-2`
}))``
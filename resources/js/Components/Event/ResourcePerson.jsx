import styled from "styled-components";
import Paginate from "../Paginate";
import SearchInput from "../SearchInput";
import { useEffect, useState } from "react";
import ViewEventAddedResourcePerson from "./ViewEventAddedResourcePerson";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import NewResourcePerson from "./NewResourcePerson";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const activeState = " bg-blue-500/20 border-blue-300";
const defaultState =
    " hover:bg-gray-200/50 transition duration-150 bg-slate-100/50";

export default function ResourcePerson({
    nRP,
    errorMessage,
    listOfRP = Array(),
    initialListOfRP = Array(),
    listOfConflictSchedule = Array(),
    onInputNoRP = () => {},
    onAddRP = () => {},
    onRemoveRP = () => {},
}) {
    const [resourcePersons, setResourcePersons] = useState([]);
    const [rpPageList, setRpPageList] = useState(null);
    const [numberOfRp, setNumberOfRP] = useState(null);
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [showRPList, setShowRPList] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [addRP, setAddRP] = useState(false)
    const MySwal = withReactContent(Swal);

    const setRPData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setRpPageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of resource person list
        setResourcePersons(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        if (!rpPageList.hasOwnProperty(pageNumber) || persist) {
            setLoadingSearch(true)
            const response = !search
                ? await axios.get(
                      route("rp.json", { _query: { page: pageNumber } })
                  )
                : await axios.get(
                      route("rp.search", {
                          _query: { page: pageNumber, search: search },
                      })
                  );
            setRPData(response.data);
            setLoadingSearch(false)
        } else {
            setRPData(rpPageList[pageNumber]);
        }
    };

    const checkIfRPHasBeenAdded = (id) => {
        return listOfRP.find((rp) => rp.id === id) 
    }

    useEffect(() => {
        if (nRP) {
            setNumberOfRP(nRP);
        }
    }, [nRP]);

    useEffect(() => {
        if (search) {
            setLoadingSearch(true);
            async function getSearches() {
                let response = await axios.get(
                    route("rp.search", { _query: { search: search } })
                );
                let data = response.data;
                setRPData(data);
                setLoadingSearch(false);
            }

            getSearches();
        } else {
            setRPData(initialListOfRP);
        }
    }, [search, initialListOfRP]);

    useEffect(() => {
        if(errorMessage && listOfConflictSchedule.length > 0) {
            setShowRPList(true)
        }
    }, [listOfConflictSchedule])

    return (
        <div className={"container p-4 pb-3 mt-6 "+(errorMessage&&"!ring-pink-500")} id="rp_list">
            {errorMessage && <div className="text-pink-700 text-sm ">{errorMessage}</div>}
            <div className="flex justify-between items-center mb-6">
                <div className="font-semibold after:content-['*'] after:ml-0.5 after:text-red-500"> Event Resource Person </div>

                <div className="w-56 border rounded-md">
                    <SearchInput
                        onSearch={(value) => setSearch(value)}
                        onInput={(input) => input && setLoadingSearch(true)}
                    />
                </div>
            </div>

            <div className="flex items-end mt-3">
                <div className="flex">
                    <label htmlFor="rp">Number of resource person:</label>
                    <input
                        type="text"
                        className="border-b ml-1 border-gray-400/80 px-3 w-20 focus:border-blue-400"
                        id="rp"
                        value={nRP}
                        onInput={({ target }) => {
                            onInputNoRP(target.value.replace(/[^0-9]/g, ""))
                        }}
                    />
                </div>

                <div className="ml-auto flex items-center">
                    {numberOfRp && numberOfRp != 0 && (
                        <div className="mr-3">
                            {listOfRP.length} of {numberOfRp}
                        </div>
                    )}
                    <ViewButton
                        disabled={listOfRP.length === 0}
                        onClick={() => setShowRPList(true)}
                    >
                        View added resource person
                    </ViewButton>
                    <ViewButton
                        onClick={() => setAddRP(true)}
                        className="ml-3 flex items-center gap-2 !px-4 !pr-5"
                    >
                        <PlusCircleIcon className="h-4 w-4" />
                        New
                    </ViewButton>
                </div>
            </div>

            { pages?.total < nRP && (<div className="text-pink-700 text-sm ">{nRP} is beyond the number of resource person list</div>)}

            <div className="mt-7 overflow-y-auto max-h-[calc(100vh-17rem)] min-h-[20vh] overscroll-contain pb-2">
                {
                    search && !loadingSearch && resourcePersons.length == 0 ? (
                        <div className="text-center">
                            No records found for "{" "}
                            <span className="font-medium">{search}</span> "
                        </div>
                    ) : !search && !loadingSearch && resourcePersons.length == 0 ? (
                        <div className="p-3 w-full text-center">No records</div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-2">
                            {
                                !loadingSearch ? (
                                    resourcePersons.map((rp, index) => (
                                        <Card
                                            key={index}
                                            $active={
                                                checkIfRPHasBeenAdded(rp.id)
                                                    ? activeState
                                                    : (listOfRP.length == nRP &&
                                                    listOfRP.length != 0) || pages?.total < nRP
                                                    ? "pointer-events-none bg-slate-100/50"
                                                    : defaultState
                                            }
                                            onClick={() => {
                                                if(pages?.total < nRP) return
                                                
                                                if (checkIfRPHasBeenAdded(rp.id)) {
                                                    onRemoveRP(rp);
                                                } else {
                                                    if (listOfRP.length != nRP) onAddRP(rp);
                                                }
                                            }}
                                        >
                                            <Profile>
                                                <img src={rp.profile} onError={(event) => event.target.src = "/storage/profile/profile.png"} alt="" />
                                            </Profile>
                                            <div className="pl-2 pointer-events-none">
                                                <div className="line-clamp-1 pointer-events-none">
                                                    {rp.name}
                                                </div>
                                                <div className="line-clamp-1 text-sm text-gray-500 pointer-events-none">
                                                    {rp.position}
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <LoadingSearch />
                                )
                            }
                        </div>
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

            <ViewEventAddedResourcePerson
                show={showRPList}
                rpList={listOfRP}
                listOfConflictSchedule={listOfConflictSchedule}
                onClose={() => setShowRPList(false)}
                onRemoveRP={onRemoveRP}
            />

            <NewResourcePerson show={addRP} onClose={() => setAddRP(false)} onSuccess={() => {
                setAddRP(false)
                MySwal.fire({
                    text: `Resource person successfully added`,
                    icon: "success",
                    toast: true,
                    position: "top-right",
                    timerProgressBar: true,
                    timer: 3000,
                    showConfirmButton: false,
                });
            }} />
        </div>
    );
}

const LoadingSearch = () => (
    <>
        {Array.from(Array(4).keys()).map((key) => (
            <div
                key={key}
                className="animate-pulse h-16 rounded-md flex items-center px-2 cursor-pointer bg-slate-100/70"
            >
                <div className="rounded-full w-12 h-12 shrink-0 overflow-hidden pointer-events-none bg-slate-200"></div>
                <div className="pl-2 w-full">
                    <div className="h-2.5 w-full rounded-lg bg-slate-200"></div>
                    <div className="h-2.5 mt-1.5 w-20 rounded-lg bg-slate-200"></div>
                </div>
            </div>
        ))}
    </>
);

const Card = styled.div.attrs((props) => ({
    className: `${props.$active} h-16 rounded-md flex items-center px-2 cursor-pointer`,
}))``;

const Profile = styled.div.attrs((props) => ({
    className: `${
        props.$size ?? "w-12 h-12"
    } rounded-full shrink-0 overflow-hidden pointer-events-none bg-white/90`,
}))``;

const ViewButton = styled.button.attrs((props) => ({
    className: `p-1.5 px-2.5 bg-blue-600 text-white rounded hover:shadow-md hover:bg-blue-600/90 disabled:bg-gray-100 disabled:text-gray-400/80 disabled:pointer-events-none select-none transition duration-150`,
}))``;

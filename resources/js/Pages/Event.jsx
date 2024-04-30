import DeleteConfirmation from "@/Components/DeleteConfirmation";
import EventList from "@/Components/Event/EventList";
import EventTabs from "@/Components/Event/EventTabs";
import NewEvent from "@/Components/Event/NewEvent";
import NewResourcePerson from "@/Components/Event/NewResourcePerson";
import { Filter, FilterIcon, Sort } from "@/Components/Event/PopOver";
import ResourcePersonList from "@/Components/Event/ResourcePersonList";
import PageHeader from "@/Components/PageHeader";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilSquareIcon, TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

export default function Event({
    auth,
    events,
    addEvent,
    resourcePersons,
    participants,
    totalEmp,
    totalPosition,
    editId,
}) {
    const { url } = usePage();
    const MySwal = withReactContent(Swal);
    const windowSize = useSelector((state) => state.windowWidth.size);
    const add =
        addEvent == "event" ? (editId ? ["Update Event"] : ["Add Event"]) : [];
    const [selectedRp, setSelectedRP] = useState(null);
    const [showNewRP, setShowNewRP] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [sort, setSort] = useState({
        sortBy: "Date created",
        orderBy: "DESC",
        filterEvent: "All",
        dirty: false,
    });

    useEffect(() => {
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Event" />

            <PageHeader
                title="Event"
                links={["Event", ...add]}
                onHome={
                    add
                        ? () => {
                              router.get(route("event"));
                          }
                        : null
                }
            />

            {!addEvent ? (
                <>
                    <EventTabs addRP={() => setShowNewRP(true)} />

                    <div className="container p-3 max-h-[calc(100vh-6rem)]">
                        <div className="flex items-center justify-between">
                            {windowSize >= 768 && (
                                <div className="hidden gap-3 md:flex">
                                    {url == "/event" && (
                                        <Sort
                                            activeSort={sort.sortBy}
                                            orderBy={sort.orderBy}
                                            onSelect={(sort) =>
                                                setSort((prev) => ({
                                                    ...prev,
                                                    sortBy: sort,
                                                    dirty: true,
                                                }))
                                            }
                                            onOrderBy={(order) =>
                                                setSort((prev) => ({
                                                    ...prev,
                                                    orderBy: order,
                                                    dirty: true,
                                                }))
                                            }
                                        />
                                    )}

                                    {url == "/event" && (
                                        <Filter
                                            activeFilter={sort.filterEvent}
                                            onSelect={(filter) =>
                                                setSort((prev) => ({
                                                    ...prev,
                                                    filterEvent: filter,
                                                    dirty: true,
                                                }))
                                            }
                                        />
                                    )}
                                </div>
                            )}

                            {url.startsWith("/event/resource_person") ? (
                                <div className="flex gap-2 ml-auto mr-3">
                                    <button
                                        data-rp-action="true"
                                        className="rounded-full p-2 shrink-0 hover:bg-slate-200/60 disabled:text-gray-400 disabled:pointer-events-none"
                                        disabled={
                                            !selectedRp && selectedRp !== 0
                                        }
                                        onClick={() => setShowNewRP(true)}
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        data-rp-action="true"
                                        className="rounded-full p-2 shrink-0 hover:bg-slate-200/60 disabled:text-gray-400 disabled:pointer-events-none"
                                        disabled={
                                            !selectedRp && selectedRp !== 0
                                        }
                                        onClick={() => setIsDelete(true)}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Filters 
                                    sort={sort} 
                                    windowSize={windowSize} 
                                    filtered={sort.filterEvent != "All" || sort.orderBy != "DESC" || sort.sortBy != "Date created"}
                                    onSelect={(selected, type) => {
                                        if(type == 'filter') {
                                            setSort((prev) => ({
                                                ...prev,
                                                filterEvent: selected,
                                                dirty: true,
                                            }))
                                        } else {
                                            setSort((prev) => ({
                                                ...prev,
                                                sortBy: selected,
                                                dirty: true,
                                            }))
                                        }
                                    }}
                                    onOrderBy={(order) =>
                                        setSort((prev) => ({
                                            ...prev,
                                            orderBy: order,
                                            dirty: true,
                                        }))
                                    }
                                />
                            )}

                            <div
                                className={`w-56 border h-9 rounded-md overflow-hidden ${
                                    !url.startsWith("/event/resource_person")
                                        ? "md:ml-0 ml-auto"
                                        : ""
                                }`}
                            >
                                <SearchInput
                                    onSearch={(value) => setSearch(value)}
                                    onInput={(input) =>
                                        input && setLoadingSearch(true)
                                    }
                                />
                            </div>
                        </div>

                        {url == "/event" ? (
                            <EventList
                                initialList={events}
                                sortAndOrderByAndFilter={sort}
                                setLoadingSearch={setLoadingSearch}
                                search={search}
                                loadingSearch={loadingSearch}
                                MySwal={MySwal}
                            />
                        ) : (
                            <>
                                <ResourcePersonList
                                    initialList={resourcePersons}
                                    onSelect={(rp) => setSelectedRP(rp)}
                                    showDelete={isDelete}
                                    onCloseDelete={setIsDelete}
                                    search={search}
                                    loadingSearch={loadingSearch}
                                    setLoadingSearch={setLoadingSearch}
                                />
                                <NewResourcePerson
                                    show={showNewRP}
                                    rpEdit={selectedRp}
                                    onClose={() => setShowNewRP(false)}
                                    onSuccess={(isEdit) => {
                                        setShowNewRP(false);
                                        MySwal.fire({
                                            text: `Resource person successfully ${
                                                isEdit ?? "added"
                                            }`,
                                            icon: "success",
                                            toast: true,
                                            position: "top-right",
                                            timerProgressBar: true,
                                            timer: 3000,
                                            showConfirmButton: false,
                                        });
                                    }}
                                />
                            </>
                        )}
                    </div>
                </>
            ) : (
                <NewEvent
                    initialListRp={resourcePersons}
                    initialParticipants={participants}
                    totalEmp={totalEmp}
                    totalPosition={totalPosition}
                    editId={editId}
                />
            )}
        </AuthenticatedLayout>
    );
}

const Filters = ({
    filtered,
    windowSize,
    sort,
    onSelect = () => {},
    onOrderBy = () => {},
}) => {
    const [show, setShow] = useState(false)
    const filters = useRef(null)

    const getSelect = (select, type) => {
        onSelect(select, type)
        setShow(false)
    }

    const getOrderBy = (order) => {
        onOrderBy(order)
        setShow(false)
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (filters.current && !filters.current.contains(event.target)) {
                setShow(false)
            }
        };
    
        document.addEventListener('mousedown', handleClick);
    
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    useEffect(() => {
        if(windowSize < 768 && show) {
            setShow(false)
        }
    }, [windowSize])

    return <>{windowSize < 768 && <div ref={filters} className="md:hidden relative">
        <button onClick={() => setShow(!show)} className={`h-9 w-9 flex items-center justify-center rounded-full ${filtered ? 'bg-slate-200/60':'hover:bg-slate-200/60'}`}>
            <EllipsisVerticalIcon className="w-5 h-5" />
        </button>

        {filtered && <div className="absolute top-0.5 right-0.5 h-2 w-2 bg-blue-400 rounded-full" />}

        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="bg-white absolute mt-1 rounded py-1.5 z-10 ring-black/5 shadow-lg ring-1">
                <div>
                    <Sort
                        activeSort={sort.sortBy}
                        orderBy={sort.orderBy}
                        onSelect={(select) => getSelect(select, 'sort')}
                        onOrderBy={getOrderBy}
                        withBorder={false}
                    />
                </div>
                <hr className="my-1.5" />
                <div>
                    <Filter
                        activeFilter={sort.filterEvent}
                        onSelect={(select) => getSelect(select, 'filter')}
                        withBorder={false}
                    />
                </div>
            </div>
        </Transition>
    </div>}</>;
};

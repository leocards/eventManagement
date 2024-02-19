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
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Event({
    auth,
    events,
    addEvent,
    resourcePersons,
    participants,
    totalEmp,
    editId
}) {
    const { url } = usePage();
    const MySwal = withReactContent(Swal);
    const add = (addEvent == "event") ? (editId ? ["Update Event"] : ["Add Event"]) : [];
    const [selectedRp, setSelectedRP] = useState(null);
    const [showNewRP, setShowNewRP] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [sort, setSort] = useState({
        sortBy: "Date created",
        orderBy: "DESC",
        filterEvent: "All",
        dirty: false
    });

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
                            <div className="flex gap-3">
                                {url == "/event" && (
                                    <Sort
                                        activeSort={sort.sortBy}
                                        orderBy={sort.orderBy}
                                        onSelect={(sort) =>
                                            setSort((prev) => ({
                                                ...prev,
                                                sortBy: sort,
                                                dirty: true
                                            }))
                                        }
                                        onOrderBy={(order) =>
                                            setSort((prev) => ({
                                                ...prev,
                                                orderBy: order,
                                                dirty: true
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
                                                dirty: true
                                            }))
                                        }
                                    />
                                )}
                            </div>

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
                                ""
                            )}

                            <div className="w-56 border h-9 rounded-md overflow-hidden">
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
                    editId={editId}
                />
            )}
        </AuthenticatedLayout>
    );
}

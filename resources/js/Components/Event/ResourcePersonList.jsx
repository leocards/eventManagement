import { useEffect, useState } from "react";
import Paginate from "../Paginate";
import DeleteConfirmation from "../DeleteConfirmation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ResourcePersonList({
    initialList = {},
    search = "",
    showDelete,
    loadingSearch,
    setLoadingSearch,
    onSelect,
    onCloseDelete,
}) {
    const [selected, setSelected] = useState(null);
    const [rpPageList, setRpPageList] = useState(null);
    const [resourcePersons, setResourcePersons] = useState(initialList.data);
    const [pages, setPages] = useState(null);
    const { post, processing } = useForm({});
    const MySwal = withReactContent(Swal);

    const activeState = " bg-blue-500/20";
    const inactiveState =
        " hover:bg-gray-200/50 transition duration-150 bg-slate-100/50";

    const selectRp = (rp) => {
        setSelected(rp);
        onSelect(rp);
    };

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
        // when clicking next or previous pages or when the persist is true
        // request data in the current page
        if (!rpPageList.hasOwnProperty(pageNumber) || persist) {
            setLoadingSearch(true);
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
            setLoadingSearch(false);
        } else {
            setRPData(rpPageList[pageNumber]);
        }
    };

    const deleteRP = () => {
        post(route("rp.delete", [selected?.id]), {
            onSuccess: () => {
                onCloseDelete(false);
                setSelected(null);
                onSelect(null);
                getNextAndPrevPages(pages.current_page, true);
                MySwal.fire({
                    text: `Resource person successfully deleted`,
                    icon: "success",
                    toast: true,
                    position: "top-right",
                    timerProgressBar: true,
                    timer: 3000,
                    showConfirmButton: false,
                });
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    useEffect(() => {
        const outSideClick = (e) => {
            if (
                !e.target.closest("[data-rp]") &&
                !e.target.closest("[data-rp-action]") &&
                !e.target.closest("#modal")
            ) {
                setSelected(null);
                onSelect(null);
            }
        };
        document.addEventListener("click", outSideClick);

        return () => {
            document.removeEventListener("click", outSideClick);
        };
    }, []);

    useEffect(() => {
        // sends request when search has value
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
            setRPData(initialList);
        }
    }, [search, initialList]);

    return (
        <>
            <div className="mt-5 overflow-y-auto max- h-[calc(100vh-17rem)] overscroll-contain pb-2 relative">
                {search && !loadingSearch && resourcePersons.length == 0 ? (
                    <div className="text-center">
                        No records found for "{" "}
                        <span className="font-medium">{search}</span> "
                    </div>
                ) : !search && !loadingSearch && resourcePersons.length == 0 ? (
                    <div className="p-3 w-full text-center">No records</div>
                ) : (
                    <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
                        {!loadingSearch ? (
                            resourcePersons.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectRp(item)}
                                    data-rp="true"
                                    className={
                                        "h-16 rounded-md flex items-center px-2 cursor-pointer" +
                                        (selected === item
                                            ? activeState
                                            : inactiveState)
                                    }
                                >
                                    <div className="rounded-full w-12 h-12 shrink-0 overflow-hidden pointer-events-none bg-white/90">
                                        <img
                                            src={item.profile??"/storage/profile/profile.png"}
                                            alt=""
                                            onError={(event) => event.target.src = "/storage/profile/profile.png"}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="pl-2 pointer-events-none">
                                        <div className="line-clamp-1 pointer-events-none">
                                            {item.name}
                                        </div>
                                        <div className="line-clamp-1 text-sm text-gray-500 pointer-events-none">
                                            {item.position}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <LoadingSearch />
                        )}
                    </div>
                )}
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

            <DeleteConfirmation
                show={showDelete}
                onCancel={onCloseDelete}
                onConfirmDelete={deleteRP}
                processing={processing}
            >
                <div className="font-semibold text-lg text-red-700 flex items-center gap-2 justify-center">
                    <ExclamationCircleIcon className="w-5 h-5 stroke-2" />
                    Delete Resource Person
                </div>
                <div className="mt-5 text-center">
                    <div className="h-20 w-20 mx-auto rounded-full border overflow-hidden">
                        <img src={selected?.profile} />
                    </div>
                    <span className="font-semibold mt-2">{selected?.name}</span>
                </div>
                {!processing && (
                    <div className={"mb-10 mt-2 text-center "}>
                        Are you sure you want to delete this resource person?
                        <br />
                        This action cannot be undone and all associated data will be removed.
                    </div>
                )}
                {processing && (
                    <div
                        className={
                            "font-semibold text-lg text-red-600 mb-12 mt-2 text-center "
                        }
                    >
                        Deleting...
                    </div>
                )}
            </DeleteConfirmation>
        </>
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

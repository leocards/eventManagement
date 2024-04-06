import DeleteConfirmation from "@/Components/DeleteConfirmation";
import NewEmployee from "@/Components/Employee/NewEmployee";
import ViewEmployee from "@/Components/Employee/ViewEmployee";
import { Filter, FilterButton } from "@/Components/Event/PopOver";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    ExclamationCircleIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline";
import {
    EyeIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function Employee({ auth, initialEmployeeList }) {
    const [selected, setSelected] = useState(null);
    const [employeePageList, setEmployeePageList] = useState(null);
    const [employees, setEmployees] = useState(Array());
    const [showNewEmployee, setShowNewEmployee] = useState(false);
    const [pages, setPages] = useState(null);
    const [showViewEmployee, setShowViewEmployee] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { post, processing } = useForm({});
    const [searchUser, setSearchUser] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [filterEmployment, setFilterEmployment] = useState("All")

    const activeState = " bg-blue-500/20";
    const inactiveState =
        " hover:bg-gray-200/50 transition duration-150 bg-slate-100/50";

    const selectEmployee = (rp) => {
        setSelected(rp);
    };

    const setEmployeeData = (empData) => {
        let initial = { ...empData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setEmployeePageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of resource person list
        setEmployees(initial.data);

        let pageWithoutData = { ...empData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        if (!employeePageList.hasOwnProperty(pageNumber) || persist) {
            setLoadingSearch(true);
            const response = !searchUser
                ? await axios.get(
                    route("employee.json", { _query: { page: pageNumber, filterEmployment: filterEmployment } })
                )
                : await axios.get(
                    route("employee.search", {
                        _query: { page: pageNumber, search: searchUser, filterEmployment: filterEmployment },
                    })
                );
            setEmployeeData(response.data);
            setLoadingSearch(false);
        } else {
            setEmployeeData(employeePageList[pageNumber]);
        }
    };

    const deleteUser = () => {
        post(route("employee.delete", [selected?.id]), {
            onSuccess: () => {
                setShowDeleteConfirmation(false);
                setSelected(null);
                getNextAndPrevPages(pages.current_page, true);
                MySwal.fire({
                    text: `Employee successfully deleted`,
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
    
    async function getSearches() {
        setLoadingSearch(true);
        let response = await axios.get(
            route("employee.search", { _query: { search: searchUser, filterEmployment: filterEmployment } })
        );
        let data = response.data;
        setEmployeeData(data);
        setLoadingSearch(false);
    }

    useEffect(() => {
        const outSideClick = (e) => {
            if (
                !e.target.closest("[data-employee]") &&
                !e.target.closest("[data-employee-action]") &&
                !e.target.closest("#modal")
            ) {
                setSelected(null);
            }
        };

        document.addEventListener("click", outSideClick);

        setEmployeeData(initialEmployeeList);

        return () => {
            document.removeEventListener("click", outSideClick);
        };
    }, []);

    useEffect(() => {
        setEmployeeData(initialEmployeeList);
    }, [initialEmployeeList]);

    useEffect(() => {
        if (searchUser || filterEmployment !== "All") {
            getSearches();
        } else {
            setEmployeeData(initialEmployeeList);
        }
    }, [searchUser, filterEmployment]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Employee" />

            <PageHeader title="Employee" links={["Employee"]} />

            <div className="flex justify-between mb-2 text-blue-900">
                <button
                    onClick={() => setShowNewEmployee(true)}
                    className="h-9 rounded-md px-3 pr-4 flex items-center bg-blue-600 text-white gap-2 hover:bg-blue-600/90 transition duration-150 ml-auto hover:shadow-md"
                >
                    <PlusCircleIcon className="w-5 h-5" /> New Employee
                </button>
            </div>

            <div className="container p-3 sm:max-h-[calc(100vh-6rem)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mr-auto">
                        <Filter activeFilter={filterEmployment} filterList={['All', 'Regular', 'Contractual']} onSelect={setFilterEmployment} />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row mt-4 sm:mt-0">
                        <ActionButtons
                            selected={selected}
                            onView={() => setShowViewEmployee(true)}
                            onEdit={() => setShowNewEmployee(true)}
                            onDelete={() => setShowDeleteConfirmation(true)}
                        />

                        <div className="flex sm:w-fit border h-9 rounded-md overflow-hidden">
                            <div className="sm:w-56 w-full">
                                <SearchInput
                                    onSearch={setSearchUser}
                                    onInput={(input) =>
                                        input && setLoadingSearch(true)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 pb-2 overflow-y-auto h-[calc(100vh-17rem)] overscroll-contain">
                    {searchUser && !loadingSearch && employees.length == 0 ? (
                        <div className="text-center">
                            No records found for "{" "}
                            <span className="font-medium">{searchUser}</span> "
                        </div>
                    ) : !searchUser &&
                      !loadingSearch &&
                      employees.length == 0 ? (
                        <div className="p-3 w-full text-center">No records</div>
                    ) : (
                        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
                            {!loadingSearch ? (
                                employees.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => selectEmployee(item)}
                                        data-employee="true"
                                        className={
                                            "h-[4.5rem] rounded-md flex items-center px-2 cursor-pointer" +
                                            (selected === item
                                                ? activeState
                                                : inactiveState)
                                        }
                                    >
                                        <div
                                            className={
                                                "rounded-full w-12 h-12 relative shrink-0 pointer-events-none bg-white/90 "
                                            }
                                        >
                                            <div className="overflow-hidden rounded-full w-12 h-12">
                                                <img
                                                    src={
                                                        item.profile ??
                                                        "/storage/profile/profile.png"
                                                    }
                                                    alt=""
                                                    onError={(event) =>
                                                        (event.target.src =
                                                            "/storage/profile/profile.png")
                                                    }
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            {item.role == "Admin" && (
                                                <div className="absolute -bottom-1 rounded-full ring-[1.5px] ring-blue-500 p-0.5 bg-gray-200">
                                                    <IdentificationIcon className="w-3.5 h-3.5 stroke-2" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="pl-2 pointer-events-none text-sm">
                                            <div className="line-clamp-1 font-semibold pointer-events-none">
                                                {item.first_name}{" "}
                                                {item.last_name}
                                            </div>
                                            <div className="line-clamp-1 text-sm leading-4 text-gray-500/80 pointer-events-none">
                                                {item.province}
                                            </div>
                                            <div className="line-clamp-1 text-sm leading-4 text-gray-500/80 pointer-events-none">
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
                        onNext={() =>
                            getNextAndPrevPages(pages.current_page + 1)
                        }
                    />
                )}
            </div>

            <NewEmployee
                show={showNewEmployee}
                employeeEdit={selected}
                onClose={() => setShowNewEmployee(false)}
                onSuccess={(isEdit) => {
                    MySwal.fire({
                        text: `Employee successfully ${isEdit ?? "added"}`,
                        icon: "success",
                        toast: true,
                        position: "top-right",
                        timerProgressBar: true,
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    setShowNewEmployee(false);
                    setSelected(null);
                }}
                onError={(error) => {
                    MySwal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: true,
                        showDenyButton: false,
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            cancelButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                            denyButton:
                                "!text-sm px-10 uppercase focus:!ring-0",
                        },
                    });
                }}
            />

            <ViewEmployee
                show={showViewEmployee}
                viewEmployee={selected}
                onClose={() => setShowViewEmployee(false)}
            />

            <DeleteConfirmation
                show={showDeleteConfirmation}
                processing={processing}
                onCancel={setShowDeleteConfirmation}
                onConfirmDelete={deleteUser}
            >
                <div className="font-semibold text-lg text-red-700 flex items-center gap-2 justify-center">
                    <ExclamationCircleIcon className="w-5 h-5 stroke-2" />
                    Delete Employee
                </div>
                <div className="mt-5 text-center">
                    <div className="h-20 w-20 mx-auto rounded-full border overflow-hidden">
                        <img
                            src={selected?.profile}
                            onError={(event) =>
                                (event.target.src =
                                    "/storage/profile/profile.png")
                            }
                        />
                    </div>
                    <span className="font-semibold mt-2">
                        {selected?.first_name} {selected?.last_name}
                    </span>
                </div>
                {!processing && (
                    <div className={"mb-10 mt-2 text-center "}>
                        Are you sure you want to delete this employee?
                        <br />
                        This action cannot be undone and all associated data
                        will be removed.
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
        </Authenticated>
    );
}

const ActionButtons = ({ selected, onView, onEdit, onDelete }) => {
    return (
        <div className="flex gap-2 ml-auto sm:mr-3 mt-2 sm:mt-0">
            <button
                data-employee-action="true"
                className="rounded-full p-2 shrink-0 hover:bg-slate-200/60 disabled:text-gray-400 disabled:pointer-events-none"
                disabled={!selected && selected !== 0}
                onClick={onView}
                title="View Details"
            >
                <EyeIcon className="w-5 h-5" />
            </button>
            <button
                data-employee-action="true"
                className="rounded-full p-2 shrink-0 hover:bg-slate-200/60 disabled:text-gray-400 disabled:pointer-events-none"
                disabled={!selected && selected !== 0}
                onClick={onEdit}
            >
                <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
                data-employee-action="true"
                className="rounded-full p-2 shrink-0 hover:bg-slate-200/60 disabled:text-gray-400 disabled:pointer-events-none"
                disabled={!selected && selected !== 0}
                onClick={onDelete}
            >
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

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

import PositionsTitles from "@/js/Position";
import {
    Menu,
    Transition,
    Popover,
    Listbox,
    Combobox,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useRef, useState } from "react";

export function Platform({ platform, className, onChange }) {
    return (
        <div
            className={
                "w-40 flex shrink-0 items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200/50 text-right " +
                className
            }
        >
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="">
                    <Menu.Button className="inline-flex text-nowrap items-center w-full justify-between px-4 py-4 text-sm font-medium focus:outline-none">
                        {platform}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt- w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            <Menu.Item>
                                <button
                                    onClick={() => onChange("Face-to-face")}
                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                >
                                    Face-to-face
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    onClick={() => onChange("Virtual")}
                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                >
                                    Virtual
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function DateType({ dateRange, className, onChange }) {
    return (
        <div
            className={
                "w-40 shrink-0 flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200/50 text-right " +
                className
            }
        >
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="">
                    <Menu.Button className="inline-flex text-nowrap items-center w-full justify-between px-4 py-4 text-sm font-medium focus:outline-none">
                        {dateRange}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt- w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            <Menu.Item>
                                <button
                                    onClick={() => onChange(false)}
                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                >
                                    Date
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    onClick={() => onChange(true)}
                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                >
                                    Date range
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function FilterIcon({ className }) {
    return (
        <i
            className={"bi bi-filter text-lg leading-[1.20rem] " + className}
        ></i>
    );
}

export function FilterByProvince({ onSelect = () => {}, activeFilter = null }) {
    const provinces = [
        "All",
        "Davao City",
        "Davao Del Norte",
        "Davao Del Sur",
        "Davao Occidental",
        "Davao Oriental",
    ];
    return (
        <div className="w-48 select-none shrink-0 flex items-center rounded border border-gray-300 text-right mr-1">
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="">
                    <Menu.Button className="inline-flex text-left text-nowrap items-center w-full justify-between px-4 pl-2.5 py-1.5 focus:outline-none">
                        <FilterIcon className="absolute left-1.5 top-2.5" />
                        <div className="grow ml-[1.20rem]   ">
                            {activeFilter}
                        </div>
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-500 absolute right-1.5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt-1 w-full text-sm origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            {provinces.map((p, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelect(p);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {activeFilter == p ? (
                                                    <CheckIcon className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            {p}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function Sort({
    activeSort = "Date created",
    orderBy = "DESC",
    onSelect = () => {},
    onOrderBy = () => {},
}) {
    const sortList = ["Title", "Date created", "Event date"];
    return (
        <div className="w-44 select-none shrink-0 flex items-center rounded-md border border-gr ay-200 text-right mr-1">
            <Menu
                as="div"
                className="relative inline-block text-left grow h-[2.20rem]"
            >
                <div className=" h-full">
                    <Menu.Button className="inline-flex items-center w-full h-full text-left text-nowrap relative focus:outline-none">
                        <i className="bi bi-sort-down text-lg mt-0.5 ml-2.5 shrink-0"></i>
                        <div className="grow ml-1.5">{activeSort}</div>
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-500 absolute right-1.5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt-1 w-full text-sm origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            {sortList.map((sort, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelect(sort);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {activeSort == sort ? (
                                                    <CheckIcon className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            {sort}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                            <hr className="my-2" />
                            <Menu.Item>
                                {({ close }) => (
                                    <button
                                        onClick={() => {
                                            onOrderBy("ASC");
                                            close();
                                        }}
                                        className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                    >
                                        <div className="w-4 shrink-0 mr-2">
                                            {orderBy == "ASC" ? (
                                                <CheckIcon className="w-4 h-4 text-blue-500" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        Ascending
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ close }) => (
                                    <button
                                        onClick={() => {
                                            onOrderBy("DESC");
                                            close();
                                        }}
                                        className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                    >
                                        <div className="w-4 shrink-0 mr-2">
                                            {orderBy == "DESC" ? (
                                                <CheckIcon className="w-4 h-4 text-blue-500" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        Descending
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function Filter({
    onSelect = () => {},
    activeFilter = "All",
    filterList = null,
}) {
    const filterDataList = filterList ?? [
        "All",
        "Active",
        "Upcoming",
        "Ended",
        "This year",
        "This month",
    ];
    return (
        <div className="w-44 select-none shrink-0 flex items-center rounded-md border border-gr ay-200 text-right mr-1">
            <Menu
                as="div"
                className="relative inline-block text-left grow h-[2.20rem]"
            >
                <div className=" h-full">
                    <Menu.Button className="inline-flex items-center w-full h-full text-left text-nowrap relative focus:outline-none">
                        <FilterIcon className=" mt-0.5 ml-2.5 shrink-0" />
                        <div className="grow ml-1.5">{activeFilter}</div>
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-500 absolute right-1.5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt-1 w-full text-sm origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            {filterDataList.map((filterBy, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelect(filterBy);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {activeFilter == filterBy ? (
                                                    <CheckIcon className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            {filterBy}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function FilterButton({
    list = ["Today", "This month", "This year"],
    position,
    onClick = () => {},
}) {
    return (
        <div className={"w-fit absolute " + (position ?? "top-2 right-2")}>
            <Popover className="relative">
                <>
                    <Popover.Button
                        className={`
                        group flex items-center justify-center pt-0.5 rounded-full exclude hover:bg-slate-200/60 duration-150 transition h-7 w-7 text-base font-medium focus:ring-0 focus:outline-none`}
                    >
                        <i className="bi bi-filter text-xl leading-[1.20rem]"></i>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute -right-3 z-10 w-52 transform px-4">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="relative bg-white py-2">
                                    {list.map((item, index) => (
                                        <Popover.Button
                                            key={index}
                                            onClick={() => onClick(item)}
                                            className="w-full text-left p-1.5 px-3 hover:bg-gray-100"
                                        >
                                            {item}
                                        </Popover.Button>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            </Popover>
        </div>
    );
}

export function SelectSecurity({ questions, className, onSelect, position }) {
    const containerRef = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // console.log(containerRef.current.getBoundingClientRect())
    }, [show]);

    return (
        <div
            className={
                "w-12 flex shrink-0 items-center rounded-r-md border-l border-gray-300 bg-gray-200/50 text-right " +
                className
            }
        >
            <Menu as="div" className="relative inline-block text-left grow">
                {({ open }) => (
                    <>
                        <div className="">
                            <Menu.Button
                                onClick={() => setShow(!show)}
                                className="inline-flex text-nowrap items-center w-full justify-between px-3.5 py-4 text-sm font-medium focus:outline-none"
                            >
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        {open && (
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    ref={containerRef}
                                    className={`absolute z-30 right-4 w-[30rem] origin-top-right divide-y divide-gray-100 
                                rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-y-auto max-h-[20rem] ${
                                    position ?? "-mt-14"
                                }`}
                                >
                                    <div className=" py-1 ">
                                        {questions.map((question, index) => (
                                            <Menu.Item key={index}>
                                                <button
                                                    onClick={() =>
                                                        onSelect(question)
                                                    }
                                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                                >
                                                    {question}
                                                </button>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        )}
                    </>
                )}
            </Menu>
        </div>
    );
}

export function SelectEventList({
    eventList,
    disabled,
    onSelectEvent = () => {},
}) {
    const [selected, setSelected] = useState(eventList[0]);

    return (
        <div className="w-full">
            <Listbox
                value={selected}
                disabled={disabled}
                onChange={setSelected}
            >
                <div className="relative z-20 mt-1">
                    <Listbox.Button className="container disabled:cursor-wait w-full cursor-default rounded-md p-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
                        <div className="">
                            <div className="text-sm font-medium text-blue-800">
                                Select event
                            </div>
                            <span className="block truncate">
                                {selected.title}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto overscroll-contain rounded-md bg-white py-1 text-base shadow-md focus:outline-none">
                            {eventList.map((event, eventIdx) => (
                                <Listbox.Option
                                    key={eventIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={event}
                                    onClick={() => onSelectEvent(event.id)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {event.title}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export function SelectByYear({
    eventYears = [],
    selectedYear,
    onSelectYear = () => {},
}) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (selectedYear) {
            let years = eventYears.find(({ year }) => year == selectedYear);
            years ? setSelected(years) : setSelected(eventYears[0]);
        } else {
            setSelected(eventYears[0]);
        }
    }, [selectedYear]);

    return (
        <>
            <div className="w-44 select-none shrink-0 flex items-center rounded border border-gray-300 text-right">
                <Menu as="div" className="relative inline-block text-left grow">
                    <div className="">
                        <Menu.Button className="inline-flex text-left text-nowrap items-center w-full justify-between px-4 pl-2.5 py-1.5 focus:outline-none">
                            <FilterIcon className="absolute left-1.5 top-2.5" />
                            <div className="grow ml-[1.20rem]">
                                {selected && selected.year
                                    ? selected.year
                                    : "All"}
                                {eventYears.length === 0 &&
                                    "You have no events yet"}
                            </div>
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-500 absolute right-1.5"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-30 right-0 mt-1 w-full tex t-sm origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="max-h-[15rem] overflow-y-auto py-1 ">
                                {eventYears.map((event, index) => (
                                    <Menu.Item key={index}>
                                        {({ close }) => (
                                            <button
                                                onClick={() => {
                                                    onSelectYear(event.year);
                                                }}
                                                className={`${
                                                    selected?.year == event.year
                                                        ? "bg-blue-100/60"
                                                        : ""
                                                } hover:bg-gray-200 transition duration-150 group flex w-full items-center px-2 py-1.5`}
                                            >
                                                <div className="w-4 shrink-0 mr-2">
                                                    {selected?.year ==
                                                    event.year ? (
                                                        <CheckIcon className="w-4 h-4 text-blue-500" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                {event.year || "All"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
}

export function SlectQuestion({ questions = [], onSelectQuestion = () => {} }) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (questions.length > 0) {
            setSelected(questions[0]);
            onSelectQuestion();
        }
    }, [questions]);

    useEffect(() => {
        onSelectQuestion(selected);
    }, [selected]);

    return (
        <div className="w-full">
            <Listbox
                value={selected}
                disabled={questions.length === 0}
                onChange={setSelected}
            >
                <div className="relative z-10">
                    <Listbox.Button className="relative rounded-md w-full cursor-default text-left b order border-gray-300 bg-white py-4 pl-3 pr-10 disabled:pointer-events-none disabled:opacity-50 group">
                        <span className="block truncate">
                            {selected ?? "Select question"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute gap-1 mt-1 max-h-60 w-full overflow-y-auto rounded bg-white p-1.5 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {questions.map((question, questionIdx) => (
                                <Listbox.Option
                                    key={questionIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded ${
                                            active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={question}
                                    onClick={() => setSelected(question)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ml-1.5 ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {question}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export function ResourcePersonList({
    disabled,
    resource_persons = [],
    onSelect = () => {},
}) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        resource_persons.length > 0 && setSelected(resource_persons[0]);
    }, [resource_persons]);

    return (
        <div className="w-full mb-3">
            <Listbox
                disabled={disabled || resource_persons.length === 0}
                value={selected}
                onChange={setSelected}
            >
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full disabled:bg-gray-100 border cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-base text-sm">
                        <span className="block truncate">
                            {selected?.name || "-select-"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {resource_persons.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={person}
                                    onClick={() => onSelect(person.id)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export function FilterByQuarter({
    onSelect = () => {},
    selectedQurter = "All",
    list = null,
}) {
    const quarter = list ?? [
        "All",
        "1st Quarter",
        "2nd Quarter",
        "3rd Quarter",
        "4th Quarter",
        "This month",
    ];
    return (
        <div className="w-40 select-none shrink-0 flex items-center rounded border border-gray-300 text-right mr-1">
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="">
                    <Menu.Button className="inline-flex text-left text-nowrap items-center w-full justify-between px-4 pl-2.5 py-1.5 focus:outline-none">
                        <FilterIcon className="absolute left-1.5 top-2.5" />
                        <div className="grow ml-[1.20rem]   ">
                            {selectedQurter}
                        </div>
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-500 absolute right-1.5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-30 right-0 mt-1 w-full tex t-sm origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="max-h-[15rem] overflow-y-auto py-1 ">
                            {quarter.map((q, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelect(q);
                                                close();
                                            }}
                                            className={`${
                                                selectedQurter == q
                                                    ? "bg-blue-100/60"
                                                    : ""
                                            } hover:bg-gray-200 transition duration-150 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {selectedQurter == q ? (
                                                    <CheckIcon className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            {q}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

const defaultList = PositionsTitles; // default as position list

export function AutoComplete({
    selectedOption = "",
    list = defaultList,
    maxHeight = "max-h-52",
    onSelect = () => {},
}) {
    const [selected, setSelected] = useState({ name: "" });
    const [query, setQuery] = useState("");

    const filteredAutoComplete =
        query === ""
            ? list
            : list.filter((title) =>
                  title.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const onChnageAutoComplete = (value) => {
        setSelected(value);
        onSelect(value);
    };

    useEffect(() => {
        if (selected.name) {
            onSelect(selected);
        }
    }, [selected]);

    useEffect(() => {
        if (selectedOption) {
            let findAutoComplete = list.find(
                (title) => title.name == selectedOption
            );
            setSelected(findAutoComplete);
        }
    }, []);

    return (
        <div className="">
            <Combobox value={selected} onChange={onChnageAutoComplete}>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                            displayValue={(title) => title.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            className={
                                "absolute z-20 mt-1 w-full overflow-auto overscroll-contain rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-slate-300 focus:outline-none sm:text-sm " +
                                maxHeight
                            }
                        >
                            {filteredAutoComplete.length === 0 &&
                            query !== "" ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredAutoComplete.map((title, index) => (
                                    <Combobox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-blue-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={title}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {title.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}

const people = [{ name: "Male" }, { name: "Female" }];

export function GenderSelection({
    list = people,
    selectedOption = null,
    onSelect = () => {},
}) {
    const [selected, setSelected] = useState(
        selectedOption
            ? list.find(({ name }) => name == selectedOption)
            : { name: null }
    );

    return (
        <div className="">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left focus:outline-none">
                        <span
                            className={
                                "block truncate " +
                                (!selected.name ? "opacity-0" : "")
                            }
                        >
                            {selected.name ?? "select"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-slate-200 focus:outline-none sm:text-sm">
                            {people.map((gender, genderIdx) => (
                                <Listbox.Option
                                    key={genderIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={gender}
                                    onClick={() => onSelect(gender.name)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {gender.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export function ListSelector({
    list = [{ option: "" }],
    defaultLabel = "--Select--",
    optionPosition = "top",
    paddingHeight = "py-2",
    borderColor = "ring-1 ring-slate-300",
    selectedOption = null,
    opacityOnEmpty = false,
    onSelect = () => {},
}) {
    const [isInvisible, setIsInvisible] = useState(opacityOnEmpty);
    const [selected, setSelected] = useState({ option: "" });

    const position = {
        top: "bottom-11",
        bottom: "",
    }[optionPosition];

    useEffect(() => {
        if(selected) {
            onSelect(selected.option)
        }
    }, [selected])

    useEffect(() => {
        selectedOption
            ? setSelected(list.find(({ option }) => option == selectedOption))
            : setSelected({ option: "" })
    }, [selectedOption])

    return (
        <div className="w-full">
            <Listbox
                onFocus={() => opacityOnEmpty && setIsInvisible(false)}
                onBlur={() => opacityOnEmpty && setIsInvisible(true)}
                value={selected}
                onChange={setSelected}
            >
                <div className="relative">
                    <Listbox.Button
                        className={`relative w-full cursor-default rounded-md bg-white pl-3 pr-10 text-left focus:outline-none capitalize ${paddingHeight} ${borderColor}`}
                    >
                        <span
                            className={`block truncate ${
                                isInvisible && !selected.option
                                    ? "opacity-0"
                                    : ""
                            } `}
                        >
                            {selected.option ? selected.option : defaultLabel}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md capitalize
                        bg-white py-1 text-base shadow-md ring-1 ring-slate-200 focus:outline-none sm:text-sm ${position}`}
                        >
                            {list.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={optionIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {option.option &&
                                                option.option != ""
                                                    ? option.option
                                                    : "--select--"}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

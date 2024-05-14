import PositionsTitles, { provinces } from "@/js/Position";
import {
    Menu,
    Transition,
    Popover,
    Listbox,
    Combobox,
} from "@headlessui/react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";

export function Platform({ platform, className, onChange }) {
    return (
        <div
            className={
                "w-40 flex shrink-0 items-center rounded-r-md border border-l-0 border-gray-300/60 bg-gray-200/50 text-right " +
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
                                    onClick={() => onChange("Online Platform")}
                                    className={`hover:bg-gray-200 group flex w-full items-center px-2 py-2`}
                                >
                                    Online Platform
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
                "w-40 shrink-0 flex items-center rounded-r-md border border-l-0 border-gray-300/60 bg-gray-200/50 text-right " +
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

export function FilterByProvince({
    filter = null,
    className = "",
    onSelect = () => {},
    activeFilter = null,
}) {
    const provinceList = filter ?? [
        "All",
        ...provinces.map(({name}) => name)
    ];
    return (
        <div
            className={
                "w-48 select-none shrink-0 flex items-center rounded-md border border-gray-300/60 text-right mr-1 " +
                className
            }
        >
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
                            {provinceList.map((p, index) => (
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
    withBorder = true,
    onSelect = () => {},
    onOrderBy = () => {},
}) {
    const sortList = ["Title", "Date created", "Event date"];
    return (
        <div
            className={`w-44 select-none shrink-0 flex items-center rounded-md text-right mr-1 ${
                withBorder ? "border" : ""
            }`}
        >
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
    withBorder = true,
    className,
    defaults = "All",
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
        <div
            className={`w-44 select-none shrink-0 flex items-center rounded-md border-gray-300/60 text-right mr-1 ${
                withBorder ? "border" : ""
            } ${className}`}
        >
            <Menu
                as="div"
                className="relative inline-block text-left grow h-[2.20rem]"
            >
                <div className="h-full">
                    <Menu.Button className="flex items-center w-full h-full text-left relative focus:outline-none">
                        <FilterIcon className=" mt-0.5 ml-2.5 shrink-0" />
                        <div className={"grow ml-1.5 line-clamp-1 pr-6"}>
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
                    <Menu.Items className="absolute max-h-[20rem] overflow-y-auto z-30 right-0 mt-1 w-full text-sm origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            {filterDataList.map((filterBy, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelect(filterBy);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5 text-left`}
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
    panelPosition,
    selected = "",
    onClick = () => {},
}) {
    return (
        <div
            className={
                "w-fit absolute " +
                (position ?? "sm:top-2 top-1 sm:right-2 right-1")
            }
        >
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
                        <Popover.Panel
                            className={`absolute z-10 w-52 transform px-4 ${
                                panelPosition ?? "-right-3"
                            }`}
                        >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="relative bg-white py-2">
                                    {list.map((item, index) => (
                                        <Popover.Button
                                            key={index}
                                            onClick={() => onClick(item)}
                                            className={`w-full text-left p-1.5 px-3  ${
                                                selected == item
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }`}
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
                "w-12 flex shrink-0 items-center rounded-r-md border-l border-gray-300/60 bg-gray-200/50 text-right " +
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
            <div className="xs:w-44 w-full select-none shrink-0 flex items-center rounded-md border border-gray-300/60 text-right">
                <Menu as="div" className="relative inline-block text-left grow">
                    <div className="">
                        <Menu.Button className="inline-flex text-left items-center w-full justify-between px-4 pl-2.5 py-1.5 focus:outline-none">
                            <FilterIcon className="absolute left-1.5 top-2.5" />
                            <div className="grow ml-[1.20rem] line-clamp-1">
                                {selected && selected.year
                                    ? selected.year
                                    : eventYears.length > 1 && "All"}
                                {(eventYears.length == 0 ||
                                    (eventYears.length == 1 &&
                                        !eventYears[0].year)) &&
                                    "No events"}
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
                        <Menu.Items className="absolute text-sm z-30 right-0 mt-1 w-full tex t-sm origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                                                {event.year ||
                                                    (eventYears.length === 1 &&
                                                    !event.year
                                                        ? "No events"
                                                        : "All")}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                                {eventYears.length == 0 && (
                                    <Menu.Item>
                                        {({ close }) => (
                                            <button
                                                disabled
                                                className={`flex w-full items-center px-2 py-1.5`}
                                            >
                                                <div className=" shrink-0 mr-2 text-sm">
                                                    No events
                                                </div>
                                            </button>
                                        )}
                                    </Menu.Item>
                                )}
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
                    <Listbox.Button className="relative rounded-md w-full cursor-default text-left b order border-gray-300/60 bg-white py-4 pl-3 pr-10 disabled:pointer-events-none disabled:opacity-50 group">
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
    selectedQuarter = "All Quarters",
    list = null,
    size = "xs:w-40 w-full",
}) {
    const quarter = list ?? [
        "All Quarters",
        "1st Quarter",
        "2nd Quarter",
        "3rd Quarter",
        "4th Quarter",
        "This month",
    ];
    return (
        <div
            className={`${size} select-none shrink-0 flex items-center rounded-md border border-gray-300/60 text-right mr-1`}
        >
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="">
                    <Menu.Button className="inline-flex text-left items-center w-full justify-between px-4 pl-2.5 py-1.5 focus:outline-none">
                        <FilterIcon className="absolute left-1.5 top-2.5" />
                        <div className="ml-[1.20rem] line-clamp-1">
                            {selectedQuarter}
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
                    <Menu.Items className="absolute text-sm z-30 right-0 mt-1 w-full tex t-sm origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                                                selectedQuarter == q
                                                    ? "bg-blue-100/60"
                                                    : ""
                                            } hover:bg-gray-200 transition duration-150 group flex w-full items-center px-2 py-1.5 text-left `}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {selectedQuarter == q ? (
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
    disabled = false,
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
        } else {
            setSelected({ name: "" })
        }
    }, [selectedOption]);

    return (
        <div className="">
            <Combobox
                value={selected}
                onChange={onChnageAutoComplete}
                disabled={disabled}
            >
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
                                                                : "text-blue-600"
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
    preSelect = false,
}) {
    const [isInvisible, setIsInvisible] = useState(opacityOnEmpty);
    const [selected, setSelected] = useState(
        selectedOption
            ? list.find(({ option }) => option === selectedOption) || list[0]
            : list[0]
    );

    const onChange = (option) => {
        onSelect(option.option);
    };

    const position = {
        top: "bottom-11",
    }[optionPosition];

    useEffect(() => {
        setSelected(
            list.find(({ option }) => option === selectedOption) || list[0]
        );
    }, [selectedOption, list]);

    return (
        <div className="w-full">
            <Listbox
                onFocus={() => opacityOnEmpty && setIsInvisible(false)}
                onBlur={() => opacityOnEmpty && setIsInvisible(true)}
                value={selected}
                onChange={onChange}
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
                                        `relative cursor-default select-none py-2 pl-10 pr-4 group ${
                                            active
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={option}
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
                                                {option.option &&
                                                option.option != ""
                                                    ? option.option
                                                    : "--select--"}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                            ? "text-white"
                                                            : "text-blue-600"
                                                    } `}
                                                >
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

export default function MenuOptions({
    menus = [],
    circle = true,
    rounded = true,
    className = "p-2",
    icon,
    disabled = false,
    label,
    btnLabelClass,
    rootClass = "",
    asLink,
    onSelect = () => {},
}) {
    return (
        <div className={"text-right " + rootClass}>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        disabled={disabled}
                        className={`inline-flex w-full justify-center text-sm font-medium hover:bg-slate-200/80 focus:outline-none 
                        focus-visible:ring-2 focus-visible:ring-white/75 shrink-0 gap-2 items-center
                        ${
                            disabled
                                ? "bg-gray-200 text-gray-400 pointer-events-none"
                                : ""
                        }
                        ${className} ${
                            circle
                                ? "rounded-full"
                                : !circle && rounded
                                ? "rounded-md"
                                : ""
                        }`}
                    >
                        {icon || (
                            <EllipsisVerticalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        )}

                        <div className={`sm:block hidden ${btnLabelClass}`}>
                            {label}
                        </div>
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
                    <Menu.Items
                        className="absolute right-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md 
                    bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20"
                    >
                        <div className="py-1">
                            {menus.map((menuItem, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {({ active }) => {
                                            if (asLink) {
                                                return (
                                                    <a
                                                        href={menuItem.link}
                                                        className={`${
                                                            active
                                                                ? "bg-gray-200"
                                                                : "text-gray-900"
                                                        } group flex w-full items-center px-2.5 py-2 text-`}
                                                    >
                                                        <div className="flex gap-2 items-center">
                                                            {menuItem.icon}
                                                            {menuItem.label}
                                                        </div>
                                                    </a>
                                                );
                                            } else {
                                                return (
                                                    <button
                                                        onClick={() =>
                                                            onSelect(
                                                                menuItem.label
                                                            )
                                                        }
                                                        className={`${
                                                            active
                                                                ? "bg-gray-200"
                                                                : "text-gray-900"
                                                        } group flex w-full items-center px-2.5 py-2 text-`}
                                                    >
                                                        <div className="flex gap-2 items-center">
                                                            {menuItem.icon}
                                                            {menuItem.label}
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        }}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export function EmployeeFilters({
    empStatus = "",
    areaOfAssignment = "",
    designation = "",
    withBorder = true,
    onSelectEmpStatus = () => {},
    onSelectAOA = () => {},
    onSelectDesignation = () => {},
}) {
    const statusList = ["Active Status", "Resigned/Non-renewal", "Regular", "Contractual", "Contract of Service"];
    const aoa = [...provinces.map(({ name }) => name)];
    const designations = [...PositionsTitles.map(({ name }) => name)].sort();
    const desRef = useRef(null);
    const [showDesignation, setShowDesignation] = useState(false);

    useEffect(() => {
        const clickOutside = (e) => {
            if (desRef.current && !desRef.current.contains(e.target)) {
                setShowDesignation(false);
            }
        };

        document.addEventListener("click", clickOutside);

        return () => {
            document.removeEventListener("click", clickOutside);
        };
    }, []);

    return (
        <div
            className={`select-none shrink-0 flex items-center rounded-md text-right border-slate-300/60 ${
                withBorder ? "border" : ""
            }`}
        >
            <Menu as="div" className="relative inline-block text-left grow">
                <div className="h-full">
                    <Menu.Button className="flex items-center justify-center text-left focus:outline-none p-[0.55rem] relative hover:bg-gray-100 rounded-md transition duration-200">
                        <FilterIcon className="!leading-3" />
                        {
                            (empStatus||areaOfAssignment||designation) &&
                            <span className="w-2.5 h-2.5 rounded-full absolute top-0 -right-1 bg-blue-500"></span>
                        }
                        <span className="text-sm leading-3 ml-2 font-medium xs:block hidden">Filter employee</span>
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
                    <Menu.Items className="absolute w-56 z-30 -top-16 left-10 text-sm origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className=" py-1 ">
                            <div className="text-xs font-medium opacity-50 pl-2">
                                Status
                            </div>
                            {statusList.map((sort, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelectEmpStatus(sort);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {empStatus == sort ? (
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
                            <div className="text-xs font-medium opacity-50 pl-2">
                                Positon/Designation
                            </div>
                            <div ref={desRef} className="relative">
                                <div
                                    onClick={() =>
                                        setShowDesignation(!showDesignation)
                                    }
                                    title={designation}
                                    className={`relative hover:bg-gray-200 group flex w-full items-center px-2 pr-8 py-1.5 group`}
                                >
                                    <div className="w-4 shrink-0 mr-2">
                                        {designation? (
                                            <CheckIcon className="w-4 h-4 text-blue-500" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="line-clamp-1">
                                        {designation?designation:"--select--"}
                                    </div>
                                    <ChevronRightIcon className="w-5 h-5 absolute right-2 sm:rotate-0 rotate-90" />
                                </div>
                                {showDesignation && (
                                    <div className="absolute z-10 top-8 sm:-top-10 max-h-[20rem] overflow-y-auto -right-3 sm:-right-[14rem] w-60 bg-white p-1 px-0 rounded-md shadow-lg ring-1 ring-black/5">
                                        {designations.map((pos, index) => (
                                            <Menu.Item key={index}>
                                                {({ close }) => (
                                                    <button
                                                        title={pos}
                                                        onClick={() => {
                                                            onSelectDesignation(pos)
                                                            close()
                                                            setShowDesignation(false)
                                                        }}
                                                        className={`hover:bg-gray-200 group flex w-full items-center text-left px-2 py-1.5`}
                                                    >
                                                        <div className="w-4 shrink-0 mr-2">
                                                            {designation == pos ? (
                                                                <CheckIcon className="w-4 h-4 text-blue-500" />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            {pos}
                                                        </div>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <hr className="my-2" />
                            <div className="text-xs font-medium opacity-50 pl-2">
                                Area of Assignment
                            </div>
                            {aoa.map((area, index) => (
                                <Menu.Item key={index}>
                                    {({ close }) => (
                                        <button
                                            onClick={() => {
                                                onSelectAOA(area);
                                                close();
                                            }}
                                            className={`hover:bg-gray-200 group flex w-full items-center px-2 py-1.5`}
                                        >
                                            <div className="w-4 shrink-0 mr-2">
                                                {areaOfAssignment == area ? (
                                                    <CheckIcon className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            {area}
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

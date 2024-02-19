import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FilterButton } from "../Event/PopOver";
import { router, usePage } from "@inertiajs/react";

export default function RecentActivity({ user, onResizeValue = () => {} }) {
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState("");
    const activityRefs = useRef();
    const { props: { message } } = usePage()

    const getActivity = async (route) => {
        setRecentActivity([]);
        let response = await axios.get(route);
        let data = response.data;
        setRecentActivity(data);
        setLoading(false);
    };

    const onFilterActivity = (filterActivity) => {
        setFiltered(filterActivity);
        setLoading(true);
        getActivity(
            route("dashboard.activity", {
                _query: {
                    filter: filterActivity,
                },
            })
        );
    };

    useEffect(() => {
        setLoading(true);
        function resizeWindow() {
            onResizeValue(activityRefs.current.offsetWidth);
        }

        window.addEventListener("resize", resizeWindow);

        onResizeValue(activityRefs.current.offsetWidth);

        return () => {
            window.removeEventListener("resize", resizeWindow);
        };
    }, []);

    useEffect(() => {
        try {
            getActivity(route("dashboard.activity"));
        } catch (error) {
            console.log(error);
        }
    }, [message]);

    return (
        <div className="container p-3" ref={activityRefs}>
            <div className="font-semibold text-blue-800 flex items-center relative">
                {user.role == "Employee"
                    ? "Activity History"
                    : "Recent Added Activity"}

                <div
                    onClick={() => router.get(route('dashboard.activities'))}
                    className="ml-auto mr-10 text-sm hover:underline cursor-pointer text-gray-700"
                >
                    Show more
                </div>

                <FilterButton
                    onClick={onFilterActivity}
                    position="right-0 !font-normal !text-gray-700"
                />
            </div>
            {filtered && <div className="flex items-center gap-2 my-1">
                Filter: {filtered}

                <button
                    onClick={() => {setFiltered(""); getActivity(route("dashboard.activity"));}}
                    className="text-xs ml-auto font-semibold hover:bg-gray-100 p-1 px-2 transition duration-150 rounded uppercase flex items-center gap-1"
                >
                    Clear
                </button>
            </div>}
            <div className="overflow-y-auto overscroll-contain h-[23.5rem] mt-3 pt-1">
                {loading && (
                    <div className="font-medium text-sm text-center my-3">
                        Loading...
                    </div>
                )}
                {recentActivity?.map((recent, index) => (
                    <div
                        key={index}
                        className="mb-1 group cursor-default rounded-r-md overflow-hidden"
                    >
                        <div
                            className={
                                "border-l-4 " +
                                (moment(recent.created_at).fromNow() ==
                                "a day ago"
                                    ? "border-transparent"
                                    : "border-green-600 bg-green-100/50")
                            }
                        >
                            <div className="p-2 py-2.5">
                                <div className="text-sm">
                                    <span className="font-semibold">
                                        {user.role !== "Employee" && (recent.user.id == user.id ? "You" : (recent.user.first_name+' '+recent.user.last_name))} {" "}
                                    </span>
                                    {recent.description}:
                                    <span className="font-semibold text-base text-green-70 0 leading-5 line-clamp-1 mb-1">
                                        {recent.event?.title}
                                    </span>
                                </div>

                                <div className="text-sm">
                                    {moment(recent.created_at).fromNow()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {recentActivity.length === 0 && !loading && (
                    <div className="text-center my-2">
                        No activities recorded.
                    </div>
                )}
            </div>
        </div>
    );
}

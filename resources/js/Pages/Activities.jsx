import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Activities({ auth, activities, }) {
    const { user } = auth
    const [activityData, setActivityData] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const onLoadMore = () => {
        setLoading(true)
        /* axios.get()
            .then(res => {
                let { data } = res
                let page = {...data}
                delete page.data

                setCurrentPage(page)

                setActivityData(data.data)

                setLoading(false)
            }) */
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }

    useEffect(() => {
        let { data } = activities
        let page = {...activities}
        delete page.data

        setCurrentPage(page)

        setActivityData(data)
    }, [])

    return (
        <Authenticated user={auth.user}>
            <Head title={auth.user.role === "Employee"?"Activity History":"Recent Added Activity"} />
            <div className="text-2xl font-medium text-blue-900">
                {auth.user.role === "Employee"?"Activity History":"Recent Added Activity"}
            </div>

            <div className="!max-w-2xl mx-auto container p-4 mt-5">
                <div className="flex items-center mb-7">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center hover:text-blue-500"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                        Back
                    </button>
                </div>
                {
                    activityData?.map((activity, index) => (
                        <ActivityCard key={index}>
                            <div>
                                {
                                    user.role != "Employee" ? (
                                        <span className="">{user.id === activity.user.id ? "You" : activity.user.first_name+ ' ' +activity.user.last_name} </span>
                                    ) : ""
                                }
                                {activity.description}
                                <span className="font-semibold text-green-70 0 leading-5 line-clamp-1 mb-1">
                                    {activity.event.title}
                                </span>
                            </div>

                            <div className="text-sm mt-2">
                                {moment(activity.created_at).fromNow()}
                            </div>
                        </ActivityCard>
                    ))
                }

                {currentPage?.current_page !== currentPage?.last_page && <div className="mt-3 flex">
                    {loading && <div className="mx-auto text-sm font-medium p-1 px-2">Loading...</div>}
                    {!loading && <button className="font-medium text-sm p-1 px-2 bg-gray-100 rounded ml-auto" onClick={onLoadMore}>Load more</button>}
                </div>}
            </div>
        </Authenticated>
    )
}

const ActivityCard = styled.div.attrs((props) => ({
    className: `${
        props.$unread
            ? "bg-green-100 border-green-500 font-semibold"
            : "hover :bg-gray-200/80 hover :border-gray-400 border-gray-300 bg-gray-100/70"
    } px-4 border-l-4 transition duration-all p-2 cursor-default`,
}))``;
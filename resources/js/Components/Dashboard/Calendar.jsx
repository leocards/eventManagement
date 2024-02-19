import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import ViewEvent from "../Event/ViewEvent";

export default function Calendar({ height = 600 }) {
    const [events, setEvents] = useState([]);
    const [calendarEvent, setCalendarEvent] = useState([]);
    const [showViewEvent, setShowViewEvent] = useState(false)
    const [selected, setSelected] = useState(null)

    const getAllEvents = () => {
        return axios.get(route("calendar.events")).then((res) => {
            let { data } = res;

            data.forEach((event, index) => {
                let {
                    event_code,
                    event_select: {
                        id,
                        title,
                        objective,
                        platform,
                        venue,
                        fund,
                        is_range,
                        dateStart,
                        dateEnd,
                    },
                } = event;

                setCalendarEvent((ce) => [
                    ...ce,
                    {
                        id,
                        title,
                        objective,
                        platform,
                        venue,
                        dateStart,
                        dateEnd,
                        fund,
                        is_range,
                        event_code,
                    },
                ]);
                setEvents((ce) => [
                    ...ce,
                    {
                        id,
                        title,
                        start: dateStart,
                        end: is_range?dateEnd:null,
                    },
                ]);
            });
        });
    };

    const onClickEvent = info => {
        let ce = calendarEvent.find(({id}) => id == info.event.id)
        setSelected(ce)
        setShowViewEvent(true)
    }

    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div className="rounded-md ring-1 ring-slate-200/40 bg-white p-4 grow">
            <FullCalendar
                aspectRatio={1}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={onClickEvent}
                height={height}
                eventBackgroundColor="#1e40af"
                eventBorderColor="transparent"
                eventClassNames="px-2 cursor-pointer"
            />

            <ViewEvent empView show={showViewEvent} eventToView={selected} onClose={() => setShowViewEvent(false)} />
        </div>
    );
}

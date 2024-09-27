import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment-timezone'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useState } from 'react'
import events from "./events"
export type AgendaViewProps = {
    date: Date
    onChangeDate: (date: Date) => void
}


export default function AgendaView(props: AgendaViewProps) {
    const [myEvents, setMyEvents] = useState(events)

    const DnDCalendar = withDragAndDrop(Calendar)
    moment.tz.setDefault('America/Sao_Paulo')
    const localizer = momentLocalizer(moment)

    return (
        <>
        <h1>Agenda</h1>
        <DnDCalendar
            date={props.date}
            defaultView={Views.DAY}
            localizer={localizer}
            events={myEvents}
            views={{day: true, month: true}}
            min={new Date(new Date().setHours(8, 0, 0))}
            max={new Date(new Date().setHours(20, 0, 0))}            
            onNavigate={date => { props.onChangeDate(date) }}
        />        
        </>
    )
}
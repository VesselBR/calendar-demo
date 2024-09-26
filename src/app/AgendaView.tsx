import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment-timezone'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

export type AgendaViewProps = {
    date: Date
}


export default function AgendaView(props: AgendaViewProps) {
    const DnDCalendar = withDragAndDrop(Calendar)
    const localizer = momentLocalizer(moment)

    return (
        <>
        <h1>Agenda</h1>
        <DnDCalendar
            date={props.date}
            defaultView={Views.DAY}
            localizer={localizer}
            events={[]}
            views={{day: true, month: true}}
        />        
        </>
    )
}
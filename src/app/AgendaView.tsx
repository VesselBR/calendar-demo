import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, SlotInfo, Views } from 'react-big-calendar'
import moment from 'moment-timezone'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useState } from 'react'
import events from "./events"
import AddEventModal from './AddEventModal'
import { Booking, CurrentSlot } from './agenda'
export type AgendaViewProps = {
    date: Date
    onChangeDate: (date: Date) => void
}


export default function AgendaView(props: AgendaViewProps) {
    const [myEvents, setMyEvents] = useState(events)
	const [currentSlot, setCurrentSlot] = useState<CurrentSlot | null>(null)
    const [openSlot, setOpenSlot] = useState(false)

    const resourceMap = [{id: 1, title: "Eu"}, {id: 2, title: "Outro"}]

    const DnDCalendar = withDragAndDrop(Calendar)
    moment.tz.setDefault('America/Sao_Paulo')
    const localizer = momentLocalizer(moment)

    const handleClose = () => {
        setCurrentSlot(null)
        setOpenSlot(false)
    }
	const onAddEvent = (event :Booking) => {
        setMyEvents(myEvents => [...myEvents, {start: event.start_at, end: event.end_at, id: event.id!, title: 'Novo'}])            
		handleClose()
	}

    return (
        <>
        <h1>Agenda</h1>
        <DnDCalendar
            date={props.date}
            defaultView={Views.DAY}
            localizer={localizer}
            events={myEvents}
            resources={resourceMap}
            views={{day: true, month: true}}
            min={new Date(new Date().setHours(8, 0, 0))}
            max={new Date(new Date().setHours(20, 0, 0))}            
            selectable
            onNavigate={date => { props.onChangeDate(date) }}
            onSelectSlot={ (event: SlotInfo) => {
                console.log("On Select slot", event)
                const currentDate = new Date()
                const yesterday = new Date(currentDate)
                yesterday.setDate(yesterday.getDate() - 1)
                yesterday.setHours(23, 59)

                if (event.start <=  yesterday){ return alert('Não é permitido agendar para datas retroativas') }
                const resource = resourceMap.find(item => item.id === event.resourceId)
                if(!resource) {return}
                const resourceId = resource.id
                const resourceName = `${resource.id} - ${resource.title}`
                const start_at = event.slots[0]!
                const end_at = event.slots.at(-1)!
                setCurrentSlot({ resourceId, resourceName, start_at: new Date(start_at), end_at: new Date(end_at) })
                setOpenSlot(true)
                    
            } }            
        />        
        <AddEventModal
                shopId={'1'}
                slot={currentSlot}
                agendaAudit={true}
                open={openSlot}
                handleClose={handleClose}
                onAddEvent={onAddEvent}
            />      

        </>
    )
}
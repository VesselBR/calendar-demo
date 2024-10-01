import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, SlotInfo, Views } from 'react-big-calendar'
import moment from 'moment-timezone'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getEvents, getResources, MyEvent } from './fakeData'
import AddMultipleModal from './AddMultipleModal'
export type AgendaViewProps = {
    date: Date
    onChangeDate: (date: Date) => void
}


export default function AgendaView(props: AgendaViewProps) {
    const [myEvents, setMyEvents] = useState<MyEvent[]>([])
    const [openSlot, setOpenSlot] = useState(false)

    const resourceMap = getResources()

    useEffect( () => {
        const events = getEvents()
        setMyEvents(events)
    }, [] )


    const DnDCalendar = withDragAndDrop(Calendar)
    moment.tz.setDefault('America/Sao_Paulo')
    const localizer = momentLocalizer(moment)

    const handleClose = () => {
        setOpenSlot(false)
    }


    return (
        <>
        <h1>Agenda</h1>
        <div>
            <Button onClick={() => {
                const events = myEvents.filter( (event) => event.title !== 'RESERVA' )
                setMyEvents(events)}
            }>
            Limpar
            </Button>
            <Button onClick={() => {
                    setOpenSlot(true)
        
                }
            }>
            Gravar
            </Button>            
        </div>
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            eventPropGetter={(event :any) => { 
                let backgroundColor = 'blue' // defaults to blue
                if (event.title == 'RESERVA') {backgroundColor='black'}
                const color = 'white'
                return { style: { backgroundColor, color } }
            
             }}
            onSelectSlot={ (event: SlotInfo) => {
                console.log("On Select slot", event)
                const resource = resourceMap.find(item => item.id === event.resourceId)
                if(!resource) {return}
                const resourceId = resource.id
                //const resourceName = `${resource.id} - ${resource.title}`
                const start_at = event.slots[0]!
                const end_at = event.slots.at(-1)!
                //setCurrentSlot({ resourceId, resourceName, start_at: new Date(start_at), end_at: new Date(end_at) })
                //setOpenSlot(true)
                setMyEvents([...myEvents, {
                    id: Math.floor(Math.random()*100),
                    title: 'RESERVA',
                    resourceId: resourceId,
                    start: start_at,
                    end: end_at
                }])    
            } }            
        />        
        {openSlot && <AddMultipleModal
                shopId='1' 
                open={openSlot}
                handleClose={handleClose}
                events={myEvents.filter( (event) => event.title === 'RESERVA' )} />}
        </>
    )
}
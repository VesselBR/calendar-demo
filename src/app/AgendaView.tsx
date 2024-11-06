import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar'
import moment from 'moment-timezone'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getResources, MyEvent, Shop } from './fakeData'
import AddMultipleModal from './AddMultipleModal'
import { createCustomComponent } from './CustomerView'

export type AgendaViewProps = {
    date: Date
    myEvents: MyEvent[]
    shop: Shop
    customer: number | null
    onChangeDate: (date: Date) => void
    onSetEvents: (events: MyEvent[]) => void
}


export default function AgendaView(props: AgendaViewProps) {
    const [openSlot, setOpenSlot] = useState(false)
    //const [viewtype, setViewtype] = useState<View>(Views.DAY)

    const isOpen = props.shop.hours[props.date.getDay()].open
    const startHour = props.shop.hours[props.date.getDay()].start 
    const endHour = props.shop.hours[props.date.getDay()].end

    const resourceMap = getResources()
    let viewtype: View = Views.DAY
    if (props.customer) { viewtype = Views.AGENDA } 

    const customerView = createCustomComponent(props.customer, props)

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
                const events = props.myEvents.filter( (event) => event.title !== 'RESERVA' )
                props.onSetEvents(events) }
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

        {
            isOpen 
            ?

            <DnDCalendar
            date={props.date}
            defaultView={viewtype}
            localizer={localizer}
            events={props.myEvents}
            resources={resourceMap}
            views={{ day: true, agenda: customerView    }  }
            min={new Date(new Date().setHours(startHour, 0, 0))}
            max={new Date(new Date().setHours(endHour, 0, 0))}            
            selectable
            components={{
            }}
            onNavigate={date => { 
                props.onChangeDate(date)
                console.log('onNavigate', date.getDate())
                //if(date.getDate() === 9){ setViewtype(Views.WORK_WEEK) }
             }}
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
                const aevent :MyEvent = {
                    id: Math.floor(Math.random()*100),
                    title: 'RESERVA',
                    resourceId: resourceId,
                    serviceId: 0,
                    customerId: 0,
                    start: start_at,
                    end: end_at
                }
                props.onSetEvents([...props.myEvents, aevent])    
            } }            
        />        

        :
        <h1> Unidade Fechada </h1>
        }
        {openSlot && <AddMultipleModal
                shopId='1'                
                open={openSlot}
                handleClose={handleClose}
                onSubmit={(eventList :MyEvent[]) => {
                    // Clear the Reservations
                    const list = props.myEvents.filter( (event) => event.title !== 'RESERVA' )
                    eventList.forEach(event => { list.push(event) })
                    //setMyEvents(list)
                    props.onSetEvents(list)
                } }
                events={props.myEvents.filter( (event) => event.title === 'RESERVA' )} />}
        </>
    )
}
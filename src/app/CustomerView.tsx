/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, useState } from 'react'
import * as dates from 'date-arithmetic'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { ViewStatic } from 'react-big-calendar'
import { Button } from 'react-bootstrap'
import { AgendaEvent } from './agenda'
import BookingModal from './BookingModal'

type CustomerViewProps = {
  events: AgendaEvent[]
  date: Date
  length: number
  localizer: any
  accessors: any
}


export const CustomerView: ComponentType<any> & ViewStatic = (props :CustomerViewProps) => {
  const [openBooking, setOpenBooking] = useState(false)
  const [bookingId, setBookingId] = useState(0)

  const handleBookingClose = () => {
    setOpenBooking(false)
  }


  const renderDays = (isToday: boolean, events: AgendaEvent[]) => {
    //events = events.filter((e) => inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), props.accessors))
    return (
      <>

        <BookingModal
          open={openBooking}
				  handleClose={handleBookingClose}
				  shopId={'1'}
          staffs={[]}
				  bookingId={bookingId}
          agendaAudit={false}
          onUpdateEvents={ () => {} }
          onCancelEvent={ () => {} }
			/>



        <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Horário</th>
            <th>Profissional</th>
            <th>Serviço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map( (event) => {
            let button
            if (isToday){
              button = <Button
              variant="contained"
              style={{ float: 'right' }}
              onClick={ () => {
                setBookingId(event.id)
                setOpenBooking(true)
              } } >Editar
            </Button>
            }
            return(
              <>
              <tr>
                <td>{props.localizer.format(event.start, 'MMMM DD')}</td>
                <td>{timeRangeLabel(event.start, event)}</td>  
                <td>{event.resourceId}</td>
                <td>{event.title}</td>
                <td>
                 {button}
                </td>
              </tr>
              </>)
            } )}            
        </tbody>
        </table>
        </div>
      </>
    )
  }

  const timeRangeLabel = (day :Date, event :AgendaEvent) => {
    const end = props.accessors.end(event)
    const start = props.accessors.start(event)

    if (!props.accessors.allDay(event)) {
      if (dayjs(start).day() === dayjs(end).day()) {
        const timePeriod = `${dayjs(start).format('h:mma')} – ${dayjs(
          end
        ).format('h:mma')}`
        return timePeriod
      } else {
        const startDate = dayjs(start).format('DD-MM YYYY, h:mma')
        const endDate = dayjs(end).format('DD-MM YYYY, h:mma')
        return `${startDate} – ${endDate}`
      }
    }
  }

  //const end = dates.add(props.date, length, 'day')
  //const range = rangeFunc(props.date, end)
  //let events = props.events.filter((event) => inRange(event, props.date, end, props.accessors))
  //events.sort((a, b) => +props.accessors.start(a) - +props.accessors.start(b))
  if (props.events.length === 0) { return ( <div>`Nenhum evento para a data de ${props.date.toLocaleDateString('pt-BR')} `</div> ) }
  
  return (
    <div>
        <h2 className='title'>Agendamentos do dia</h2>
        {renderDays(true, props.events.filter( (ev) => { 
          //const today = new Date()
          return ev.start.getDate() == props.date.getDate() && ev.start.getMonth() == props.date.getMonth()
        }  
          ))}          
        <h2 className='title'>Outros agendamentos</h2>
        {renderDays(false, props.events.filter( (ev) => { 
          //const today = new Date()
          return ev.start.getDate() !== props.date.getDate()
        }  
          ))}

    </div>
  )
}

CustomerView.title = (start, { localizer }) => {
  const end = dates.add(start, 1, 'month')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}

CustomerView.navigate = (date, action) => {
  const sDate = dayjs(date).startOf('month').toDate()
  switch (action) {
    case 'PREV':
      return dates.add(sDate, -1, 'month')
    case 'NEXT':
      return dates.add(sDate, 1, 'month')
    default:
      return date
  }
}

CustomerView.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),
  length: PropTypes.number,
  selected: PropTypes.object,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}
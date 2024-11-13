import * as React from 'react'
import { Button } from 'react-bootstrap'
import BookingModal from './BookingModal'
import { AgendaEvent } from './agenda'


const CustomerComponent = (props: { shopId: string, customerId: number, aevents: AgendaEvent[], date: Date }) => {
    const [openBooking, setOpenBooking] = React.useState(false)
    const [bookingId, setBookingId] = React.useState(0)

    const handleBookingClose = () => {
        setOpenBooking(false)
    }
    const customerId = props.customerId
    console.log("Filtering events by customer *** ", customerId, props)
    const events = props.aevents.filter((ev) => ev.customer_id === customerId)


    const renderDays = (isToday: boolean, events: AgendaEvent[]) => {
        //events = events.filter((e) => inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), props.accessors))
        return (
            <>
                {openBooking && <BookingModal
                    open={openBooking}
                    handleClose={handleBookingClose}
                    shopId={props.shopId}
                    staffs={[]}
                    bookingId={bookingId}
                    agendaAudit={false}
                    onUpdateEvents={() => { }}
                    onCancelEvent={() => { }}
                />}
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
                            {events.map((event) => {
                                let button
                                if (isToday) {
                                    button = <Button
                                        variant="contained"
                                        style={{ float: 'right' }}
                                        onClick={() => {
                                            setBookingId(event.id)
                                            setOpenBooking(true)
                                        }} >Editar
                                    </Button>
                                }
                                return (
                                    <>
                                        <tr>
                                            <td>{event.start.toLocaleDateString()}</td>
                                            <td>{event.start.toLocaleTimeString()}</td>
                                            <td>{event.resourceId}</td>
                                            <td>{event.title}</td>
                                            <td>
                                                {button}
                                            </td>
                                        </tr>
                                    </>)
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }


    if (events.length === 0) {
        return (
            <div>
                <h1>Nome do cliente</h1>
                <div>
                    `Nenhum evento para a data de ${props.date.toLocaleDateString('pt-BR')} `
                </div>
            </div>
        )
    }


    return (
        <div>
            <h1>Nome do cliente</h1>
            <h2 className='title'>Agendamentos do dia</h2>
            {renderDays(true, events.filter((ev) => {
                return ev.start.getDate() == props.date.getDate() && ev.start.getMonth() == props.date.getMonth()
            }
            ))}
            <h2 className='title'>Agendamentos Futuros</h2>
            {renderDays(false, events.filter((ev) => {
                return ev.start.getDate() !== props.date.getDate()
            }
            ))}
        </div>
    )
}

export default CustomerComponent
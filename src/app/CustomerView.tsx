/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ViewStatic } from 'react-big-calendar';
import dayjs from 'dayjs'
import * as dates from 'date-arithmetic'
import BookingModal from './BookingModal';
import { Button } from 'react-bootstrap';
import { AgendaEvent } from './agenda';
import { getCustomerEvents } from './fakeData';

type CustomComponent = React.ComponentType<any> & ViewStatic;

export function createCustomComponent(customerId: any, props: any): CustomComponent {
    const MyComponent = () => {
        const [openBooking, setOpenBooking] = React.useState(false)
        const [bookingId, setBookingId] = React.useState(0)


        const events = getCustomerEvents(customerId)

        console.log("Filtering events by customer *** ", customerId, props.shopId)
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
                        onUpdateEvents={() => { }}
                        onCancelEvent={() => { }}
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
                                                <td>{event.start.getUTCDate()}</td>
                                                <td>{event.end.getUTCDate()}</td>
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
                <h2 className='title'>Outros agendamentos</h2>
                {renderDays(false, events.filter((ev) => {
                    return ev.start.getDate() !== props.date.getDate()
                }
                ))}
            </div>
        )
    };

    MyComponent.title = (date: Date) => { return `Title ${date.toISOString()}` }
    MyComponent.navigate = (date: any, action: any) => {
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


    return MyComponent;
}

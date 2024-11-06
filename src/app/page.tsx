"use client"; // This is a client component

import 'bootstrap/dist/css/bootstrap.min.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import AgendaView from './AgendaView';
import { Customer } from './agenda';
import { getCustomers, getEvents, getShop, MyEvent } from './fakeData';


export default function Home() {
  const [myEvents, setMyEvents] = useState<MyEvent[]>([])
  const [date, setDate] = useState  (new Date())
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)


  useEffect( () => {
    const customers = getCustomers()
    setCustomers(customers)
    const events = getEvents()
    setMyEvents(events)

  }, [] )

  return (
    <div>
      <h1>App Demo</h1>
      <div className="row">
        <div className="col-sm-2">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                value={moment.utc(date).tz('America/Sao_Paulo')}
                onChange={(newValue) => {
                  setDate(newValue._d)
                }
                } />
            </LocalizationProvider>
            <p>Profissionais</p>
            <Select
              isMulti
              name="staffs"
              options={[]}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          <p>Grupos</p>
          <Select
            isMulti
            name="groups"
            options={[]}
            className="basic-multi-select"
            classNamePrefix="select"
          />

        </div>          
        <div className="col-sm-10">
        <Select
            isSearchable
            name="customers"
            options={customers}
            classNamePrefix="select"
            isClearable
            onChange={(newVal :SingleValue<Customer> ) => {
              if (newVal === null) {
                setSelectedCustomer(null)
              } else {
                setSelectedCustomer(newVal.id)
              }
            }
            }
          />          
          <AgendaView
            myEvents={myEvents}
            date={date}
            shop={getShop()}
            customer={selectedCustomer}
            onChangeDate={(date: Date) => setDate(date)}
            onSetEvents={ (props) => { setMyEvents(props) } }
          />
        </div>
      </div>
    </div>
  );
}

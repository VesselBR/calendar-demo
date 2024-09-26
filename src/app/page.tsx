"use client"; // This is a client component

import 'bootstrap/dist/css/bootstrap.min.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment-timezone'
import { useState } from 'react'
import Select from 'react-select'
import AgendaView from './AgendaView';


export default function Home() {
  const [date, setDate] = useState  (new Date())

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
          <AgendaView
            date={date}
          />
        </div>
      </div>
    </div>
  );
}

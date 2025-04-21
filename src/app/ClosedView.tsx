/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType } from 'react'
import * as dates from 'date-arithmetic'
import { ViewStatic } from 'react-big-calendar'

type ClosedViewProps = {
  date: Date
}


export const ClosedView: ComponentType<any> & ViewStatic = (props :ClosedViewProps) => {
    console.log("props", props)
    return (
    <div>
      <h1>Unidade fechada neste dia</h1>
    </div>
  )
}

ClosedView.title = (start, { localizer }) => {
  const end = dates.add(start, 1, 'month')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}

ClosedView.navigate = (date, action) => {
  const sDate = date //dayjs(date).startOf('month').toDate()
  switch (action) {
    case 'PREV':
      return dates.add(sDate, -1, 'day')
    case 'NEXT':
      return dates.add(sDate, 1, 'day')
    default:
      return date
  }
}

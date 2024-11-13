//export default function Main(props: MainProps)  {

import { createContext, ReactNode, useEffect, useState } from "react";
import { getEvents, MyEvent } from "./fakeData";

interface DateProviderProps {
    children: ReactNode;
  }
  


    
  export const DateContext = createContext<{ 
    currentDate: Date, handleDateChange: (newDate :Date) => void, 
    events: MyEvent[], handleSetEvents: (events :MyEvent[]) => void
      }>({
    currentDate: new Date,
    handleDateChange: () => { console.log('handle ND') },
    events: [],
    handleSetEvents: (events :MyEvent[]) => {console.log('handle set events ND', events)}
  });
  

export default function DateProvider({ children }: DateProviderProps ) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<MyEvent[]>([])


    useEffect( () => {
      console.log('DateProvider useEffect')
      const events = getEvents()
      setEvents(events)
    }, [] )
  

    const handleDateChange = (newDate :Date) => {
      console.log('handle', newDate)
      setCurrentDate(newDate);
    };

    const handleSetEvents  = (events :MyEvent[]) => {
      console.log('handlind set events')
      setEvents(events)
    }

    return (
      <DateContext.Provider value={{ currentDate, handleDateChange, events, handleSetEvents }}>
        {children}
      </DateContext.Provider>
    );
  }
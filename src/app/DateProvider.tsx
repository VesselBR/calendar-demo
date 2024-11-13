//export default function Main(props: MainProps)  {

import { createContext, ReactNode, useState } from "react";

interface DateProviderProps {
    children: ReactNode;
  }
  


    
  export const DateContext = createContext<{ currentDate: Date, handleDateChange: (newDate :Date) => void }>({
    currentDate: new Date,
    handleDateChange: () => { console.log('handle ND') },
  });
  

export default function DateProvider({ children }: DateProviderProps ) {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    const handleDateChange = (newDate :Date) => {
      console.log('handle', newDate)
      setCurrentDate(newDate);
    };



    return (
      <DateContext.Provider value={{ currentDate, handleDateChange }}>
        {children}
      </DateContext.Provider>
    );
  }
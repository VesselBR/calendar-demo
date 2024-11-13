import { useContext } from "react";
import AgendaView from "./AgendaView";
import CustomerComponent from "./CustomerComponent";
import { getEvents, getShop, MyEvent } from "./fakeData";
import { DateContext } from "./DateProvider";

export type MainProps = {
    selectedCustomer :number | null
    shopId: string
}

export default function Main(props: MainProps)  {
  const { currentDate, handleDateChange, events, handleSetEvents  } = useContext(DateContext);
  
  if (props.selectedCustomer) {
    return (
    <>
      <div className="col-sm-10">
        <CustomerComponent shopId={props.shopId} aevents={events} customerId={props.selectedCustomer} date={currentDate} />
      </div>
    </>)
    
  } 
  else { 
    return (
    <>
    <div className="col-sm-10">
      <AgendaView
          myEvents={events}
          date={currentDate}
          shop={getShop()}
          customer={props.selectedCustomer}
          onChangeDate={(date: Date) => {
            handleDateChange(date)
            const dateEvents = getEvents()
            handleSetEvents(dateEvents)
          } }
          onSetEvents={ (props) => { 
            handleSetEvents(props)
          } }
      />   
    </div>
    </> )  
  }
};
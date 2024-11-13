import { useContext } from "react";
import AgendaView from "./AgendaView";
import CustomerComponent from "./CustomerComponent";
import { getShop, MyEvent } from "./fakeData";
import { DateContext } from "./DateProvider";

export type MainProps = {
    selectedCustomer :number | null
    shopId: string
    events: MyEvent[]

}

export default function Main(props: MainProps)  {
  const { currentDate, handleDateChange } = useContext(DateContext);
  
  if (props.selectedCustomer) {
    return (
    <>
      <div className="col-sm-10">
        <CustomerComponent shopId={props.shopId} aevents={props.events} customerId={props.selectedCustomer} date={currentDate} />
      </div>
    </>)
    
  } 
  else { 
    return (
    <>
    <div className="col-sm-10">
      <AgendaView
          myEvents={props.events}
          date={currentDate}
          shop={getShop()}
          customer={props.selectedCustomer}
          onChangeDate={(date: Date) => {
            //setDate(date)
            handleDateChange(date)
            //const events = getEvents()
            //setMyEvents(events)
          } }
          onSetEvents={ (props) => { 
            //setMyEvents(props) 
          } }
      />   
    </div>
    </> )  
  }
};
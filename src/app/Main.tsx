import { AgendaEvent } from "./agenda";
import AgendaView from "./AgendaView";
import CustomerComponent from "./CustomerComponent";
import { getEvents, getShop, MyEvent } from "./fakeData";

export type MainProps = {
    selectedCustomer :number
    shopId: string
    date: Date
    events: MyEvent[]

}

export default function Main(props: MainProps)  {
  

    if (props.selectedCustomer) {
        return <CustomerComponent shopId={props.shopId} aevents={props.events} customerId={props.selectedCustomer} date={props.date} />
      } else { 
        return <AgendaView
        myEvents={props.events}
        date={props.date}
        shop={getShop()}
        customer={props.selectedCustomer}
        onChangeDate={(date: Date) => {
          //setDate(date)
          //const events = getEvents()
          //setMyEvents(events)
        } }
        onSetEvents={ (props) => { setMyEvents(props) } }
      />     
      }
    

    return (
      <>
      <div>
        <h1>Main</h1>
      </div>
      </>
    );
  };
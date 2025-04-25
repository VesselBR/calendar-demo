import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
  View,
  Views,
} from "react-big-calendar";
import moment from "moment-timezone";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getEvents, getResources, MyEvent, Shop } from "./fakeData";
import AddMultipleModal from "./AddMultipleModal";
import { CustomAgendaView } from "./CustomAgendaView"; // <- certifique-se de que esse arquivo está criado

export type AgendaViewProps = {
  date: Date;
  shop: Shop;
  customer: number | null;
  onChangeDate: (date: Date) => void;
};

export default function AgendaView(props: AgendaViewProps) {
  const [customView, setCustomView] = useState(false); // <- controlando visualização
  const [myEvents, setMyEvents] = useState<MyEvent[]>([]);
  const [openSlot, setOpenSlot] = useState(false);

  const isOpen = props.shop.hours[props.date.getDay()].open;
  const startHour = props.shop.hours[props.date.getDay()].start;
  const endHour = props.shop.hours[props.date.getDay()].end;

  const resourceMap = getResources();

  // Define tipo de view original
  let viewtype: View | "customAgenda" = Views.DAY;
  if (props.customer) viewtype = Views.AGENDA;
  if (customView) viewtype = "customAgenda";

  const DnDCalendar = withDragAndDrop(Calendar);
  moment.tz.setDefault("America/Sao_Paulo");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const events = getEvents();
    setMyEvents(events);
  }, []);

  const handleClose = () => {
    setOpenSlot(false);
  };

  return (
    <div>
      <h1 className="m-2">Agenda</h1>
      <div>
        <Button
          className="mx-1 my-3"
          onClick={() => {
            const events = myEvents.filter(
              (event) => event.title !== "RESERVA"
            );
            setMyEvents(events);
          }}
        >
          Limpar
        </Button>
        <Button className="mx-1 my-3" onClick={() => setOpenSlot(true)}>
          Gravar
        </Button>
        {/* <Button
          className="mx-1 my-3"
          onClick={() => setCustomView(!customView)}
        >
          {customView ? "Visualização Padrão" : "Visualização Invertida"}
        </Button> */}
      </div>

      {isOpen ? (
        viewtype === "customAgenda" ? (
          <CustomAgendaView
            events={myEvents}
            resources={resourceMap}
            date={props.date}
            startHour={startHour}
            endHour={endHour}
          />
        ) : (
          <DnDCalendar
            date={props.date}
            defaultView={props.customer ? Views.AGENDA : Views.DAY}
            localizer={localizer}
            events={myEvents}
            resources={resourceMap}
            views={{ day: true, agenda: true }}
            min={new Date(new Date().setHours(startHour, 0, 0))}
            max={new Date(new Date().setHours(endHour, 0, 0))}
            selectable
            onNavigate={(date) => props.onChangeDate(date)}
            eventPropGetter={(event) => {
              const backgroundColor =
                event.title === "RESERVA" ? "black" : "blue";
              return { style: { backgroundColor, color: "white" } };
            }}
            onSelectSlot={(slotInfo: SlotInfo) => {
              const resource = resourceMap.find(
                (item) => item.id === slotInfo.resourceId
              );
              if (!resource) return;
              const start_at = slotInfo.slots[0]!;
              const end_at = slotInfo.slots.at(-1)!;
              setMyEvents([
                ...myEvents,
                {
                  id: Math.floor(Math.random() * 100),
                  title: "RESERVA",
                  resourceId: resource.id,
                  serviceId: 0,
                  customerId: 0,
                  start: start_at,
                  end: end_at,
                },
              ]);
            }}
          />
        )
      ) : (
        <h3>Unidade Fechada</h3>
      )}

      {openSlot && (
        <AddMultipleModal
          shopId="1"
          open={openSlot}
          handleClose={handleClose}
          onSubmit={(eventList: MyEvent[]) => {
            const list = myEvents.filter((event) => event.title !== "RESERVA");
            eventList.forEach((event) => list.push(event));
            setMyEvents(list);
          }}
          events={myEvents.filter((event) => event.title === "RESERVA")}
        />
      )}
    </div>
  );
}

import * as React from "react";
import { useEffect, useState } from "react";
import PinModal from "./PinModal";
import DatePicker from "react-datepicker";
import { Booking, Customer, Service, Staff } from "./agenda";
import { getCustomers } from "./fakeData";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";

export type BookingModalProps = {
  shopId: string;
  bookingId: number;
  open: boolean;
  agendaAudit: boolean;
  staffs: Staff[];
  handleClose: () => void;
  onUpdateEvents: (event: Booking) => void;
  onCancelEvent: (event: Booking) => void;
};

const BookingModal = (props: BookingModalProps) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [auditId, setAuditId] = useState<number | null>(null);
  const [staffId, setStaffId] = useState<number>(0);
  const [customerId, setCustomerId] = useState<number>(0);
  const [serviceId, setServiceID] = useState<number>(0);
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Execute
    setCustomers([]);
    setServices([]);
    const customers = getCustomers();
    setCustomers(customers);
    if (props.bookingId > 0) {
      console.log("use-effect", props.staffs);
      //getBooking(props.shopId, props.bookingId)
    }
  }, [props.open]);

  //const onSubtmitComanda = () => handleSubmitComanda()
  //const handleSubmitComanda = () => {  //postComanda() }

  const onViewComanda = () => {
    const url = `${process.env.API_URL}/shops/${props.shopId}/comandas/${booking?.comanda_id}`;
    window.location.href = url;
  };
  const onClose = () => props.handleClose();

  const onPutEvent = () => {
    console.log("on put event", booking);
    const updt = booking!;
    updt.start_at = new Date(booking!.start_at);
    updt.end_at = new Date(endAt);
    //putCalendar(props.shopId, updt)
    props.onUpdateEvents(booking!);
    props.handleClose();
  };
  const onDelEvent = () => {
    //putCalendar(props.shopId, {...booking!, active: false})
    //props.onCancelEvent(booking!)
    //props.handleClose()
  };

  let openButton;
  openButton = (
    <PinModal
      shopId={props.shopId}
      setParent={(id: number) => setAuditId(id)}
      buttonTitle="Abrir Comanda"
    ></PinModal>
  );
  if (props.agendaAudit === false) {
    openButton = (
      <Button
        color="success"
        onClick={() => {
          onPutEvent();
        }}
      >
        {" "}
        Abrir Comanda{" "}
      </Button>
    );
  } else {
    if (auditId) {
      openButton = (
        <Button
          color="success"
          onClick={() => {
            onPutEvent();
          }}
        >
          Abrir Comanda
        </Button>
      );
    }
  }

  let putButton;
  putButton = (
    <PinModal
      shopId={props.shopId}
      setParent={(id: number) => setAuditId(id)}
      buttonTitle="Atualizar"
    ></PinModal>
  );
  if (props.agendaAudit === false) {
    putButton = (
      <Button
        color="success"
        onClick={() => {
          onPutEvent();
        }}
      >
        {" "}
        Atualizar (sem pin){" "}
      </Button>
    );
  } else {
    if (auditId) {
      putButton = (
        <Button
          color="success"
          onClick={() => {
            onPutEvent();
          }}
        >
          Atualizar com pin
        </Button>
      );
    }
  }

  let delButton;
  delButton = (
    <PinModal
      shopId={props.shopId}
      setParent={(id: number) => setAuditId(id)}
      buttonTitle="Excluir"
    ></PinModal>
  );
  if (props.agendaAudit === false) {
    delButton = (
      <Button
        color="error"
        onClick={() => {
          onDelEvent();
        }}
      >
        {" "}
        Cancelar (sem pin){" "}
      </Button>
    );
  } else {
    if (auditId) {
      delButton = (
        <Button
          color="error"
          onClick={() => {
            onDelEvent();
          }}
        >
          Cancelar com pin
        </Button>
      );
    }
  }
  let comandaButton;
  if (booking?.comanda_id) {
    comandaButton = (
      <Button
        variant="contained"
        style={{ float: "right" }}
        onClick={onViewComanda}
      >
        Consultar Comanda
      </Button>
    );
  } else {
    comandaButton = openButton;
  }
  return (
    <Modal show={props.open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Novo Agendamento </Modal.Title>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>{comandaButton}</Form.Group>
          <Form.Group>
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              aria-label="Selecione um cliente"
              disabled={true}
              value={customerId}
              onChange={(e) => {
                setCustomerId(parseInt(e.target.value));
                setBooking({
                  ...booking!,
                  customer_id: parseInt(e.target.value),
                });
              }}
            >
              {customers.map((customer) => {
                return (
                  <option key={customer.value} value={customer.value}>
                    {customer.label}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Profissional</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={staffId}
              onChange={(e) => {
                setStaffId(parseInt(e.target.value));
              }}
            >
              {props.staffs.map((staff) => {
                return (
                  <option key={staff.value} value={staff.value}>
                    {staff.label}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Serviço</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={serviceId}
              onChange={(e) => {
                setServiceID(parseInt(e.target.value));
              }}
            >
              {services.map((service) => {
                return (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Início:</Form.Label>
            <DatePicker
              selected={startAt}
              onChange={(date) => {
                if (!date) {
                  return;
                }
                setStartAt(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              //timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            <br />
            <Form.Label>Final:</Form.Label>
            <DatePicker
              selected={endAt}
              onChange={(date) => {
                if (!date) {
                  return;
                }
                setEndAt(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              //timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {putButton}
        {delButton}
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;

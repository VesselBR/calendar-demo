/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { getResources, getServices, MyEvent, Resource } from "./fakeData";
import { Customer, Service } from "./agenda";
import NewCustomer from "./NewCustomer";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "moment/locale/pt-br";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { registerLocale } from "react-datepicker";
import {ptBR} from "date-fns/locale";
registerLocale("pt-BR", ptBR);

export type AddMultipleModalProps = {
  shopId: string;
  open: boolean;
  handleClose: () => void;
  onSubmit: (events: MyEvent[]) => void;
  events: MyEvent[];
};

const AddMultipleModal = (props: AddMultipleModalProps) => {
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [staffs, setStaffs] = useState<Resource[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formValues, setFormValues] = useState<MyEvent[]>([]);
  moment.tz.setDefault("America/Sao_Paulo");

  useEffect(() => {
    console.log("--use-effect--", props.events);
    // Execute
    const staffs = getResources();
    const services = getServices();
    setStaffs(staffs);
    setServices(services);
    if (props.events) {
      setFormValues([]);
      const items = props.events.map((event) => {
        return {
          start: event.start,
          end: event.end,
          resourceId: event.resourceId,
        };
      });
      //@ts-expect-error IgnoreIt
      setFormValues(items);
    }
  }, [props.open]);

  const onNewCustomer = (customer: Customer) => {
    setCustomers([...customers, customer]);
  };

  const handleChange = (index: number, attribute: string, value: any) => {
    const newFormValues = [...formValues];
    //@ts-expect-error IgnoreIt
    newFormValues[index][attribute] = value;
    if (attribute === "resourceId") {
      newFormValues[index][attribute] = parseInt(value);
    }
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        start: new Date(),
        end: new Date(),
        customerId: 0,
        resourceId: 0,
        serviceId: 0,
        id: 0,
        title: "",
      },
    ]);
  };

  const removeFormFields = (i: any) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <div>
      <Modal size="lg" centered show={props.open} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Container>
                <Row>
                  <Col sm={8}>
                    <Form.Label className="row justify-content-between align-items-center ">
                      Cliente
                      <a
                        className="btn bg-success text-light col-5"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://wa.me/55${
                          customers
                            .find((c) => c.id === customerId)
                            ?.phone?.replace(/\D/g, "") || ""
                        }?text=${encodeURIComponent(
                          (() => {
                            const customer = customers.find(
                              (c) => c.id === customerId
                            );
                            const event = formValues[0];
                            const staff = staffs.find(
                              (s) => s.id === event?.resourceId
                            );
                            const startTime = event?.start
                              ? moment(event.start).format("HH:mm")
                              : "";
                            const endTime = event?.end
                              ? moment(event.end).format("HH:mm")
                              : "";

                            return `Olá ${customer?.name},\n\nEste é um lembrete do seu agendamento:\n📅 Horário: ${startTime} às ${endTime}\n👤 Profissional: ${staff?.title}\n\nAté breve!`;
                          })()
                        )}`}
                      >
                        Enviar Mensagem
                        <WhatsAppIcon className="ms-3" />
                      </a>
                    </Form.Label>
                    <Form.Select
                      value={customerId}
                      onChange={(event) => {
                        setCustomerId(parseInt(event.target.value));
                      }}
                    >
                      {customers.map((customer) => {
                        return (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col sm={4}>
                    <NewCustomer
                      shopId={props.shopId}
                      onSubmit={onNewCustomer}
                    ></NewCustomer>
                  </Col>
                </Row>
              </Container>
            </Form.Group>

            <Form.Label>Horários:</Form.Label>
            {formValues.map((element, index) => (
              <Form key={index} className="d-flex">
                <Form.Group>
                  <Form.Label>Proffissional</Form.Label>
                  <Form.Select
                    value={element.resourceId}
                    id={`staff-${index}`}
                    onChange={(event) => {
                      handleChange(index, "resourceId", event.target.value);
                    }}
                  >
                    {staffs.map((staff) => {
                      return (
                        <option
                          key={staff.id}
                          selected={staff.id === element.resourceId}
                          label={staff.title}
                          value={staff.id}
                        ></option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Serviço</Form.Label>
                  <Form.Select
                    value={element.serviceId}
                    id={`service-${index}`}
                    onChange={(event) => {
                      handleChange(index, "serviceId", event.target.value);
                    }}
                    onFocus={() => {
                      console.log("on focus", element.resourceId);
                      const staff = document.getElementById(`staff-${index}`);
                      const service_select = document.getElementById(
                        `service-${index}`
                      ) as HTMLSelectElement;
                      if (!service_select) {
                        return;
                      }
                      console.log("staff", staff);
                      services.forEach((service) => {
                        if (service.id < 3) {
                          const opt = document.createElement("option");
                          opt.text = service.name;
                          opt.value = String(service.id);
                          console.log("option", opt);
                          service_select.add(opt);
                        }
                      });
                    }}
                  ></Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Inicio</Form.Label>
                  <Form.Group>
                    <DatePicker
                      id={`start-${index}`}
                      className="form-control"
                      selected={element.start!}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      locale="pt-BR"
                      onChange={(e) => handleChange(index, "start", e)}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fim</Form.Label>
                  <Form.Group>
                    <DatePicker
                      id={`end-${index}`}
                      className="form-control"
                      selected={element.end!}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      locale="pt-BR"
                      onChange={(e) => handleChange(index, "end", e)}
                    />
                  </Form.Group>
                </Form.Group>
                <Button
                  type="button"
                  className="button"
                  onClick={() => removeFormFields(index)}
                >
                  Remover
                </Button>
              </Form>
            ))}

            <Container>
              <Row>
                <Col xs={4} />
                <Col xs={4}>
                  <Button
                    className="button"
                    type="button"
                    onClick={() => addFormFields()}
                  >
                    Add
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button
                    className="button submit"
                    onClick={() => {
                      props.onSubmit(formValues);
                      props.handleClose();
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddMultipleModal;

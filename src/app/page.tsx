"use client"; // This is a client component

import "bootstrap/dist/css/bootstrap.min.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import AgendaView from "./AgendaView";
import { Customer } from "./agenda";
import { getCustomers, getShop } from "./fakeData";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  useEffect(() => {
    const customers = getCustomers();
    setCustomers(customers);
  }, []);

  return (
    <div className="  col-sm-12">
      <h1 className="py-2 px-3">App Demo</h1>
      <div className="row justify-content-around ">
        <div className="col-sm-auto col-md-4 col-lg-3   overflow-hidden   ">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateCalendar
              value={moment.utc(date).tz("America/Sao_Paulo")}
              onChange={(newValue) => {
                setDate(newValue._d);
              }}
            />
          </LocalizationProvider>
          <div className="p-2">
            <p>Profissionais</p>
            <Select
              isMulti
              name="staffs"
              options={[]}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="p-2">
            <p>Grupos</p>
            <Select
              isMulti
              name="groups"
              options={[]}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>
        <div className="col-sm-10 col-md-8 col-lg-9">
          <Select
            isSearchable
            name="customers"
            options={customers}
            classNamePrefix="select"
            className="col-sm-12 col-lg-3"
            isClearable
            onChange={(newVal: SingleValue<Customer>) => {
              if (newVal === null) {
                setSelectedCustomer(null);
              } else {
                setSelectedCustomer(newVal.id);
              }
            }}
          />
          <AgendaView
            date={date}
            shop={getShop()}
            customer={selectedCustomer}
            onChangeDate={(date: Date) => setDate(date)}
          />
        </div>
      </div>
    </div>
  );
}

"use client"; // This is a client component
import "react-day-picker/style.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { Customer } from './agenda';
import { getCustomers } from './fakeData';
import { WebsocketProvider } from "./WebsocketProvider";
import Sidebar from "./Sidebar";
import DateProvider from "./DateProvider";
import Main from "./Main";


export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)


  useEffect( () => {
    const customers = getCustomers()
    setCustomers(customers)
  }, [] )


  return (
    <div>
      <h1>App Demo</h1>
      <Select
            isSearchable
            name="customers"
            options={customers}
            classNamePrefix="select"
            isClearable
            onChange={(newVal :SingleValue<Customer> ) => {
              if (newVal === null) {
                setSelectedCustomer(null)
              } else {
                setSelectedCustomer(newVal.id)
              }
            }
            }
          />  

      <div className="row">
        <DateProvider>
          <Sidebar />
          <WebsocketProvider>
            <Main
              selectedCustomer={selectedCustomer}              
              shopId="1"
            />
        </WebsocketProvider>          
        </DateProvider>                                          
      </div>
    </div>
  );
}

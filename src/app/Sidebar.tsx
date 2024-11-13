import { useContext } from "react";
import { DayPicker } from "react-day-picker"
import { ptBR } from "react-day-picker/locale"
import { DateContext } from "./DateProvider";
import Select from 'react-select'

export default function Sidebar()  { 
    const { currentDate, handleDateChange } = useContext(DateContext);

return (
    <>
    <div className="col-sm-2">
    <DayPicker
        mode="single"
        locale={ptBR}
        selected={currentDate}
        onSelect={(newvalue) => {
            console.log('changed', newvalue) 
            if(!newvalue){return}
            handleDateChange(newvalue) 
        }}
        />
        <p>Profissionais</p>
        <Select
        isMulti
        name="staffs"
        options={[]}
        className="basic-multi-select"
        classNamePrefix="select"
        />
        <p>Grupos</p>
        <Select
        isMulti
        name="groups"
        options={[]}
        className="basic-multi-select"
        classNamePrefix="select"
        />
    </div>
    </>
)
    
}

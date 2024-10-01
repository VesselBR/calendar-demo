/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { MyEvent } from './fakeData'
import { Customer } from './agenda'
import NewCustomer from './NewCustomer'
import DatePicker from 'react-datepicker'


export type AddMultipleModalProps = {
	shopId: string
    open: boolean
	handleClose: () => void
    events: MyEvent[]
}


type Item = {
    resourceId: string
    resourceName: string
    service: string    
    start: string
    end: string
}

const AddMultipleModal = (props: AddMultipleModalProps) => {
	const [customerId, setCustomerId] = useState<number | undefined>(undefined)
	const [customers, setCustomers] = useState<Customer[]>([])

    const [formValues, setFormValues] = useState<Item[]>([])


	useEffect(() => {
        console.log('--use-effect--', props.events)
		// Execute
        if(props.events){
            setFormValues([])            
            const items = props.events.map( (event) => {
                
                return {start: String(event.start), end: String(event.end)}
            } )
            setFormValues(items)
        }            
	}, [props.open])

	const onNewCustomer = (customer: Customer) => {
		setCustomers([...customers, customer])
	}


    const handleChange = (i :any, e :any) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    const addFormFields = () => {
        setFormValues([...formValues, { start: "", end: "", resourceId: "", resourceName: "", service: "" }])
      }
    
    const removeFormFields = (i :any) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    const handleSubmit = (event :any) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
      <div>
        <Modal
        size='lg'
        centered
        show={props.open}
        onHide={props.handleClose}
        >
			<Modal.Header closeButton>
			    <Modal.Title>Novo Agendamento</Modal.Title>
			</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
							<Container>
								<Row>
									<Col sm={8}>
									<Form.Label>Cliente</Form.Label>
										<Form.Select
											value={customerId}
											onChange={(event) => { 
												setCustomerId(parseInt(event.target.value))} }
										>
											{
												customers.map((customer) => {
													return (<option
														key={customer.id}
														value={customer.id} >{customer.name}</option>)
												})
											}
										</Form.Select>
									
									</Col>
									<Col sm={4}>
										<NewCustomer 
											shopId={props.shopId} 
											onSubmit={onNewCustomer}
											>
										</NewCustomer>
									</Col>
								</Row>
							</Container>
						</Form.Group>
                
                <Form.Label>Horários:</Form.Label>
                {formValues.map((element, index) => (
                        <Form key={index} className='d-flex'>
                                <Form.Label>Inicio</Form.Label>
                                <Form.Control type="text"
                                    value={element.start || ""}
                                    onChange={e => handleChange(index, e)}
                                />
                                <Form.Label>Fim</Form.Label>
                                <Form.Control
                                    value={element.end || ""}
                                    onChange={e => handleChange(index, e)}
                                />

                                <Button type='button' className='button' onClick={() => removeFormFields(index)}>
                                    Remover
                                </Button>
                        </Form>                    
                ))}

                    <Container>
                        <Row>
                            <Col xs={4} />
                            <Col xs={4}>
                            <Button className='button' type='button' onClick={() => addFormFields()}>
                                Add
                            </Button>
                            </Col>
                            <Col xs={4} >
                                <Button className="button submit" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                
            </Modal.Body>            
        </Modal>
      </div>
    )
}

export default AddMultipleModal